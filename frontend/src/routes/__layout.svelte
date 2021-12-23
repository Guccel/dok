<script context="module">
  import { session } from '$app/stores';

  const publicPages = ['/', '/about', '/login'];
</script>

<p>logged in: {$session.user.authenticated}</p>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/products">Products</a>
  <a href="/login">Sign up</a>
</nav>

<main>
  <slot />
</main>
