<script lang="ts">
	import axios from 'axios';

	import { onMount } from 'svelte';

	export let users = [];

	async function updateUser(i: number) {
		const user = users[i];
		await axios({
			method: 'PATCH',
			url: `http://localhost:3000/user/patch/${user._id}`,
			headers: { 'Content-Type': 'application/json' },
			data: user
		});
	}

	onMount(async () => {
		return await axios({
			method: 'POST',
			url: 'http://localhost:3000/user',
			headers: { 'Content-Type': 'application/json' },
			data: { filter: 'all' }
		}).then((res) => {
			users = res.data._ids;
		});
	});
</script>

<table>
	<tr>
		<td>username</td>
		<td>email</td>
		<td>type</td>
	</tr>
	{#await users}
		<p>Loading user data</p>
	{:then data}
		{#each data as user, i}
			<tr>
				<td>{user.username}</td>
				<td>{user.email}</td>
				<td>
					<select
						bind:value={user.type}
						on:change={() => {
							updateUser(i);
						}}
					>
						<option value="user">user</option>
						<option value="admin">admin</option>
					</select>
				</td>
			</tr>
		{/each}
	{/await}
</table>
