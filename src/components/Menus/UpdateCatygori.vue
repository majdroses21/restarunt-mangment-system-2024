<template>
    <div class="container">
        Hello!
        <RouterLink :to="{ name: 'ViewCaty', params: { catygoriID: catygoriID } }" class="btn btn-primary float-start">
            <font-awesome-icon :icon="['fas', 'arrow-left']" /> &nbsp; Back To category
        </RouterLink>

        <RouterLink :to="{ name: 'ViewMenu', params: { catygoriID: catygoriID } }" class="btn btn-success float-end">
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
            <h3>Update Category</h3>
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'utensils']" class=" icon" />
                <input type="text" class="form-control" placeholder="Update your Category Name" name="name"
                    v-model="state.name">
            </div>
            <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
        </div>
        <br />
    </form>

    <div>
        <button type="button" class="btn btn-info" @click="goBack()">Go Backe</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" @click="updateCatygori()">&nbsp; Update &nbsp; <font-awesome-icon
                :icon="['fas', 'refresh']" /> &nbsp;</button>
    </div>

    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
    <h1 id="xdx">{{ st.catyName }}</h1> <!-- todo: remove this -->
</template>

<script setup>
//Import
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { useStore } from "vuex";
let store = useStore();
let route = useRoute();
let router = useRouter();
let x = ref(document.getElementById("xdx"));
console.log(x.value);
//Data
store.commit('isLoggedInUser');
let st = store.state;
let userId = ref(st.loggedInUserId);
let catygoriID = ref('');
let locationId = ref('');
let successMessege = ref('');
let errorMessage = ref('');
//validations
let state = ref({
    name: '',
});

let Rulses = computed(() => {
    return {
        name: { required, minLength: minLength(3), maxLength: maxLength(15) },
    }
});

const v$ = useVuelidate(state, Rulses);
//Mounted
onMounted( async () => {    
    console.log(store.state.catyName);
    console.log(store.state);
    locationId.value = route.params.locationId;
    catygoriID.value = route.params.catygoriID;
    
    store.commit('displayAllCategorys', {
        userId: userId.value,
        locId: locationId.value
    });
    
    store.commit('canUserAccessThisCategory', {
        catygoriIdIS: catygoriID.value,
        locidIs: locationId.value
    });
    
    await store.commit('getCatygoryInfo', {catygoriIdIS: catygoriID.value});
    console.log(store.state.catyName);
    state.value.name = store.state.catyName; // todo: know where want to but it?
});

//Methods
const goBack = () => {
    router.push({ path: `/menu/catys/view/${locationId.value}` });
    console.log(locationId.value);
};
const updateCatygori = async () => {
    v$.value.$validate();
    
    let filterCatyName = st.listOfCategorys.filter((v) => v.name.toLocaleLowerCase() == state.value.name.toLocaleLowerCase());
    if (filterCatyName.length > 0) {
        errorMessage.value = "Catygory Name Already Exists, Try Another Name";
        successMessege.value = "";
        console.log("Catygory Name Already Exists, Try Another Name");
    } else {
        if (!v$.value.$errors) {
            errorMessage.value = "";
            successMessege.value = "You Can Add This Category";
            let url = `http://localhost:3000/categorys/${catygoriID.value}`;
            let params = {
                name: state.value.name,
                userId: userId.value,
                locationId: locationId.value
            };
            await axios.put(url, params)
                .then(() => {
                    console.log("Catygori is updated successfully");
                    successMessege.value = "Catygori is updated successfully";
                    setTimeout(() => {
                        router.push({ path: `/menu/catys/view/${locationId.value}` });
                    }, 2000);
                })
                .catch(err => {
                    successMessege.value = "";
                    errorMessage.value = "Something went wrong , please try again later";
                    console.log("something went wrong !!!", err);
                })
        } else {
            successMessege.value = "";
            errorMessage.value = "You Must fill in all the required fields";
            console.log("Not Valideted ");
        }
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
