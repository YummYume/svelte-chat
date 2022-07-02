import * as cookie from 'cookie';

import type { GetSession, Handle } from '@sveltejs/kit';

import { auth } from '$src/firebaseAdmin';
import { protectedPages } from '$lib/variables/protectedPages';

export const getSession: GetSession = async (event) => {
	const locals = event.locals;
	const decodedToken = locals.decodedToken;

	if (decodedToken) {
		try {
			const currentUser = await auth().getUser(decodedToken.uid);

			return {
				user: {
					displayName: currentUser.displayName,
					email: currentUser.email,
					phoneNumber: currentUser.phoneNumber,
					photoURL: currentUser.photoURL,
					providerId: null,
					uid: currentUser.uid
				}
			};
		} catch (e) {
			return { user: null };
		}
	} else {
		return { user: null };
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	try {
		event.locals.decodedToken = await auth().verifyIdToken(cookies.token);
	} catch (e) {
		event.locals.decodedToken = null;
	}

	if (!event.locals.decodedToken && protectedPages.has(event.url.pathname)) {
		// Return to the 403 page if forbidden access. Might still need to do checks in the protected pages themselves with the load method.
		return Response.redirect(`${event.url.origin}/403`, 303);
	}

	return await resolve(event);
};
