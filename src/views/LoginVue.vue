<template>
  <div class="body">
    <NavbarAuth />
    <div class="cont">
      <div class="img-conainar">
        <img src="../assets/images/data.gif" alt="">
      </div>
      <div class="form-containar">
        <h1>Wellcome, Login Just for mangers</h1>
        <p>The intuitive management system
          like you have never experienced one before</p>
        <form class=" container" @click.prevent>
          <div class="input-container form-floating mb-3">
            <input type="text" placeholder="Enter Your E-mail" v-model="state.email" id="flotPriceInp"
              class="form-control">
            <label for="flotPriceInp">Enter Your E-mail</label>
          </div>
          <span class="validate-style" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>

          <div class="input-container form-floating mb-3">
            <input class="form-control" type="password" placeholder="Password" v-model="state.psw" autocomplete="on">
            <label for="flotPriceInp">Enter Your Password</label>
          </div>
          <span class="validate-style" v-if="v$.psw.$error"> {{ v$.psw.$errors[0].$message }}</span>
          <br>
          <button type="submit" class="btni" @click="userLogin()">Login</button>
        </form>
        <br>
        <div class=" alert alert-warning" v-if="userNotfoundError.length > 0"> {{ userNotfoundError }} </div>
      </div>

    </div>
  </div>
</template>
<script setup>

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { ref, computed } from "vue";
import NavbarAuth from "@/components/NavbarAuth.vue";
import { useStore } from "vuex";
// import router from '@/router';
import { useRouter } from 'vue-router';

const router = useRouter();
let store = useStore();

// Data
const state = ref({
  email: '',
  psw: ''
});

const userNotfoundError = ref('');

const rules = computed(() => {
  return {
    email: { required, email },
    psw: { required }
  }
});


const v$ = useVuelidate(rules, state);


// Methods


const userLogin = async () => {
  const result = await v$.value.$validate();
  // if No Err
  if (result) {
    
   const res = await  store.dispatch('logIn', state.value);
   if (res) {
   setTimeout(() => {
     router.push({path: '/'})
  }, 200);
  setTimeout(() => {
    window.location.reload();
  }, 500);
   }
  } else {
    console.log("Mesh Tamam Khales");
    userNotfoundError.value = "User not found 404";
  }
}
</script>

<style scoped>
@import '../assets/css/Auth.css';
</style>