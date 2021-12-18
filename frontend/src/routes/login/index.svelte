<script context="module">
  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {};
  }
</script>

<script>
  import axios from 'axios';
  import { createForm } from 'svelte-forms-lib';

  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { post } from '$lib/login/utils.js';

  const { form, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      promise = post({
        username: values.username,
        password: values.password,
      });
    },
  });

  let promise;

  export const view = 'login';
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

{#await promise}
  <p>...waiting</p>
{:then data}
  <p>{data}</p>
{:catch error}
  <p>{error.message}</p>
{/await}

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
