<script context="module">
	export async function load({ session }) {
		if (session.user.authenticated) {
			return {
				status: 300,
				redirect: '/user'
			};
		}
		return {};
	}
</script>

<script>
	import { goto } from '$app/navigation';
</script>

<button on:click={() => goto('./login')}>login</button>
