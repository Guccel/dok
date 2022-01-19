<script>
  import { page } from '$app/stores';
  import axios from "axios"; 
  import {goto} from '$app/navigation'
  import { onMount } from 'svelte';

  export let responce = "";

  onMount(async () => {
    await axios({
      method: "GET",
      url: `http://localhost:3000/session/verify/${$page.params.slugs}`,
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if(res.status == 200) {goto("/")}
    }).catch((err) => {
      responce = err
    })
  })

</script>

{responce}