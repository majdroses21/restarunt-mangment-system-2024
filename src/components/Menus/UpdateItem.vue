<template>
    <div class="text-center ">
        <h1>
            {{ st.locName }}
        </h1>
        <p class="text-muted"> {{ st.locAdrr }} </p>
        <RouterLink :to="{ name: 'ViewMenu', params: { locId: locationId } }" class="btn btn-success float-end">
            Back To menu &nbsp; <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </RouterLink>
    </div>
    <br>
    <div class="container dadOfForm">
        <h1> Update Item &nbsp; <font-awesome-icon :icon="['fas', 'refresh']" /> </h1>
        <form @click.prevent>
            <!-- name -->
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'bowl-food']" class=" icon" />
                <div class=" form-floating mb-3 ">
                    <input type="text" id="flotNameInp" placeholder="Enter Item Name" name="name" v-model="state.name"
                        class=" form-control">
                    <label for="flotNameInp">Enter Item Name</label>
                </div>
            </div>
            <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
            <!-- Price -->
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'dollar']" class=" icon" />
                <div class=" form-floating mb-3">
                    <input type="number" id="flotPriceInp" placeholder="Enter Item Price" name="price" v-model="state.price"
                        class=" form-control">
                    <label for="flotPriceInp">Enter Item Price</label>
                </div>
            </div>
            <span class="validate-style" v-if="v$.price.$error"> {{ v$.price.$errors[0].$message }}</span>

            <!-- Quantities -->
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'store']" class=" icon" />
                <div class=" form-floating mb-3">
                    <input type="number" id="flotNumInp" placeholder="Enter Item Quantitie" name="num" v-model="state.num"
                        class=" form-control">
                    <label for="flotNumInp">Enter Item Quantitie</label>
                </div>
            </div>
            <span class="validate-style" v-if="v$.num.$error"> {{ v$.num.$errors[0].$message }}</span>

            <!-- Description  -->
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'note-sticky']" class=" icon" />
                <div class=" form-floating mb-3">
                    <textarea type="text" id="flotDescInp" placeholder="Enter Item Description" name="desc"
                        v-model="state.desc" class=" form-control " style="height: 100px;"> </textarea>
                    <label for="flotDescInp">Enter Item Description</label>
                </div>
            </div>
            <span class="validate-style" v-if="v$.desc.$error"> {{ v$.desc.$errors[0].$message }}</span>

            <!-- Select -->
            <div class="input-container">
                <font-awesome-icon :icon="['fas', 'bars']" class=" icon" />
                <div class=" form-floating mb-3">
                    <select id="flotSlect" class=" form-select" v-model="state.pickedCaty" name="pickedCaty">
                        <option>Open This Select Menue</option>
                        <option v-for="(cat, i) in st.listOfCategorys" :key="i" :value="cat.id"> {{ cat.name }} </option>
                    </select>
                    <label for="flotSlect">Select Categori Name </label>
                </div>
            </div>
            <span class="validate-style" v-if="v$.pickedCaty.$error"> {{ v$.pickedCaty.$errors[0].$message }}</span>

            <br>
            <button type="button" class="btnX " @click="updateItem()">Update &nbsp; <font-awesome-icon
                    :icon="['fas', 'refresh']" /></button>
        </form>
        <div>
            <br>
            <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
            <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
        </div>
    </div>
</template>

<script setup>
//Import
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, between } from '@vuelidate/validators';
import { useStore } from "vuex";
let route = useRoute();
let router = useRouter();
let store = useStore();

// Data
store.commit('isLoggedInUser');
let st = store.state;
let locationId = ref('');
let itemInfo = ref([]);
let listOfLocations = ref([]);
let userId = ref(st.loggedInUserId);
let itemId = route.params.itemId;
let successMessege = ref('');
let errorMessage = ref('');
//valdations
let state = ref({
    name: '',
    num: '',
    price: "",
    desc: "",
    pickedCaty: 1,
})

let Relses = computed(() => {
    return {
        name: { required, minLength: minLength(10), maxLength: maxLength(120) },
        num: { required, minLength: minLength(1) },
        price: { required, minLength: minLength(1) },
        desc: { required, minLength: minLength(10) },
        pickedCaty: { required, between: between(1, 100000) },
    }
});
const v$ = useVuelidate(state, Relses);
//Mounted
onMounted(async () => {
    locationId.value = parseInt(route.params.locationId);

    store.commit('canUserAccessThisItem', { itemiIdIS: itemId, locidIs: locationId.value })

    store.commit('getLocationInfo', { locidIs: locationId.value })

    let url = `http://localhost:3000/categorys?userId=${userId.value}`
    await axios.get(url)
        .then(result => {
            listOfLocations.value = result.data;

            store.commit('displayAllCategorys', { userId: userId.value, locId: locationId.value })




            displayItem();
        })
        .catch(err => {
            console.log(err.result.data);
            console.log("Bad Request", err);
        });

});
//Methods
const updateItem = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        let url = `http://localhost:3000/items/${itemId}`;
        let params = {
            name: state.value.name,
            price: state.value.price,
            description: state.value.desc,
            qey: state.value.num,
            userId: userId.value,
            catygoriID: state.value.pickedCaty,
            locId: locationId.value

        };
        await axios.put(url, params)
            .then(result => {
                console.log("request successful send", result.data);
                errorMessage.value = "";
                successMessege.value = "Item successfully Updated";
                setTimeout(() => {
                    router.push({ path: `/menu/${locationId.value}` })
                }, 2500);
            })
            .catch(err => {
                console.log("request failed send :-(", err);
                successMessege.value = "";
                errorMessage.value = "something wrong happened"
            });
    } else {
        successMessege.value = "";
        errorMessage.value = "Something went wrong";
        console.log("Not Validated");
    }
};

const displayItem = async () => {
    let urlItms = `http://localhost:3000/items/${itemId}`
    await axios.get(urlItms)
        .then(resultItems => {
            console.table(resultItems.data);
            itemInfo.value = resultItems.data;
            state.value.name = itemInfo.value.name;
            state.value.price = itemInfo.value.price;
            state.value.num = itemInfo.value.qey;
            state.value.desc = itemInfo.value.description;
            state.value.pickedCaty = itemInfo.value.catygoriID;
        })
        .catch(err => {
            console.log(err.resultItems.data);
            console.log("Bad Request", err);
        });
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
    /* width: 400px!important; */
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

/* Set a style for the submit button */
.btnX {
    background-color: rgb(182, 112, 247);
    ;
    color: white;
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}

.btnX:hover {
    opacity: 1;
}



.validate-style {
    color: red;
    margin-bottom: -30px;
}

.form-floating {
    width: 100%;
}

.dadOfForm {
    width: 70%;
}

@media (max-width: 480px) {
    .dadOfForm {
        width: 95%;
    }
}
</style>




