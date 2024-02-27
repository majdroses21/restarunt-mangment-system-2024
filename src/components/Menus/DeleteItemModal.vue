<template>
    <!-- Modal -->
    <div class="modal fade" id="deleteItemModal" tabindex="-1" aria-labelledby="deleteItemModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-delete">
                    <br />
                    <span class="trash">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </span>
                    <h3>Are you shour you whant to <span class="text-danger">Delete</span> <b class="text-danger">{{ $props.deleteItem.name}}</b> Meal!</h3>
                   

                </div>
                <div class=" alert alert-success" v-if="successMessage.length > 0"> {{ successMessage }} </div>
                <div class=" alert alert-danger" v-if="errorMessage.length > 0"> {{ errorMessage }} </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="closemodel">Close</button>
                    <button type="button" class="btn btn-danger" id="btnDeleteXX" @click="deleteItemMeal()">
                        Cofirm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Import 
import { ref , defineProps } from "vue";
import axios from 'axios';
import { useStore } from 'vuex';
let store = useStore();


let props = defineProps({
    deleteItem:{
        required: true,
        type: Object
    }
})

//Data
let successMessage = ref('');
let errorMessage = ref('');




//Methods
const deleteItemMeal = async () => {
    let url = `http://localhost:3000/items/${props.deleteItem.id}`;
    await axios.delete(url)
        .then(() => {
            console.log("Item is Deleted successfully");
            successMessage.value = "Item is Deleted successfully";
            setTimeout(() => {
                successMessage.value = "";
                store.commit('displayAllItems', { locidIs: props.deleteItem.locId });
                document.getElementById("closemodel").click();
            }, 1000);
        })
        .catch(() => {
            successMessage.value = "";
            errorMessage.value = "Something went wrong , please try again later";
        });
};



</script>


<style scoped>
.form-control {
    width: 50%;
    margin-left: 25%;
}

ul {
    list-style-type: none;
}
</style>

