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

  import { register_submit } from '$lib/utils/auth.js';

  let message = '';

  const { form, handleSubmit } = createForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    },

    onSubmit: async (values) => {
      $session;
      const response = await register_submit(values);
      if (response.success) {
        message = 'success';
      } else {
        message = JSON.stringify(response.msg);
      }
    },
  });
</script>

{message}

<form on:submit|preventDefault={handleSubmit}>
  <p>Register</p>
  Username:
  <input type="text" name="username" bind:value={$form.username} /><br />
  Email:
  <input type="text" name="email" bind:value={$form.email} /><br />
  Password:
  <input type="password" name="password" bind:value={$form.password} /><br />
  Confirm password:
  <input type="password" name="password_confirm" bind:value={$form.password_confirm} /><br />
  <button type="submit">submit</button>
</form>

<button on:click={() => goto('./login')}>login</button>
