<script context="module">
	import { session } from '$app/stores';
</script>

{#if $session.user.data.type == 'unauthenticated'}
	<nav>
		<a href="login">Login</a>
		<a href="register">Register</a>
	</nav>
{:else}
{/if}

<main>
	<slot />
</main>
