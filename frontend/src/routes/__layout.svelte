<script context="module">
	import { session } from '$app/stores';
</script>

{JSON.stringify($session)}
<p>
	logged in: {$session.user.data.type != 'unauthenticated'}<br />
	is admin: {$session.user.data.type == 'admin'}
</p>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/products">Products</a>
	<a href="/user">Profile</a>
	{#if $session.user.data.type == 'admin'}
		<a href="/admin">admin</a>
	{/if}
</nav>

<main>
	<slot />
</main>
