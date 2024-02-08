<template>
    <div class="form-parent">
        <form @click.prevent class=" small-screens-form-as-row">

            <div class="input-container">
                <div class=" icon">
                    <font-awesome-icon :icon="['fas', 'utensils']" /> &nbsp;
                    <label> Restaurant Name</label>
                </div>
                <input type="text" class="form-control" placeholder="Resturant Name" name="name" v-model="state.name">
            </div>
            <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
            <div class="input-container">
                <div class=" icon">
                    <font-awesome-icon :icon="['fas', 'phone']" /> &nbsp;
                    <label> Restaurant Phone Number</label>
                </div>
                <input type="number" class="form-control" placeholder="Phone Number" name="num" v-model="state.num">
            </div>
            <span class="validate-style" v-if="v$.num.$error"> {{ v$.num.$errors[0].$message }}</span>
            <div class="input-container">
                <div class=" icon">
                    <font-awesome-icon :icon="['fas', 'map-location-dot']" /> &nbsp;
                    <label> Restaurant Address</label>
                </div>
                <textarea class="form-control" placeholder="Address" name="addr" v-model="state.addr"> </textarea>
            </div>
            <span class="validate-style" v-if="v$.addr.$error"> {{ v$.addr.$errors[0].$message }}</span>

        </form>
    </div>


    <div>
        <button type="button" class="btn btn-info" @click="goBack()">Go Backe</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" @click="updateRest()">&nbsp; Update &nbsp; <font-awesome-icon
                :icon="['fas', 'refresh']" /> &nbsp;</button>
    </div>


    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
</template>

<script setup>
// Imports
import { ref, computed, onMounted } from "vue";
import axios from 'axios';
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
//
import { useStore } from "vuex";
let store = useStore();
//Data
store.commit('isLoggedInUser');
let st = store.state;
let userId = ref(st.loggedInUserId);
let router = useRouter();
let route = useRoute();

//Data
let locationId = ref('');
let successMessege = ref('');
let errorMessage = ref('');

// Validations
let state = ref({
    name: '',
    num: '',
    addr: ''
});

let Rulses = computed(() => {
    return {
        name: { required, minLength: minLength(7) },
        num: { required, minLength: minLength(8) },
        addr: { required, minLength: minLength(7) }
    }
})


const v$ = useVuelidate(state, Rulses);
//Monted
onMounted(async () => {
    locationId.value = route.params.locationId; 

    store.commit('canUserAccessThisLocation', { locationIdIs: locationId.value });

    store.commit('getLocationInfo', {locidIs: locationId.value});
   
    test();
});
//Methods
const goBack = () => {
    router.push({ path: "/my-rests" });
};

const updateRest = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        console.log("تمااام !");
        let url = `http://localhost:3000/locations/${locationId.value}`;
        let params = {
            name: state.value.name,
            num: state.value.num,
            addr: state.value.addr,
            userId: userId.value
        };
        await axios.put(url, params)
            .then(() => {
                console.log("Location is updated successfully");
                successMessege.value = "Location is updated successfully";
                setTimeout(() => {
                    router.push({ path: "/my-rests" });
                }, 2000);
            })
            .catch(error => {
                console.log(error, "err");
                successMessege.value = "";
                errorMessage.value = "Something went wrong , please try again later";
                console.log("something went wrong !!!");
            });


    } else {
        successMessege.value = "";
        errorMessage.value = "You Must fill in all the required fields";
        console.log("Not Valideted ");
    }
};
const test = () => {
        
    console.log(st);
    console.log(st.locName);
    console.log(st.locNum);
    console.log(st.locAdrr);
    state.value.name = "XX";
    state.value.num= 777;
    state.value.addr= "XX";
    }

</script>

<style scoped>
* {
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

/* Style the input container */
.form-parent {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
}

.input-container {
    display: flex;
    width: 500px;
    margin-bottom: 5px;
    margin-top: 5px;
}

/* Style the form icons */
.icon {
    padding: 10px;
    background: rgb(87, 172, 78);
    ;
    color: white;
    width: 100%;
    text-align: center;
}

/* Validation Stailing */
.validate-style {
    color: red;
    margin-bottom: -30px;
}

@media (max-width: 480px) {
    .form-parent {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        width: 100%;
        padding-right: calc(var(--bs-gutter-x) * .5);
        padding-left: calc(var(--bs-gutter-x) * .5);
        margin-right: auto;
        margin-left: auto;
    }

    .small-screens-form-as-row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(-1 * var(--bs-gutter-y));
        margin-right: calc(-.5 * var(--bs-gutter-x));
        margin-left: calc(-.5 * var(--bs-gutter-x));
    }
}
</style>