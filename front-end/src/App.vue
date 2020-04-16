<template>
<div id="app">
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/storycreator">Story Creator</router-link>|
    <router-link to="/admin">Admin</router-link>
  </div>
  <router-view />
</div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


body,
html {
  background-color: #7CDBD5
}

#app {
  font-family: 'Karla', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #F9BE02;
}
</style>
