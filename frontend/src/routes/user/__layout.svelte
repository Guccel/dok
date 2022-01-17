<script context="module">
	import { session } from '$app/stores';
</script>

{#if $session.user.authenticated == false}
  <nav>
    <a href="login">Login</a>
    <a href="register">Register</a>
  </nav>
{/if}

<main>
	<slot />
</main>
