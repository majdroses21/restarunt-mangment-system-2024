<template>
       <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <br />
                    <span class="trash">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </span>
                    <h1>Delete {{ deleteLocation.name }} Restarunt!</h1>
                    <p>You'll permanently lose your:</p>
                    <ul>
                        <li>-Catygories</li>
                        <li>-items</li>
                    </ul>
                    <h6>Type "Delete Restarunt" to confirm</h6>
                    <input class="form-control" type="text" name="" id=""> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" @click="deletRest()">Cofirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.trash {
    position: absolute;
    top: -25px;
    margin-left: -30px;
    background-color: #dc3545;
    color: #fff;
    font-size: 37px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
}

.btn-action {
    border-radius: 50%;
    margin-right: 2px;
    margin-left: 2px;
}

.modal-body {
    border-top: solid 7px #dc3545;
}

.modal-footer {
    background-color: rgb(232, 231, 231);
}

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
import axios from "axios";
import { ref, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
let store = useStore();

const props = defineProps({
    deleteLocation: {
        type: Object,
        required: true
    },
});

// Emits
const emits = defineEmits(['reloadData']);

//Data
let st = store.state;
let successMessage = ref('');
let errorMessage = ref('');
let allItemsIdIs = ref([]);


const deletRest = async () => {
    const restId = props.deleteLocation.id;
    store.commit('getAllcatygoriesIds', { locidIs: restId });
    //Expacted Delet All This Whine Deal with Real API
    let url_1 = `http://localhost:3000/items?locId=${restId}`;
    await axios.get(url_1)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                allItemsIdIs.value.push(response.data[i].id);
            }
        })
        .catch(error => {
            console.log(error, "M Err :-(");
        });
    let url_2 = `http://localhost:3000/locations/${restId}`;
    await axios.delete(url_2)
        .then(async (res) => {
            let allCatsResults = [];

            for (let cats = 0; cats < allItemsIdIs.value.length; cats++) {
                let catUrl = `http://localhost:3000/categorys/${st.allCatysIdIs[cats]}`;
                await axios.delete(catUrl)
                    .then(() => {
                        allCatsResults.push(true);
                    })
                    .catch(error => {
                        allCatsResults.push(false);
                        console.log(error, "M Err :-(");
                    });
            }

            let allItemsResults = [];

            for (let itms = 0; itms < allItemsIdIs.value.length; itms++) {
                let itemUrl = `http://localhost:3000/items/${allItemsIdIs.value[itms]}`;
                await axios.delete(itemUrl)
                    .then(() => {
                        allItemsResults.push(true);
                    })
                    .catch(error => {
                        allItemsResults.push(false);
                        console.log(error, "M Err :-(");
                    });
            }

            if (res.status == 200 && !allCatsResults.includes(true) && !allItemsResults.includes(false)) {
                successMessage.value = "Deleted successfully";
                console.log(res);
                emits('reloadData')
            } else {
                console.log("your Status is: ", res.status);
                console.table(res.data);
                successMessage.value = "";
                errorMessage.value = "Something went wrong, please try again later";
                console.log("something went wrong !!!");
            }

        })
        .catch(error => {
            console.log(error, "M Err :-(");
        });
}
</script>