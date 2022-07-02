<script context="module" lang="ts">
    import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

    export async function load({ session }: LoadEvent): Promise<LoadOutput> {
        // Get the current user directly!
        console.log(session.user);

        return {};
    }
</script>

<h1>Super chat!</h1>
<p>You must be authentified to access this page.</p>
