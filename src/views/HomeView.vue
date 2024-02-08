<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <h1>Home Page</h1>
    Your Pet Name is: {{ this.$store.state.petName }}
  </div>
</template>

<script setup>
import { ref  } from "vue";
import { useRouter } from 'vue-router';
//Data
let userId = ref('');
// Mounted
  const router = useRouter();
  let user = localStorage.getItem("user-info");
  if (! user) {
    router.push({ path: "/login" });
  }else{
    userId.value = JSON.parse(user).id;
    console.log(userId.value);
  }
</script>