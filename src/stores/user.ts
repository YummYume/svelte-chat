import { writable, type Writable } from 'svelte/store';

import type { User } from '$lib/models/User';

function firebaseUser() {
    const currentUser: Writable<null|User> = writable(null);

    return {
        subscribe: currentUser.subscribe,
        set: currentUser.set
    };
};

export const currentUser = firebaseUser();
