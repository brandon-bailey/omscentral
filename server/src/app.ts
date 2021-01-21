import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import lusca from 'lusca';

import { bootable } from './components';
import { logger } from './components';
import { appConfig } from './config';
import * as middleware from './middleware';
import * as phases from './phases';

export const app = bootable(express(), logger);

app.phase(phases.processEvents, 'process-events');
app.phase(phases.createServer, 'create-server');
app.phase(phases.knex, 'knex');
app.phase(phases.postgres, 'postgres');
app.phase(phases.upsertSemesters, 'upsert-semesters');
app.phase(phases.upsertCourses, 'upsert-courses');
app.phase(phases.upsertCourseMetrics, 'upsert-course-metrics');
app.phase(phases.upsertSpecializations, 'upsert-specializations');
app.phase(phases.indexReviews, 'index-reviews');

app.use(compression());

app.use(bodyParser.raw());
app.use(bodyParser.text({ type: ['*/xml'], limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(middleware.cors());
appConfig.rateLimit && app.use(rateLimit({ windowMs: 500, max: 10 }));
app.use(middleware.morgan());
app.use(middleware.user());
app.use(middleware.error());
