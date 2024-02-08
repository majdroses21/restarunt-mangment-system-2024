<template>
  <div class="body">
    <NavbarAuth/>
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
import axios from "axios";
import { useRouter } from 'vue-router';
import NavbarAuth from "@/components/NavbarAuth.vue";

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
  v$.value.$validate();
  // if No Err
  if (!v$.value.$error) {
    console.log("Tamaamaan");
    //
    // let url = `http://localhost/rest-system-2024%20-%20classic/src/API/auth/logIn.php`;
    let url = `http://localhost:3000/users?email=${state.value.email}&pswd=${state.value.psw}`;

    let params = {
      email: state.value.email,
      pass: state.value.psw
    }
    await axios.get(url, params)
      .then(response => {
        // يتم التعامل مع الاستجابة هنا
        console.log(response.data);
        console.log("Done :-)");
        console.table(response);
        console.table(response.data);
        localStorage.setItem("user-info", JSON.stringify(response.data[0]));
        router.push({ path: "/" });
      })
      .catch(error => {
        // يتم التعامل مع الخطأ هنا
        console.error(error);
        console.log(error + "Erroooor");
        console.table(error);
        userNotfoundError.value = "user not found 404 :-(";
      });
    console.log("logged In");
  } else {
    console.log("Mesh Tamam Khales");
    userNotfoundError.value = "User not found 404";
  }
}

// Mounted
const user = localStorage.getItem("user-info");
const router = useRouter();

if (user) {
  router.push({ path: "/" });
}
</script>


<style scoped>
* {
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

:root {
  --main-color: rgba(0, 0, 0, 0.962);

}

.cont {
  display: flex;
  position: relative;
  
}


/* Style the input container */
.input-container {
  /* display: flex; */
  /* width: 100%; */
  margin-bottom: 15px;
}

/* Style the form icons */
.form-containar {
  width: 50%;
  transform: translateY(30%);
}

.img-conainar {
  width: 40%;
  transform: translateY(10%);
}

/* Set a style for the submit button */
.btni {
  background-color: #ffa600;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 70%;
  border-radius: 30px;
  margin-top: 10px;
  opacity: 0.9;
}

.btni:hover {
  opacity: 1;
}
@media (max-width: 480px) {
  .form-containar{
    /* display: none; */
    width: 100%;
    background-color: rgba(128, 128, 128, 0.474);
    backdrop-filter: blur(1.7px);
  }
  .img-conainar{
    /* border: red solid 1px; */
    width: 70%;
    position: absolute;
    left: 33px;
  }
  img{
    width: 100%;
    text-align: center;
    align-items: center;
    transform: translateX(40px);
    transform: translateY(-40px);
    z-index: 1;
  }
  h1 , p{
    color: #fff;
  }
}
@media (min-width:768px) and (max-width:900px) {
  .form-containar{
  width: 100%;  
  /* display: none; */
  }
  .img-conainar{
    /* width: 50%; */
    position: absolute;
    /* transform: translateX(20%); */
    transform: translateY(70%);
    left: 15%;
    
  }
}
.validate-style {
  color: red;
  margin-bottom: -30px;
}
</style>






