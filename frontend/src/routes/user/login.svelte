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
	import { loginWithId } from '$lib/helpers/login';
	import axios from 'axios';
	import Cookies from 'js-cookie';

	let isPasswordCorrect = true;
	let isUserExist = true;

	const login_submit = async (event) => {
		const formData = new FormData(event.target);
		const username = formData.get('username');
		const password = formData.get('password');

		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/user/login',
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password
			}
		});
		if (response.status === 201) {
			loginWithId(response.data._id);
		} else if (response.status === 231) {
			isUserExist = true;
			isPasswordCorrect = false;
		} else if (response.status === 404) {
			isUserExist = false;
			isPasswordCorrect = true;
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
	{#if isPasswordCorrect}
		password inccorect <br />
	{/if}
	{#if isUserExist}
		username does not exist <br />
	{/if}
	<button type="submit">Submit</button>
</form>
