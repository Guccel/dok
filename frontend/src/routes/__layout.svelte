<script context="module">
  import { session } from '$app/stores';
  let isAdmin = false;
  export async function load({ session }) {
    if (session.user.authenticated) {
      if (session.user.data.type == 'Admin') isAdmin = true;
    }
    return {
      props: {
        isAdmin,
      },
    };
  }
</script>

<script>
  export let isAdmin;
</script>

<p>logged in: {$session.user.authenticated}</p>
<p>is admin: {isAdmin}</p>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/products">Products</a>
  <a href="/user">Profile</a>
  <a href="/user/login">Sign up</a>
  {#if isAdmin}
    <a href="/admin">admin</a>
  {/if}
</nav>

<main>
  <slot />
</main>
