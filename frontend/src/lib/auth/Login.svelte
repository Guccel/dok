<script>
  import { createForm } from 'svelte-forms-lib';
  import { session } from '$app/stores';

  import { login_submit } from '$lib/auth/utils.js';

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
