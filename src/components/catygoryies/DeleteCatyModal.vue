<template>
    <!-- Modal -->
    <div class="modal fade" id="deleteCatyModal" tabindex="-1" aria-labelledby="deleteCatyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-delete">
                    <br />
                    <span class="trash">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </span>
                    <h2>Delete <b class="text-danger">{{$props.deleteCaty.name }} </b> category!</h2>
                    <p class="text-dark">You'll permanently lose your:</p>
                    <ul>
                        <li>-items</li>
                    </ul>
                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="btnClose">Close</button>
                    <button type="button" class="btn btn-danger" @click="deleteCaty()">Cofirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-control {
    width: 50%;
    margin-left: 25%;
}

ul {
    list-style-type: none;
}
</style>

<script setup>
//Import
import { ref ,onMounted, defineProps ,toRef } from "vue";
import axios from 'axios';
import { useStore } from "vuex";
let store = useStore();
//props
const props = defineProps({
    deleteCaty: {
        type: Object,
        required: true
    },
});
//Data
store.commit('getUserId');
let successMessage = ref('');
let errorMessage = ref('');


//Mounted
onMounted(async () => {
       
       
});
//Methods

const deleteCaty = async () => {
    let catygoriID = toRef(props.deleteCaty.id);
    store.dispatch('getAllItemsIds', {catidIs: catygoriID.value})
    console.log("all items are: ", store.state.allItemsIdIs);
    let url = `http://localhost:3000/categorys/${catygoriID.value}`;
    await axios.delete(url)
        .then(() => {
            console.log("Deleted Caty successfully");
        })
        .catch(err => {
            console.log("failed to Deleted Caty", err);
        });
    let allResults = [];

    for (let i = 0; i < store.state.allItemsIdIs.length; i++) {
        let url = `http://localhost:3000/items/${store.state.allItemsIdIs[i]}`;

        await axios.delete(url)
            .then(() => {
                allResults.push(true);
            })
            .catch(() => {
                allResults.push(false);
            });
    }
    console.table(allResults);

    if (!allResults.includes(false)) {
        successMessage.value = "Category and related Items are Deleted successfully";
        errorMessage.value = "";
        setTimeout(() => {
          successMessage.value = "";
          document.getElementById('btnClose').click();
          store.dispatch('doDisplayAllCategorys', { userId: props.deleteCaty.userId, locId: props.deleteCaty.locationId });
        }, 1000)
    } else {
        successMessage.value = "";
        errorMessage.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }
}


</script>