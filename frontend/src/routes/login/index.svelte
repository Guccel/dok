<script context="module">
</script>

<script>
  import { createForm } from 'svelte-forms-lib';
  import { browser } from '$app/env';
  import Cookies from 'js-cookie';
  import { session } from '$app/stores';

  import { goto } from '$app/navigation';
  import { login_submit, logout_submit } from './utils';

  const { form, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: async (values) => {
      $session;
      login_submit(values);
    },
  });

  export const view = 'login';
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>
<button on:click={() => (view = 'login')}>Login</button>
<button on:click={() => (view = 'register')}>Register</button>

<form on:submit|preventDefault={handleSubmit}>
  <p>Login</p>
  Username:
  <input type="text" name="username" bind:value={$form.username} />
  Password:
  <input type="password" name="password" bind:value={$form.password} />
  <button type="submit">submit</button>
</form>

<button on:click={logout_submit}>logout</button>
