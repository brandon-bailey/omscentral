export interface FirebaseConfig {
  clientEmail: string;
  databaseUrl: string;
  privateKey: string;
  projectId: string;
}

export const config: FirebaseConfig = {
  clientEmail: process.env.OMSCENTRAL_FIREBASE_CLIENT_EMAIL || '',
  databaseUrl: process.env.OMSCENTRAL_FIREBASE_DATABASE_URL || '',
  privateKey: process.env.OMSCENTRAL_FIREBASE_PRIVATE_KEY || '',
  projectId: process.env.OMSCENTRAL_FIREBASE_PROJECT_ID || '',
};
