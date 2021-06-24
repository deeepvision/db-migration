import { exec } from 'child_process';

export const asyncExec = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stdout);
      }

      if (stderr) {
        console.error(stderr);
      }

      if (error) {
        reject(error);
      }

      resolve();
    });
  });
};
