<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getSessionData } from '../../../hooks/helpers';
	import axios from 'axios';

	onMount(async () => {
		getSessionData($page.params.slugs)
			.then(async (res) => {
				await axios({
					method: 'HEAD',
					url: `http://localhost:3000/email/verify/${res._id}`
				});
			})
			.catch((err) => {
				if (err) throw err;
			});

		goto('/');
	});
</script>
