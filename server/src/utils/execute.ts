import { exec } from 'child_process';

export const execute = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      if (`${stderr}`) {
        return reject(`${stderr}`.trim());
      }

      return resolve(`${stdout}`.trim());
    });
  });
