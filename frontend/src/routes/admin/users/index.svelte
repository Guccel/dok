<script context="module">
	export async function load() {
		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/user',
			headers: { 'Content-Type': 'application/json' },
			data: { method: 'all' }
		});

		return {
			props: {
				users: response.data.users
			}
		};
	}
</script>

<script lang="ts">
	import axios from 'axios';

	import type { User_Type } from 'src/global';

	export let users: Array<User_Type>;

	async function updateUser(i: number) {
		const user = users[i];
		const response = await axios({
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
		<td>type</td>
	</tr>
	{#each users as user, i}
		<tr>
			<td>{user.username}</td>
			<td>{user.email}</td>
			<td
				><select
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
