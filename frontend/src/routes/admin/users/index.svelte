<script context="module">
	export async function load() {
		const users = await axios({
			method: 'GET',
			url: 'http://localhost:3000/user/bulk',
			headers: { 'Content-Type': 'application/json' }
		});

		return {
			props: {
				users: users.data
			}
		};
	}
</script>

<script lang="ts">
	import axios from 'axios';

	export let users: any[];

	async function updateUser(i: number) {
		const user = users[i];
		await axios({
			method: 'PATCH',
			url: `http://localhost:3000/user/patch/${user._id}`,
			headers: { 'Content-Type': 'application/json' },
			data: user
		});
	}
</script>

<table>
	<tr>
		<td>username</td>
		<td>email</td>
		<td>verified</td>
		<td>type</td>
	</tr>
	{#each users as user, i}
		<tr>
			<td>{user.username}</td>
			<td>{user.email}</td>
			<td>{user.verified}</td>
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
</table>
