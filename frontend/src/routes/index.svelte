<script>
  import { session } from '$app/stores';
</script>

<svelte:head>
  <title>Dokatsu</title>
</svelte:head>

<h1>Welcome to Dokatsu</h1>

{JSON.stringify($session)}
