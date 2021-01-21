/* eslint-disable simple-import-sort/imports */

import { writeFileSync } from 'fs';

import { init } from './utils';
import { root } from '../constants';

async function main(): Promise<void> {
  const courses = `
CS-6035,CS,6035,Intro to Information Security,true,false
CS-6200,CS,6200,Intro to Operating Systems,true,false
CS-6210,CS,6210,Advanced Operating Systems,true,false
CS-6250,CS,6250,Computer Networks,true,false
CS-6262,CS,6262,Network Security,true,false
CS-6290,CS,6290,High Performance Computer Architecture,true,false
CS-6291,CS,6291,Embedded System Optimization,true,false
CS-6300,CS,6300,Software Development Process,true,false
CS-6310,CS,6310,Software Architecture & Design,true,false
CS-6400,CS,6400,Database Systems Concepts & Design,true,false
CS-6440,CS,6440,Intro to Health Informatics,true,false
CS-6460,CS,6460,Educational Technology,true,false
CS-6475,CS,6475,Computational Photography,true,false
CS-6476,CS,6476,Computer Vision,true,false
CS-6601,CS,6601,Artificial Intelligence,true,false
CS-7641,CS,7641,Machine Learning,true,false
CS-7642,CS,7642,Reinforcement Learning,true,false
CS-7646,CS,7646,Machine Learning for Trading,true,false
CSE-6242,CSE,6242,Data & Visual Analytics,true,false
CSE-6250,CSE,6250,Big Data for Health Informatics,true,false
ISYE-6402,ISYE,6402,Time Series Analysis,false,false
ISYE-6644,ISYE,6644,Simulation,false,false
PUBP-6725,PUBP,6725,Information Security Policies,false,false
CS-6238,CS,6238,Secure Computer Systems,false,false
CS-6263,CS,6263,Intro to Cyber Physical Systems Security,true,false
CS-6465,CS,6465,Computational Journalism,false,true
CS-6515,CS,6515,Intro to Graduate Algorithms,true,false
CS-6750,CS,6750,Human-Computer Interaction,true,false
CS-7450,CS,7450,Information Visualization,false,true
CS-8813,CS,8813,Malware Analysis & Defense,false,true
CSE-6140,CSE,6140,Computational Science & Engineering Algorithms,false,true
CSE-6240,CSE,6240,Web Search & Text Mining,false,true
ECE-6320,ECE,6320,Power Systems Control & Operation,false,true
INTA-6014,INTA,6014,Scenario & Path Gathering,false,true
INTA-8803,INTA,8803,Data Analytics & Security,false,true
ISYE-6404,ISYE,6404,Nonparametric Data Analysis,false,true
ISYE-6413,ISYE,6413,Design & Analysis of Experiments,false,true
ISYE-6416,ISYE,6416,Computational Statistics,false,true
ISYE-6420,ISYE,6420,Bayesian Statistics,true,false
ISYE-6501,ISYE,6501,Intro to Analytics Modeling,false,false
ISYE-6650,ISYE,6650,Probabilistic Models,false,true
ISYE-7406,ISYE,7406,Data Mining & Statistical Learning,false,true
PUBP-6111,PUBP,6111,Internet & Public Policy,false,true
PUBP-6502,PUBP,6502,Information & Communications Policy,false,true
CS-6260,CS,6260,Applied Cryptography,false,false
CS-6340,CS,6340,Software Analysis & Test,true,false
CS-7638,CS,7638,Robotics: AI Techniques,true,false
CS-7639,CS,7639,Cyber Physical Design & Analytics,true,false
INTA-8803G,INTA,8803,Challenge of Terrorism in Democratic Societies,false,true
CSE-6040,CSE,6040,Computing for Data Analytics,false,false
CS-8803x,CS,8803,Security Operations & Incidence Response,false,true
CS-6265,CS,6265,Information Security Lab: Binary Exploitation,false,false
CS-8803-O01,CS,8803-01,Artificial Intelligence for Robotics,false,true
ECE-6323,ECE,6323,Power Systems Protection,false,true
ISYE-6414,ISYE,6414,Regression Analysis,false,false
ISYE-6669,ISYE,6669,Deterministic Optimization,false,false
CS-8803-O11,CS,8803-11,Information Security Lab: System & Network Defenses,false,false
MGT-6311,MGT,6311,Digital Marketing,false,false
MGT-6748,MGT,6748,Applied Analytics Practicum,false,false
MGT-8813,MGT,8813,Financial Modeling,false,false
MGT-8833,MGT,8833,Privacy for Professionals,false,false
CS-6457,CS,6457,Video Game Design,false,false
PUBP-6501,PUBP,6501,Information Policy & Management,false,false
ECE-8803a,ECE,8803,Computational Aspects of Cyber Physical Systems,false,true
ECE-8803c,ECE,8803,Embedded Systems,false,true
ECE-8803d,ECE,8803,Embedded Systems Security,false,true
ECE-8803e,ECE,8803,Intro to Cyber Physical Electric Energy Systems,false,true
ECE-8803g,ECE,8803,Smart Grids,false,true
ECE-8803h,ECE,8803,Software Vulnerabilities & Security,false,true
CS-6747,CS,6747,Advanced Malware Analysis,false,false
ECE-8823,ECE,8823,Cyber Physical Design,false,false
CS-8803-O08,CS,8803-08,Compilers: Theory & Practice,false,false
CS-7637,CS,7637,Knowledge-Based Artificial Intelligence,true,false
CS-6727,CS,6727,Cyber Security Practicum,false,false
INTA-6450,INTA,6450,Data Analytics & Security,false,false
CS-8803-O04,CS,8803-04,Embedded Software,false,true
MGT-6203,MGT,6203,Data Analytics & Business,false,false
MGT-8823,MGT,8823,Data Analytics & Continuous Improvement,false,false
CS-8803-O10,CS,8803-10,"AI, Ethics & Society",false,false
CS-8803-O05,CS,8803-05,Data Visualization for Health Informatics,false,true
CS-8803-O06,CS,8803-06,Biomedical Analytics,false,true
CSE-6220,CSE,6220,High Performance Computing,true,false
CS-7643,CS,7643,Deep Learning,false,false
ECE-8843,ECE,8843,Side Channels in Cyber Space,false,false
INTA-6742,INTA,6742,"Mod, Sim & Military Gaming",false,false
ISYE-6740,ISYE,6740,Computational Data Analysis,false,false
ISYE-8803,ISYE,8803,High-Dimensional Data Analytics,false,false
MGT-8803,MGT,8803,Business Fundamentals for Analytics,true,false
  `
    .trim()
    .split('\n')
    .map((row) => row.split(','))
    .map(([id, department, number, ...rest]) => {
      const deprecated = rest.pop() === 'true';
      const foundational = rest.pop() === 'true';
      const name = rest.join(',').replace(/"/g, '');
      return {
        id,
        department,
        number,
        name,
        foundational,
        deprecated,
      };
    });

  writeFileSync(
    `${root}/_courses.json`,
    JSON.stringify(courses, null, 2),
    'utf8',
  );
}

init(main);
