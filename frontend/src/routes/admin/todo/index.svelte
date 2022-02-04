<script context="module">
	export async function load() {
		const response_ids = await axios({
			method: 'POST',
			url: 'http://localhost:3000/todo',
			headers: { 'Content-Type': 'application/json' },
			data: {}
		});

		const response_adminIds = await axios({
			method: 'POST',
			url: 'http://localhost:3000/user',
			headers: { 'Content-Type': 'application/json' },
			data: { filter: 'admin' }
		});

		let adminName_arr = [];

		for (let i = 0; i < response_adminIds.data.length; i++) {
			const response_adminName = await axios({
				method: 'POST',
				url: `http://localhost:3000/user/get/${response_adminIds.data._ids[i]._id}`,
				headers: { 'Content-Type': 'application/json' },
				data: { filter: 'basic' }
			});
			adminName_arr.push({
				name: response_adminName.data,
				_id: response_adminIds.data._ids[i]
			});
		}
		return {
			props: {
				todo_ids: response_ids.data._ids,
				adminName_arr
			}
		};
	}
</script>

<script lang="ts">
	import axios from 'axios';

	export let todo_ids: Array<String>;
	export let adminName_arr: Array<{ name: String; _id: String }>;

	let newTodo = {
		title: '',
		description: '',
		assign: ''
	};
</script>

Name:<input type="text" bind:value={newTodo.title} /><br />
Description:<input type="text" bind:value={newTodo.description} /><br />
Assign:
{JSON.stringify(adminName_arr)}
<select bind:value={newTodo.assign}
	><br />
	{#each adminName_arr as i}
		<option value={i.name} />
	{/each}
</select>

{#key todo_ids}
	{#each todo_ids as id}
		{JSON.stringify(id)}
	{/each}
{/key}
