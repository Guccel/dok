<script context="module">
	import { session } from '$app/stores';
</script>

{JSON.stringify($session)}
<p>
	logged in: {$session.user.authenticated}<br />
	is admin: {$session.user.data.type == 'Admin'}
</p>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/products">Products</a>
	<a href="/user">Profile</a>
	<a href="/user/login">Sign up</a>
	{#if $session.user.data.type == 'Admin'}
		<a href="/admin">admin</a>
	{/if}
</nav>

<main>
	<slot />
</main>
