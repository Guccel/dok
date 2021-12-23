<script>
  import { session } from '$app/stores';

  import { logout_submit } from '$lib/auth/utils.js';
  import Login from '$lib/auth/Login.svelte';
  import Register from '$lib/auth/Register.svelte';

  export let register_bool = true;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

{#if !$session.user.authenticated}
  {#if register_bool}
    <Register />
    Already have an account?:
    <button on:click={() => (register_bool = false)}>login</button>
  {:else}
    <Login />
    or register?:
    <button on:click={() => (register_bool = true)}>register</button>
  {/if}
{:else}
  <button on:click={logout_submit}>logout</button>
{/if}
