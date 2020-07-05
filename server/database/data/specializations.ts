import { PartialModelObject as PMO } from 'objection';

import { Specialization } from '../../src/models';

export const specializations: PMO<Specialization>[] = [
  // https://www.omscs.gatech.edu/specialization-computational-perception-robotics
  {
    id: 'compsci:cpr',
    program_id: 'compsci',
    name: 'Computational Perception & Robotics',
    requirements: [
      {
        type: 'core',
        count: 1,
        courses: [
          'CS-6505',
          'CS-6515',
          'CS-6520',
          'CS-6550',
          'CS-7520',
          'CS-7530',
          'CSE-6140',
        ],
      },
      {
        type: 'core',
        count: 1,
        courses: ['CS-6601', 'CS-7641'],
      },
      {
        type: 'elective',
        count: 3,
        courses: [
          'CS-6475',
          'CS-6476',
          'CS-7499',
          'CS-7636',
          'CS-7650',
          'CS-7630',
          'CS-7631',
          'CS-7633',
          'CS-7638',
          'CS-7649',
        ],
      },
      {
        type: 'elective',
        count: 1,
        courses: ['CS-6475', 'CS-6476', 'CS-7499', 'CS-7636', 'CS-7650'],
      },
      {
        type: 'elective',
        count: 1,
        courses: ['CS-7630', 'CS-7631', 'CS-7633', 'CS-7638', 'CS-7649'],
      },
    ],
  },
  // https://www.omscs.gatech.edu/specialization-computing-systems
  {
    id: 'compsci:cs',
    program_id: 'compsci',
    name: 'Computing Systems',
    requirements: [
      {
        type: 'core',
        count: 1,
        courses: ['CS-6505', 'CS-6515'],
      },
      {
        type: 'core',
        count: 2,
        courses: [
          'CS-6210',
          'CS-6241',
          'CS-6250',
          'CS-6290',
          'CS-6300',
          'CS-6390',
          'CS-6400',
        ],
      },
      {
        type: 'elective',
        count: 3,
        courses: [
          'CS-6035',
          'CS-6200',
          'CS-6220',
          'CS-6235',
          'CS-6238',
          'CS-6260',
          'CS-6262',
          'CS-6263',
          'CS-6291',
          'CS-6310',
          'CS-6340',
          'CS-6365',
          'CS-6422',
          'CS-6550',
          'CS-6675',
          'CS-7210',
          'CS-7260',
          'CS-7270',
          'CS-7290',
          'CS-7292',
          'CS-7560',
          'CS-8803-FPL',
          'CSE-6220',
        ],
      },
    ],
  },
  // https://www.omscs.gatech.edu/specialization-interactive-intelligence
  {
    id: 'compsci:ii',
    program_id: 'compsci',
    name: 'Interactive Intelligence',
    requirements: [
      {
        type: 'core',
        count: 1,
        courses: ['CS-6300', 'CS-6301', 'CS-6505', 'CS-6515'],
      },
      {
        type: 'core',
        count: 2,
        courses: ['CS-6601', 'CS-7620', 'CS-7637', 'CS-7641'],
      },
      {
        type: 'elective',
        count: 2,
        courses: [
          'CS-6440',
          'CS-6460',
          'CS-6465',
          'CS-6471',
          'CS-6750',
          'CS-7632',
          'CS-7634',
          'CS-7650',
          'CS-6795',
          'CS-7610',
        ],
      },
    ],
  },
  // https://www.omscs.gatech.edu/specialization-machine-learning
  {
    id: 'compsci:ml',
    program_id: 'compsci',
    name: 'Machine Learning',
    requirements: [
      {
        type: 'core',
        count: 1,
        courses: [
          'CS-6505',
          'CS-6515',
          'CS-6520',
          'CS-6550',
          'CS-7510',
          'CS-7520',
          'CS-7530',
          'CSE-6140',
        ],
      },
      {
        type: 'core',
        count: 1,
        courses: ['CS-7641', 'CSE-6740'],
      },
      {
        type: 'elective',
        count: 3,
        courses: [
          'CS-6220',
          'CS-6476',
          'CS-7535',
          'CS-7540',
          'CS-7545',
          'CS-7616',
          'CS-7626',
          'CS-7642',
          'CS-7643',
          'CS-7646',
          'CS-7650',
          'CS-8803',
          'CSE-6240',
          'CSE-6242',
          'CSE-6250',
          'ISYE-6416',
          'ISYE-6420',
          'ISYE-6664',
        ],
      },
    ],
  },
  // https://pe.gatech.edu/degrees/cybersecurity?section=curriculum
  {
    id: 'cybersec:IS',
    program_id: 'cybersec',
    name: 'Information Security',
    requirements: [],
  },
  {
    id: 'cybersec:ES',
    program_id: 'cybersec',
    name: 'Energy Systems',
    requirements: [],
  },
  {
    id: 'cybersec:p',
    program_id: 'cybersec',
    name: 'Policy',
    requirements: [],
  },
  // https://pe.gatech.edu/degrees/analytics?section=curriculum
  {
    id: 'analytics:at',
    program_id: 'analytics',
    name: 'Analytical Tools',
    requirements: [],
  },
  {
    id: 'analytics:ba',
    program_id: 'analytics',
    name: 'Business Analytics',
    requirements: [],
  },
  {
    id: 'analytics:cda',
    program_id: 'analytics',
    name: 'Computational Data Analytics',
    requirements: [],
  },
];
