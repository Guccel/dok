<script context="module">
  export async function load({ session }) {
    if (session.user.authenticated) {
      return {
        status: 300,
        redirect: '/user',
      };
    }
    return {};
  }
</script>

<script>
  import { createForm } from 'svelte-forms-lib';
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';

  import { login_submit } from '$lib/utils/auth.js';

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
</script>

<form on:submit|preventDefault={handleSubmit}>
  <p>Login</p>
  Username:
  <input type="text" name="username" bind:value={$form.username} /><br />
  Password:
  <input type="password" name="password" bind:value={$form.password} /><br />
  <button type="submit">submit</button>
</form>

<button on:click={() => goto('./register')}>register</button>
