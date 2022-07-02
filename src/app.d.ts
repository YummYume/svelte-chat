/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		decodedToken: import('firebase-admin/lib/auth/token-verifier').DecodedIdToken | null;
	}

	// interface Platform {}

	interface Session {
		user: import('$lib/models/User').User | null;
	}

	// interface Stuff {}
}
