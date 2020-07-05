import { PhaseFunction } from '../interfaces';

export class Phase {
  /**
   * Phase class represents a single bootup phase.
   *
   * @param func Phase function.
   * @param name User-facing name for the phase that is logged during bootup.
   */
  constructor(public func: PhaseFunction, public name: string) {}
}
