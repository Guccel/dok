<script lang="ts">
	import axios from 'axios';

	export let _id = '';

	$: response_promise = axios({
		method: 'POST',
		url: `http://localhost:3000/product/get/${_id}`,
		headers: { 'Content-Type': 'application/json' },
		data: {}
	});
</script>

{#await response_promise}
asd
{/await}
