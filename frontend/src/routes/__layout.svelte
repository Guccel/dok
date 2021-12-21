<script context="module">
  const publicPages = ['/', '/about', '/login'];
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/products">Products</a>
  <a href="/login">Sign up</a>
</nav>

<main>
  <slot />
</main>
