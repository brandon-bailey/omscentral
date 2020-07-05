import { Express } from 'express';

import { BootFunction } from './BootFunction';
import { PhaseFunction } from './PhaseFunction';

export interface BootableExpress extends Express {
  /**
   * Registers a phase.
   */
  phase: (func: PhaseFunction, name: string) => void;

  /**
   * Boots up the application, running all phases in the order registered.
   */
  boot: (callback: BootFunction) => void;
}
