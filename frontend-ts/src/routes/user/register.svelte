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

<<<<<<< HEAD
<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	let uuid: string = 'password';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import axios, { AxiosResponse } from 'axios';

	let hasSubmit = false;
	let validation = { userCredentials: false, password: false };

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
		const isPasswordGood = () => {
			if (password.length > 0) return true;
			else return false;
		};

		// validation error or success info for rendering
		let validation = {
			userCredentials: response.status === 201 ? true : false,
			password: isPasswordGood()
		};
		if (response.status === 409) console.log(validation);

		if (validation.userCredentials && validation.password) {
			return goto('/user');
			//TODO implement login on submit
		}
		hasSubmit = true;
	};
</script>

<form on:submit|preventDefault={register_submit}>
	<label for="username">Username</label>
	<input id="username" name="username" type="text" bind:value={uuid} />
	<br />
	<label for="email">Email</label>
	<input id="email" name="email" type="text" bind:value={uuid} />
	<br />
	<label for="password">Password</label>
	<input id="password" name="password" type="password" bind:value={uuid} />
	<br />
	<label for="password_confirm">Confirm Password</label>
	<input id="password_confirm" name="password_confirm" type="password" bind:value={uuid} />
	<br />
	{#if hasSubmit}
		{#if !validation.userCredentials}
			username or password already taken
			<br />
		{/if}
		{#if !validation.password}
			password weak
			<br />
		{/if}
	{/if}
	<button type="submit">register</button>
</form>

=======
<script>
	import { goto } from '$app/navigation';
</script>

>>>>>>> main
<button on:click={() => goto('./login')}>login</button>
