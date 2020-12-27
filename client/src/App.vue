<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: "porter_sans";
  src: url("./fonts/porter-sans-inline-block-webfont.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "fredoka_one";
  src: url("./fonts/FredokaOne-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "red_hat_dispaly";
  src: url("./fonts/RedHatDisplay-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "red_hat_dispaly", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
