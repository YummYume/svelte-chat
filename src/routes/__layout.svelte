<script lang="ts">
    import AuthProvider from '$lib/components/AuthProvider.svelte';

    import '$src/app.css';
</script>

<svelte:head>
    <title>Svelte Chat</title>
</svelte:head>

<AuthProvider>
    <slot />
</AuthProvider>
