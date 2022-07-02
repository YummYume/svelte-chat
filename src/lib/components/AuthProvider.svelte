<script lang="ts">
    import Cookies from 'js-cookie';
    import { session } from '$app/stores';
    import { get } from 'svelte/store';

    import { currentUser } from '$stores/user';
    import { auth } from '$src/firebase';
    import { envVariables } from '$lib/variables/env';

    currentUser.set(get(session).user);

    auth.onAuthStateChanged(async (user) => {
        const tokenCookieOptions: Cookies.CookieAttributes = {
            path: '/',
            domain: envVariables.domainName,
            sameSite: 'Strict',
            secure: true
        };

        if (user) {
            currentUser.set({
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                providerId: user.providerId,
                uid: user.uid
            });
            Cookies.set('token', (await user.getIdToken()) ?? 'null', tokenCookieOptions);

            return;
        }

        currentUser.set(null);
        Cookies.remove('token', tokenCookieOptions);
    });
</script>

<slot />
