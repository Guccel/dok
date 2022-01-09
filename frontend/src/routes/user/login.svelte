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

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import axios from 'axios';
	import Cookies from 'js-cookie';

	// import { login_submit } from '$lib/utils/auth.js';

	const login_submit = async (event) => {
		const formData = new FormData(event.target);
		const username = formData.get('username');
		const password = formData.get('password');

		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/session/login',
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password
			}
		});
		if (response.status === 201) {
			Cookies.set('session_id', response.data._id, {
				sameSite: 'lax'
			});

			// Update session with current user data
			session.update((store) => ({
				...store,
				user: {
					authenticated: true,
					session_id: response.data._id,
					data: response.data.data
				}
			}));
		}
	};
</script>

<form on:submit|preventDefault={login_submit}>
	<label for="username">Username</label>
	<input id="username" name="username" type="text" />
	<br />
	<label for="password">Password</label>
	<input id="password" name="password" type="password" />
	<br />

	<button type="submit">Login</button>
</form>

<button on:click={() => goto('./register')}>register</button>
