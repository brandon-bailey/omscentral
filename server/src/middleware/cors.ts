import cors from 'cors';
import { RequestHandler } from 'express';

// disable CORS for SEO...

export const middleware = (): RequestHandler => cors();
