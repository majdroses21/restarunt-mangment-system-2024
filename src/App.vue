<template>
  <nav-bar> </nav-bar>
  <slide-bar></slide-bar>
  <router-view />
</template>


<script setup>
import NavBar from './components/NavBar.vue';
import SlideBar from "@/components/SlideBar.vue";
/*
const slid = document.querySelector(".slideBar");
const app = document.querySelector("#app");
if (slid.classList("active")) {
  // app.style.display = "none";
  console.log(app);
}
*/

</script>

<!-- todo: fix App Styless -->
<style>
:root{
  --main-color: #ffa600;
  --main-color-opc: #ffa600b8;
}
#app {
  /* border: var(--main-color) solid 5px; */
  width: calc(100% - 90px) ;
  margin-left: 90px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.slideBar.active #app {
  border: red solid 5px;
}

</style>
