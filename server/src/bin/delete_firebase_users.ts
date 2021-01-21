/* eslint-disable simple-import-sort/imports */

import { each } from 'bluebird';

import { init } from './utils';
import { firebase, logger } from '../components';
import { deleteUser } from '../functions';

async function main(): Promise<void> {
  let token: string | undefined;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    logger.info('fetching next 10 users ...');
    const { users, pageToken } = await firebase.auth().listUsers(10, token);
    if (!users.length) break;
    logger.info(`deleting ${users.length} user(s) ...`);
    token = pageToken;
    await each(users, (user) => deleteUser(user.uid));
  }
}

init(main);
