<script>
  let view = "login"
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<button on:click="{() => (view = "login")}">Login</button>
<button on:click="{() => (view = "register")}">Register</button>
{#if view == "login"}
  <div>
    <p>Login</p>
    Username: 
    <input type="text">
    Password:
    <input type="password">
    <button>Submit</button>
  </div>
{:else if view == "register"}
  <div>
    <p>Register</p>
    Username: 
    <input type="text">
    Email:
    <input type="email">
    Password: 
    <input type="password">
    Confirm password:
    <input type="password">
    <button>Submit</button>
  </div>
{/if}