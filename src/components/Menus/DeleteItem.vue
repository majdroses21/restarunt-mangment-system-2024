<template>
    <h4 class=" text-danger fw-bold fw-bolder">Are You Shore You Want To Delete <b>{{ itemName }}</b>?!!</h4>
    <br>

    <div>
        <button type="button" class="btn btn-info" @click="goBack()">
            <font-awesome-icon :icon="['fas', 'arrow-left']" /> &nbsp;
            Go Backe
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-danger" @click="deleteItem()">&nbsp; Delete &nbsp;
            <font-awesome-icon :icon="['fas', 'trash']" /> &nbsp;</button>
    </div>


    <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
    <div class=" alert alert-success" v-if="successMessege.length > 0"> {{ successMessege }} </div>
</template>


<script setup>
//Import 
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';

let router = useRouter();
let route = useRoute();

//Data
let itemName = ref('');
let userId = ref('');
let locationId = ref('');
let itemId = route.params.itemId;
let itemData = ref([]);
let successMessege = ref('');
let errorMessage = ref('');

//Mounted
onMounted(async () => {
    let user = localStorage.getItem("user-info");
    if (!user) {
        router.push({ path: "/login" });
    } else {
        userId.value = JSON.parse(user).id;
        locationId.value = route.params.locationId;
        console.log(itemId);
        await curnetItemInfo();
    }
});

//Methods
const goBack = () => {
    router.push({ path: `/menu/${locationId.value}` }); // Remamber
};

const curnetItemInfo = async () => {
    let url = `http://localhost:3000/items?id=${itemId}&userId=${userId.value}`;
    await axios.get(url)
        .then(result => {
            itemData.value = result.data;
            itemName.value = itemData.value[0].name;
            console.log(result.data, "Good result :-)");
        })
        .catch(error => {
            console.table(error.result + "Bad result :-(");
            router.push({ path: `/menu/${locationId.value}` });
        });
};

const deleteItem = async () => {
    console.log("تمااام !");
    let url = `http://localhost:3000/items/${itemId}`;
    await axios.delete(url)
        .then(() => {
            console.log("Item is Deleted successfully");
            successMessege.value = "Item is Deleted successfully";
            setTimeout(() => {
                router.push({ path: `/menu/${locationId.value}` });
            }, 2000);
        })
        .catch(err => {
            successMessege.value = "";
            errorMessage.value = "Something went wrong , please try again later";
            console.log("something went wrong !!!", err);
        });
};



</script>
