<script context="module">
	export async function load({ session }) {
		if (!session.user.authenticated) {
			return {
				status: 300,
				redirect: '/user/login'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import type { User_Type } from 'src/global';

	import { session } from '$app/stores';

	import Cookies from 'js-cookie';

	const logout = () => {
		Cookies.remove('session_id');

		const user: User_Type = {
			authenticated: false,
			session_id: '',
			data: {}
		};
		session.update((store) => ({
			...store,
			user: {
				authenticated: false,
				session_id: '',
				data: {}
			}
		}));
	};
</script>

<p>user</p>

<button on:click={logout}>logout</button>
