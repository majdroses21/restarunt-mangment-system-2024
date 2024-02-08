<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-plus" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Restaurant</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @click.prevent>
                        <div class="container">
                            <!-- Name -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                                <input type="text" class="form-control" placeholder="Resturant Name" name="name"
                                    v-model="state.name">
                            </div>
                            <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
                           <!-- Num -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'phone']" class=" icon" />
                                <input type="number" class="form-control" placeholder="Phone Number" name="num"
                                    v-model="state.num">
                            </div>
                            <span class="validate-style" v-if="v$.num.$error"> {{ v$.num.$errors[0].$message }}</span>
                           <!-- Decsraptio -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['fas', 'map-location-dot']" class=" icon" />
                                <textarea class="form-control" placeholder="Address" name="addr"
                                    v-model="state.addr"> </textarea>
                            </div>
                            <span class="validate-style" v-if="v$.addr.$error"> {{ v$.addr.$errors[0].$message }}</span>
                            <!-- image -->
                            <div class="input-container">
                                <font-awesome-icon :icon="['far', 'image']" class=" icon" />
                                <input type="file" class="form-control" name="image">
                            </div>
                        </div>
                    </form>
                    <br>
                    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-add" @click="add()">Add New</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Import
import router from "@/router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from '@vuelidate/validators';
import axios from 'axios';
import { ref, computed } from "vue";

//Data
let errorMessage = ref('');
let successMessege = ref('');
let userId = ref('');

// Validations
let state = ref({
    name: "",
    num: "",
    addr: "",
})

let rules = computed(() => {
    return {
        name: { required, minLength: minLength(7) },
        num: { required, minLength: minLength(10) },
        addr: { required, minLength: minLength(5) }
    }
});

let v$ = useVuelidate(rules, state);
//Methods
const add = async () => {
    // Check if all inputs values are valid
    v$.value.$validate();  
    if (!v$.value.$error) {
        let url = `http://localhost:3000/locations`;
        let params = {
            name: state.value.name,
            num: state.value.num,
            addr: state.value.addr,
            userId: userId.value
        }

        await axios.post(url, params)
            .then(() => {
                setTimeout(() => {
                    state.value.name = '',
                        state.value.num = '',
                        state.value.addr = '',
                        userId.value = userId,
                        router.push({ path: "/my-rests" })
                }, 2000);
                errorMessage.value = "";
                successMessege.value = "Your data has been regestred successfully"; // res.data.msg => with php requst
                // console.table("OK", response.data);
            })
            .catch(err => {
                errorMessage.value = "Something went wrong";
                successMessege.value = "";
                console.log(err);
                console.log("Bad response", err.response.data);
            });

    } else {
        successMessege.value = "";
        errorMessage.value = "You Must fill in all the required fields";
    }
}
// Mounted
let user = localStorage.getItem("user-info");
!user ? router.push({ path: "/my-rests" }) : userId.value = JSON.parse(user).id;

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
    background: var(--main-color);
    color: white;
    min-width: 50px;
    text-align: center;
}

/* Validation Stailing */
.validate-style {
    color: red;
    margin-bottom: -30px;
}

.btn-plus{
    width: 50px;
    height: 50px;
    background-color: var(--main-color);
    border-radius: 50%;
    position: fixed;
    bottom: 50px;
    right: 70px;
    color: #fff;
    z-index: 2;
}
.btn-plus:hover{
    background-color: var(--main-color-opc);
}
.btn-add{
    background-color: var(--main-color);
    color: #fff;
}
.btn-add:hover{
    background-color: var(--main-color-opc);
}
</style>


