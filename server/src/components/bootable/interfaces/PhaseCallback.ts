/**
 * Phase callback, which is used by asynchronous phases to signal phase end.
 */
export interface PhaseCallback {
  (error?: Error): void;
}
