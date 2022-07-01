import { writable, type Writable } from 'svelte/store';

import { auth } from '../firebase';

import type { User } from '@firebase/auth-types';

function firebaseUser() {
    const currentUser: Writable<null|User> = writable(null);

    auth.onAuthStateChanged((user) => currentUser.set(user))

    return {
        subscribe: currentUser.subscribe
    };
};

export const currentUser = firebaseUser();
