<template>
<div id="app">
  <div id="nav">
    <router-link to="/"><img src="../public/images/books.jpg"></router-link>
    <router-link to="/">Home</router-link> |
    <router-link to="/storycreator">Story Creator</router-link> |
    <router-link to="/admin">Admin</router-link>
  </div>
  <router-view />
  <div class="footer">
    <a href="https://github.com/jwilkerson128/creative-project-4">Github Repository</a>
  </div>
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
  padding-left: 0px;
  background-color: #02C8A7;
}

#nav img {
  padding-right: 10px;
  margin-left: auto;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #F9BE02;
}

p {
  text-align: left;
}

.footer {
  margin: 15px;
  padding: 10px;
  border-top: 1px solid #F9BE02;
  text-align: left;
}
</style>
