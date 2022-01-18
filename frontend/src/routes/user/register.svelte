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
	import axios, { AxiosResponse } from 'axios';
	import Cookies from 'js-cookie';

	let hasSubmit = false;
	let validation = { userCredentials: false, password: false };
	let password;
	let password_confirm;
	$: doPasswordsMatch = password == password_confirm;

	// tests if username and email are available, then creates user if true
	const register_submit = async (event) => {
		const form_data = new FormData(event.target);
		const username: string = form_data.get('username').toString();
		const email: string = form_data.get('email').toString();
		const password: string = form_data.get('password').toString();
		const password_confirm: string = form_data.get('password_confirm').toString();

		const response: AxiosResponse = await axios({
			method: 'POST',
			url: 'http://localhost:3000/user/register',
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				email,
				password
			}
		});

		// tests if password is strong enough
		//TODO make better
		const isPasswordGood = (value: string) => {
			if (value.length > 0) {
				return true;
			} else return false;
		};

		// validation error or success info for rendering
		validation = {
			userCredentials: response.status === 201 ? true : false,
			password: isPasswordGood(password)
		};

		if (response.status === 260) {
		}

		if (validation.userCredentials && validation.password) {
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
			return goto('/user');
			//TODO implement login on submit
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
		{#if !validation.userCredentials}
			username or password already taken
			<br />
		{/if}
		{#if !validation.password}
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
