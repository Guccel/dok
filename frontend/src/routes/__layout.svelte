<script context="module">
  import { session } from '$app/stores';
</script>

<p>logged in: {$session.user.authenticated}</p>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/products">Products</a>
  <a href="/user">Profile</a>
  <a href="/user/login">Sign up</a>
  <!-- <a href="/admin">admin</a> -->
</nav>

<main>
  <slot />
</main>
