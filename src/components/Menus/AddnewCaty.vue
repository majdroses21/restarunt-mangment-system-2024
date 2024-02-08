<template>
    <div class="container">
        Hello!
        <RouterLink :to="{ name: 'ViewCaty', params: { locationId: locationId } }" class="btn btn-primary float-start">
            <font-awesome-icon :icon="['fas', 'arrow-left']" /> &nbsp; Back To category
        </RouterLink>

        <RouterLink :to="{ name: 'ViewMenu', params: { locationId: locationId } }" class="btn btn-success float-end">
            Back To menu &nbsp; <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </RouterLink>

    </div>

    <div class="text-center ">
        <h1>
            {{ st.locName }}
        </h1>
        <p class="text-muted"> {{ st.locAdrr }} </p>
    </div>


    <form @click.prevent class="container">
        <div class="container">
            <h3>Add New Category</h3>
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                <input type="text" class="form-control" placeholder="Add New Category" name="name" v-model="state.name">
            </div>
            <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
        </div>
        <br />
        <button class="btn btn-primary" @click="addCaty()">Add</button>
    </form>

    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
</template>

<script setup>
//Import 
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { useStore } from "vuex";
let store = useStore();
let router = useRouter();
let route = useRoute();
//Daat
store.commit('isLoggedInUser');
let st = store.state;
let userId = ref(st.loggedInUserId);
let locationId = route.params.locationId;
let successMessege = ref('');
let errorMessage = ref('');

//validations
let state = ref({ name: '' });
let rulses = computed(() => {
    return { name: { required, minLength: minLength(3), maxLength: maxLength(15) } }
});
const v$ = useVuelidate(state, rulses);
//Mounted
onMounted(() => {
        store.commit('getLocationInfo' , {locidIs: locationId})
        store.commit('displayAllCategorys' , {userId: userId.value , locId: locationId})

});
//Methods

const addCaty = async () => {
    v$.value.$validate();
    let filterCatyName = st.listOfCategorys.filter((v) => v.name.toLocaleLowerCase() == state.value.name.toLocaleLowerCase());
    if (filterCatyName.length > 0) {
        errorMessage.value = "Catygory Name Already Exists, Try Another Name";
        successMessege.value = "";
    } else {
        errorMessage.value = "";
        successMessege.value = "You Can Add This Category";
        if (!v$.value.$error) {
            let url = `http://localhost:3000/categorys`;
            let params = {
                name: state.value.name,
                userId: userId.value,
                locationId: parseInt(locationId),
            };
            await axios.post(url, params)
                .then(result => {
                    console.log("Good result :-) " + result.data);
                    errorMessage.value = "";
                    successMessege.value = "Added New category Successfully";
                    setTimeout(() => {
                        router.push({ name: 'ViewCaty', params: { locationId: locationId } })
                    }, 2500);
                })
                .catch(err => {
                    console.log("Bad request :-( ", err);
                    errorMessage.value = "Bad request: Something went wrong!! try again later"
                });
        } else {
            successMessege.value = "";
            errorMessage.value = "You must fill in Category Name";
            console.log("You must fill in Category Name");
        }
    }
    console.log("Added Clicked Done");

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
    background: #0d6efd;
    ;
    color: white;
    min-width: 50px;
    text-align: center;
}

/* Validation Stailing */
.validate-style {
    color: red;
    margin-bottom: -30px;
}
</style>