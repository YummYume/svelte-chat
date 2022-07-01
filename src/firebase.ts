import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { envVariables } from '$lib/variables/env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: envVariables.firebaseApiKey,
    authDomain: envVariables.firebaseAuthDomain,
    projectId: envVariables.firebaseProjectId,
    storageBucket: envVariables.firebaseStorageBucket,
    messagingSenderId: envVariables.firebaseMessagingSenderId,
    appId: envVariables.firebaseAppId,
    measurementId: envVariables.firebaseMeasurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
