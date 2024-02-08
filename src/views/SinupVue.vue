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
  <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
  <div class=" alert alert-danger" v-if="errorMessege.length > 0"> {{ errorMessege }} </div>
</template>


<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required , email  } from "@vuelidate/validators";
import { ref , computed } from "vue";
import  axios  from "axios";
import {  useRouter } from "vue-router";

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
    psw : { required }
  };
});

const v$ = useVuelidate(rules, state);


    let userEmailExists = ref("");
    let successMessege = ref("");
    let errorMessege = ref("");



// Methods

    let validateEmailBeforSin = async () => {
      console.log("Clicked");
      let res = await axios.get(`http://localhost:3000/users?email=${state.value.email}`);
      if (res.status == 200) {
        userEmailExists.value = res.data; //val
        if (userEmailExists.value.length == 0) {
         sign();
        } else {
          successMessege.value = "";
          errorMessege.value = "Ohh Sorry, This Email is already Exists:-("
        }
      } 
    };


    let sign = async ()=> {
      v$.value.$validate();
      if (!v$.value.$error) {
        console.log("Tamaamaan");
        let url = "http://localhost:3000/users";
        let params = {
          name: state.value.name,
          email: state.value.email,
          psw: state.value.psw

        }
        let result = await axios.post(url, params);
        if (result.status == 201) {
          console.log("Add user successfully");
          // Save user Data to Local Storage
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data);
          // reduse To Home Page
         router.push({ path: "/" });

        } else {
          console.log("Add user failed");
        }
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
* {
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

/* Style the input container */
.input-container {
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
}

/* Style the form icons */
.icon {
  padding: 10px;
  background: rgb(87, 172, 78);
  ;
  color: white;
  min-width: 50px;
  text-align: center;
}

/* Style the input fields */
.input-field {
  width: 100%;
  padding: 6px;
  outline: none;
}

.input-field:focus {
  border: 2px solid rgb(87, 172, 78);
  ;
}

/* Set a style for the submit button */
.btn {
  background-color: rgb(87, 172, 78);
  ;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}

.log {
  color: gray;
  font-size: 35px;

}

.sign {
  color: gray;
  font-size: 35px;
}


/* .sign.router-link-exact-active{
    color:red;
} */
.log.router-link-exact-active {
  color: rgb(87, 172, 78);
  ;
}

/*  */

.validate-style {
  color: red;
  margin-bottom: -30px;
}
</style>






