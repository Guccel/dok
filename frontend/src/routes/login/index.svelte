<script>
  import 'axios'
  let view = "login"

  function onSubmit(e){
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const out = axios({
      method: 'GET',
      url: 'localhost:300/auth/login',
      data: {
        username: data.username,
        password: data.password,
      }
    })
    console.log(out.data);
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<button on:click="{() => (view = "login")}">Login</button>
<button on:click="{() => (view = "register")}">Register</button>
{#if view == "login"}
  <form on:submit|preventDefault="{onSubmit}">
    <p>Login</p>
    Username:
    <input type="text" name="username">
    Password:
    <input type="password" name="password">
    <button>Submit</button>
  </form>
{:else if view == "register"}
  <form>
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
  </form>
{/if}

