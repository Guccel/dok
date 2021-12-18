<script>
  let view = "login"

  function onSubmit(e){
    const formData = new FormData(e.target);

    console.log(formData)

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data)
  }


  async function login(){
    //const load = fetch("http://localhost:3000/products").then(res => res.json());

    fetch('http://localhost:3000/users/login', {
      method: "POST",
      body:{
        "username": "aj",
        "password": "pass"
      }
    })
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<button on:click="{() => (view = "login")}">Login</button>
<button on:click="{() => (view = "register")}">Register</button>

{#if view == "login"}
  <form on:submit|preventDefault={onSubmit}>
    <p>Login</p>

    <div>
      <lable>Username:</lable>
      <input 
        type="text"
        id="username"
        name="username"
      />
    </div>
    
    <div>
      <lable>Password:</lable>
      <input 
        type="password"
        id="password"
        name="password"
      />
    </div>

    <button type="submit" on:click="{login}">Submit</button>
  </form>
{:else if view == "register"}
  <form on:submit|preventDefault={onSubmit}>
    <p>Register</p>
    <div>
      <lable>Username:</lable>
      <input 
        type="text"
        id="username"
        name="username"
      />
    </div>

    <div>
      <lable>Email:</lable>
      <input 
        type="text"
        id="email"
        name="email"
      />
    </div>

    <div>
      <lable>Password:</lable> 
      <input 
        type="password"
        id="password"
        name="password"
      />
    </div>

    <div>
      <lable>Confirm password:</lable>
      <input 
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />
    </div>

    <button type="submit">Submit</button>
  </form>
{/if}