<script lang="ts">
    import { currentUser } from '$stores/user';
    import { auth, googleProvider } from '$src/firebase';
    import Button from '$lib/components/Button.svelte';

    const appName = 'Svelte Chat';

    let registerForm = {
        email: '',
        password: ''
    };

    let loginForm = {
        email: '',
        password: ''
    };

    function handleEmailAndPasswordRegister() {
        auth.createUserWithEmailAndPassword(registerForm.email, registerForm.password);
    }

    function handleEmailAndPasswordLogin() {
        auth.signInWithEmailAndPassword(loginForm.email, loginForm.password);
    }

    function handleGoogleLoginClick() {
        auth.signInWithPopup(googleProvider);
    }

    function handleLogoutClick() {
        auth.signOut();
    }
</script>

<div class="m-10">
    <h1 class="text-center text-pink-800 text-3xl">Welcome to {appName}</h1>
    {#if $currentUser}
        <h2 class="text-2xl">Welcome {$currentUser.displayName ?? $currentUser.email} !</h2>
        <Button on:click={handleLogoutClick}>Logout</Button>
        {#if $currentUser.photoURL}
            <img src={$currentUser.photoURL} alt={$currentUser.displayName} />
        {/if}
    {:else}
        <h2 class="text-2xl">Not logged in.</h2>
        <h3 class="text-lg">Create an account!</h3>
        <div>
            <form on:submit|preventDefault={handleEmailAndPasswordRegister}>
                <label for="email">Email</label>
                <input bind:value={registerForm.email} type="email" name="email" class="border-2" />
                <label for="password">Password</label>
                <input
                    bind:value={registerForm.password}
                    type="password"
                    name="password"
                    class="border-2"
                />
                <Button>Register</Button>
            </form>
        </div>
        <h3 class="text-lg">Already have an account? Log in!</h3>
        <div>
            <form on:submit|preventDefault={handleEmailAndPasswordLogin}>
                <label for="email">Email</label>
                <input bind:value={loginForm.email} type="email" name="email" class="border-2" />
                <label for="password">Password</label>
                <input
                    bind:value={loginForm.password}
                    type="password"
                    name="password"
                    class="border-2"
                />
                <Button>Log in</Button>
            </form>
        </div>
        <p>OR</p>
        <div>
            <Button on:click={handleGoogleLoginClick}>Log in with Google</Button>
        </div>
    {/if}
</div>
