<template>
    <div>
        <h1>
            Update Your Information
        </h1>
        <div class="container">
            <form class=" container" @click.prevent>
                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'user']" class=" icon" />
                    <input class="input-field" type="text" v-model="name" placeholder="Name" disabled>
                </div>

                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'envelope']" class=" icon" />
                    <input class="input-field" type="text" placeholder="Email" v-model="email" disabled>
                </div>

                <div class="input-container">
                    <font-awesome-icon :icon="['fas', 'key']" class=" icon" />
                    <input class="input-field" type="password" placeholder="Password" v-model="psw" disabled>
                </div>
                <button type="submit" class="btn" @click="update()">Update</button>
            </form>
            <br>
            <div class=" alert alert-warning" v-if="userNotfoundError.length > 0"> {{ userNotfoundError }} </div>
        </div>
    </div>
</template>

<script setup>
//Import 
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
//Data
let userNotfoundError = ref('');
let name = ref('');
let email = ref('');
let psw = ref('');
let userId = ref('');
//Mounted
 let user = localStorage.getItem("user-info");
        if (user) {
            console.log("Helooz");
            name.value = JSON.parse(user).name;
            email.value = JSON.parse(user).email;
            psw.value = JSON.parse(user).psw;
            userId.value = JSON.parse(user).id;
        } else {
            router.push({ path: "/login" });
        }

//Methods
var update =() =>{
            router.push({ path: "/UpdateProfile" });
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

