import firebaseAdmin from 'firebase-admin';

import { envVariables } from '$lib/variables/env';
import serviceAccount from '$src/svelte-chat-service-acount.json';

if (!firebaseAdmin.apps.length) {
    // Initialize Firebase Admin
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
            projectId: serviceAccount.project_id
        }),
        databaseURL: envVariables.firebaseDatabaseURL
    });
}

// Export
export const auth = firebaseAdmin.auth;
export const firestore = firebaseAdmin.firestore;
export const storage = firebaseAdmin.storage;
