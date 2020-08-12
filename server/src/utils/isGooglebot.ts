import { IncomingHttpHeaders } from 'http';

import { execute } from './execute';

const getLastPiece = (s = '', separator = ' '): string =>
  s.split(separator).pop() || '';

/**
 * Determines if an incoming HTTP request is from Googlebot.
 *
 * @param headers
 * @returns True if so, false otherwise.
 * @see https://support.google.com/webmasters/answer/80553
 */
export const isGooglebot = async (
  headers: IncomingHttpHeaders,
): Promise<boolean> => {
  const fromIP = headers['x-forwarded-for'];
  if (!fromIP) {
    return false;
  }

  const fromDomain = getLastPiece(await execute(`host ${fromIP}`));
  if (!fromDomain || !/google(bot)?\.com$/.test(fromDomain)) {
    return false;
  }

  const fromDomainIP = getLastPiece(await execute(`host ${fromDomain}`));
  if (!fromDomainIP || fromDomainIP !== fromIP) {
    return false;
  }

  return true;
};
