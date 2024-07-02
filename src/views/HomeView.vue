<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <h1>Home Page</h1>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
store.commit('getUserId');
</script>
<style scoped>
.home{
  margin-top: 150px;
}
</style>