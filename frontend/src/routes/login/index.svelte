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

  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { post } from '$lib/utils.js';

  let username = 'tester';
  let password = 'password123';
  let errors = null;

  const body = {
    username: 'tester',
    password: 'password123',
  };

  console.log(body.toString());
  const load = fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(body),
  });
  async function submit(event) {
    // const response = await axios({
    //   method: 'POST',
    //   url: 'http://localhost:3000/auth/login',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   data: { username, password },
    // });
    // const response = await post(`auth/login`, { username, password });
    // console.log(response.data);
    // errors = response.errors;
    // if (response.user) {
    //   $session.user = response.user;
    //   goto('/');
    // }
  }

  export const view = 'login';
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

{#await load then data}
  {data}
{/await}

<h1>Login</h1>
<button on:click={() => (view = 'login')}>Login</button>
<button on:click={() => (view = 'register')}>Register</button>
{#if view == 'login'}
  <form on:submit={submit}>
    <p>Login</p>
    Username:
    <input type="text" name="username" />
    Password:
    <input type="password" name="password" />
    <button>Submit</button>
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
