<template>
  <div class="body">
    <NavbarAuth />
    <div class="cont">
      <div class="img-conainar">
        <img src="../assets/images/data.gif" alt="">
      </div>
      <div class="form-containar">
        <h1>Wellcome, Sing Up Just for mangers</h1>
        <p> The intuitive management system like you have never experienced one before</p>
        <form class=" container" @click.prevent>
          <!-- name -->
          <div class="input-container form-floating mb-3">
            <input type="text" placeholder="Enter your Name" v-model="state.name" id="flotName" class="form-control">
            <label for="flotName">Enter your Name</label>
          </div>
          <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
          <!-- E-mail -->
          <div class="input-container form-floating mb-3">
            <input type="text" placeholder="Enter Your E-mail" v-model="state.email" id="flotEmail" class="form-control">
            <label for="flotEmail">Enter Your E-mail</label>
          </div>
          <span class="validate-style" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>
          <!-- password -->
          <div class="input-container form-floating mb-3">
            <input class="form-control" type="password" placeholder="Password" v-model="state.psw" autocomplete="on"
              id="flotPass">
            <label for="flotPass">Enter Your Password</label>
          </div>
          <span class="validate-style" v-if="v$.psw.$error"> {{ v$.psw.$errors[0].$message }}</span>
          <br>
          <button type="submit" class="btni" @click="validateEmailBeforSin()">Register</button>
        </form>
        <br>
        <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
        <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
      </div>

    </div>
  </div>
</template>
<!--  
<template>
  <div>
    <router-link to="/login" class="sign"> Login</router-link> <span style="font-size:30px"> || </span> <router-link
      to="/sinup" class="log"> Sign Up </router-link>
  </div>

  <div class="container">
    <form class=" container" @click.prevent>
      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'user']" class=" icon" />
        <input class="input-field" type="text" placeholder="Name" v-model="state.name">
      </div>
      <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>

      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'envelope']" class=" icon" />
        <input class="input-field" type="text" placeholder="Email" v-model="state.email">
      </div>
      <span class="validate-style" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>


      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'key']" class=" icon" />
        <input class="input-field" type="password" placeholder="Password" v-model="state.psw" autocomplete="on">
      </div>
      <span class="validate-style" v-if="v$.psw.$error"> {{ v$.psw.$errors[0].$message }}</span>


      <button type="submit" class="btn" @click="validateEmailBeforSin()">Register</button>
    </form>
    <br>
  </div>
  <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
  <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
</template>
-->
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import NavbarAuth from "@/components/NavbarAuth.vue";

// Data 
const state = ref({
  name: '',
  email: '',
  psw: ''
});

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    psw: { required }
  };
});

const v$ = useVuelidate(rules, state);


let userEmailExists = ref("");
let successMessage = ref("");
let errorMessage = ref("");



// Methods

let validateEmailBeforSin = async () => {
  console.log("Clicked");
  await axios.get(`http://localhost:3000/users?email=${state.value.email}`)
    .then(res => {
      userEmailExists.value = res.data; //val
      if (userEmailExists.value.length == 0) {
        sign();
      } else {
        successMessage.value = "";
        errorMessage.value = "Ohh Sorry, This Email is already Exists:-("
      }
    })
    .catch(err => {
      console.log("err?", err);
    });
};

let sign = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("Tamaamaan");
    let url = "http://localhost:3000/users";
    let params = {
      name: state.value.name,
      email: state.value.email,
      psw: state.value.psw
    }
    await axios.post(url, params)
      .then(result => {
        console.log("Add user successfully");
        // Save user Data to Local Storage
        localStorage.setItem("user-info", JSON.stringify(result.data));
        console.log(result.data);
        // reduse To Home Page
        router.push({ path: "/" });
      })
      .catch(err => {
        console.log("Add user failed", err);
      });
  } else {
    console.log("Mesh Tamam Khales");
  }
}
// Mounted
const router = useRouter();
let user = localStorage.getItem("user-info");
if (user) {
  router.push({ path: "/" });
}
</script>

<style scoped>
@import '../assets/css/Auth.css';
</style>






