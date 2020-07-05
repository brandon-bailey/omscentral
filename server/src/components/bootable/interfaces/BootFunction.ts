/**
 * Boot function, which may receive an error if bootup fails for some reason.
 */
export interface BootFunction {
  (error?: Error): void;
}
