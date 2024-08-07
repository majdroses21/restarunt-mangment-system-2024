<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <h1>About Page</h1>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
store.commit('getUserId');
</script>
<style scoped>
.about{
  margin-top: 150px;
}
</style>