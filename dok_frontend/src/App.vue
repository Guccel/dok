<template>
  <header>
    <img src="../public/dok.svg" alt="" />
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/about">ABOUT</router-link>
      <router-link to="/products">PRODUCTS</router-link>
      <router-link to="/admin">ADMIN</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
$c1: rgb(255, 212, 131);

@font-face {
  font-family: AreaKilometer;
  src: url(../public/AreaKilometer50-ow3xB.ttf);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  $header-height: 70pt;
  font-family: 'AreaKilometer';
  position: relative;
  height: $header-height;
  width: 100vw;
  background-color: $c1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80pt;
  padding-left: 80pt;
  border-top: 6pt solid black;
  border-bottom: 6pt solid black;
  img {
    height: 100%;
  }
  nav {
    display: flex;
    margin-top: 8pt;
    gap: 60pt;

    a {
      font-size: 20pt;
      position: relative;
      color: black;

      &.router-link-exact-active::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 2pt;
        bottom: 4pt;
        background-color: black;
      }
    }
  }
}
</style>
