<script context="module">
  export async function load({ session }) {
    if (!session.user.authenticated) {
      return {
        status: 300,
        redirect: '/user/login',
      };
    }
    return {};
  }
</script>

<script>
  import { logout_submit } from '$lib/auth/utils.js';
</script>

<p>user</p>

<button on:click={logout_submit}>logout</button>
