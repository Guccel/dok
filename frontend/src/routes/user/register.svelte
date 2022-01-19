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
	import axios, { AxiosResponse } from 'axios';
	import Cookies from 'js-cookie';

	let hasSubmit = false;
	let password;
	let password_confirm;

	let isCredentialsFree = true;
	let isStrongPassword = true;
	$: doPasswordsMatch = password == password_confirm;

	// tests if username and email are available, then creates user if true
	const register_submit = async (event) => {
		const form_data = new FormData(event.target);
		const username: string = form_data.get('username').toString();
		const email: string = form_data.get('email').toString();
		const password: string = form_data.get('password').toString();

		//TODO make less shitty
		// tests if password is strong enough
		if (!(password.length > 0)) {
			hasSubmit = true;
			isStrongPassword = false;
		}

		if (isStrongPassword) {
			const response_register: AxiosResponse = await axios({
				method: 'POST',
				url: 'http://localhost:3000/user/register',
				headers: { 'Content-Type': 'application/json' },
				data: {
					username,
					email,
					password
				}
			});
			if (response_register.status === 409) {
				hasSubmit = true;
				isCredentialsFree = false;
			}

			if (response_register.status === 201) {
				const response_login = await axios({
					method: 'POST',
					url: 'http://localhost:3000/session/login',
					headers: { 'Content-Type': 'application/json' },
					data: {
						username,
						password
					}
				});
				if (response_login.status === 201) {
					loginWithId(response_login.data._id);
				}
				return goto('/user');
				//TODO implement login on submit
			}
		}

		hasSubmit = true;
	};
</script>

<form on:submit|preventDefault={register_submit}>
	<label for="username">Username</label>
	<input id="username" name="username" type="text" />
	<br />
	<label for="email">Email</label>
	<input id="email" name="email" type="text" />
	<br />
	<label for="password">Password</label>
	<input id="password" name="password" type="password" bind:value={password} />
	<br />
	<label for="password_confirm">Confirm Password</label>
	<input id="password_confirm" name="password_confirm" type="password" bind:value={password_confirm} />
	<br />
	{#if hasSubmit}
		submited
		{#if !isCredentialsFree}
			username or password already taken
			<br />
		{/if}
		{#if !isStrongPassword}
			password weak
			<br />
		{/if}
	{/if}
	{#if doPasswordsMatch}
		<button type="submit">Submit</button>
	{:else}
		passwords do not match
	{/if}
</form>
