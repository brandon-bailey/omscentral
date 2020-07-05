import admin from 'firebase-admin';

import { firebaseConfig } from '../../config';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: firebaseConfig.privateKey,
    clientEmail: firebaseConfig.clientEmail,
    projectId: firebaseConfig.projectId,
  }),
  databaseURL: firebaseConfig.databaseUrl,
});

export const firebase = admin;
