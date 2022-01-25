<script context="module">
	export async function load() {
		const response = await axios({
			method: 'POST',
			url: 'http://localhost:3000/todo',
			headers: { 'Content-Type': 'application/json' },
			data: {}
		});

		return {
			props: {
				todo_ids: response.data._ids
			}
		};
	}
</script>

<script lang="ts">
	import axios from 'axios';

	export let todo_ids: Array<string>;
</script>

{#key todo_ids}
	{#each todo_ids as id}
		{JSON.stringify(id)}
	{/each}
{/key}
