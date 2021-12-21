<script context="module">
</script>

<script>
  import { createForm } from 'svelte-forms-lib';
  import { browser } from '$app/env';
  import Cookies from 'js-cookie';

  import { goto } from '$app/navigation';
  import { login, setCookie } from '$lib/login/utils.js';

  const { form, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: async (values) => {
      const response = await login({
        username: values.username,
        password: values.password,
      });
      if (response.success) {
        console.log(response);
        setCookie(response.session_id);
      }
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

{#if view == 'login'}
  <form on:submit|preventDefault={handleSubmit}>
    <p>Login</p>
    Username:
    <input type="text" name="username" bind:value={$form.username} />
    Password:
    <input type="password" name="password" bind:value={$form.password} />
    <button type="submit">submit</button>
  </form>
{:else if view == 'register'}
  <form>
    <p>Register</p>
    Username:
    <input type="text" />
    Email:
    <input type="email" />
    Password:
    <input type="password" />
    Confirm password:
    <input type="password" />
    <button>Submit</button>
  </form>
{/if}
