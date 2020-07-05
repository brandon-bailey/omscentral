import { PartialModelObject as PMO } from 'objection';

import { Program } from '../../src/models';

export const programs: PMO<Program>[] = [
  {
    id: 'compsci',
    name: 'Computer Science',
    url: 'https://pe.gatech.edu/degrees/computer-science',
  },
  {
    id: 'cybersec',
    name: 'Cybersecurity',
    url: 'https://pe.gatech.edu/degrees/cybersecurity',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    url: 'https://pe.gatech.edu/degrees/analytics',
  },
];
