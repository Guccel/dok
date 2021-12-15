<script context="module">

</script>
<script>
    export let loggedIn, admin
</script>

<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/products">Products</a>
    <a href="/login">Sign up</a>
</nav>

<p>Logged in: {loggedIn}</p>
<p>Admin: {admin}</p>
<slot></slot>