<template>
    <div>
        <h1>
            Update Your Information
        </h1>
        <div class="container">
            <form class=" container" @click.prevent>
                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'user']" class=" icon" />
                    <input class="input-field" type="text" v-model="state.name" placeholder="Name">
                </div>
                <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>

                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'envelope']" class=" icon" />
                    <input class="input-field" type="text" placeholder="Email" v-model="state.email">
                </div>
                <span class="validate-style" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>

                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'key']" class=" icon" />
                    <input class="input-field" type="password" placeholder="Password" v-model="state.psw">
                </div>
                <span class="validate-style" v-if="v$.psw.$error"> {{ v$.psw.$errors[0].$message }}</span>
                <button type="submit" class="btn" @click="updateNow()">Update</button>
            </form>
            <br>
            <div class=" alert alert-warning" v-if="userNotfoundError.length > 0"> {{ userNotfoundError }} </div>
        </div>
    </div>
    <div>
        <br>
        <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
        <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
    </div>
</template>


<script setup>
//Import
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

let router = useRouter();
//Data
let userNotfoundError = ref('');
let userId = ref('');
let successMessege = ref('');
let errorMessage = ref('');
//Validation
let state = ref({
    name: "",
    email: "",
    psw: "",
});

let rulses = computed(() => {
    return {
        name: { required, minLength: minLength(10) },
        email: { required, email },
        psw: { required, minLength: minLength(8) }
    };
});
const v$ = useVuelidate(state, rulses);
//Mounted
let user = localStorage.getItem("user-info");

if (!user) {
    router.push({ path: "/" });
} else {
    state.value.name = JSON.parse(user).name;
    state.value.email = JSON.parse(user).email;
    state.value.psw = JSON.parse(user).psw;
    userId.value = JSON.parse(user).id;
}
//Methods
const updateNow = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        console.log("تمااام !");
        let url = `http://localhost:3000/users/${userId.value}`;
        let params = {
            name: state.value.name,
            email: state.value.email,
            psw: state.value.psw
        };
        await axios.put(url, params)
            .then(result => {
                console.log("Profile is updated successfully");
                localStorage.setItem("user-info", JSON.stringify(result.data));
                errorMessage.value = "";
                successMessege.value = "Profile is updated successfully";
                setTimeout(() => {
                    router.push({ path: "/profile" });
                }, 2500);
                console.log(result.data);
            })
            .catch(error => {
                successMessege.value = "";
                errorMessage.value = "Profile is Not updated";
                console.warn("Profile is Not updated", error);
            });
    } else {
        console.log("Not Validted");
        userNotfoundError.value = "User not found 404";
    }
};


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
    background: rgb(182, 112, 247);
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
    border: 2px solid rgb(182, 112, 247);
    ;
}

/* Set a style for the submit button */
.btn {
    background-color: rgb(182, 112, 247);
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
</style>


