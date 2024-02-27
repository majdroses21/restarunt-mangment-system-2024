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

<!--  
<script setup>
//Import
import axios from "axios";
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
let store = useStore();

const props = defineProps({
    deleteCaty: {
        type: Object,
        required: true
    },
});

//Data
let st = store.state;
let successMessage = ref('');
let errorMessage = ref('');
let allItemsIdIs = ref([]);


const deletCaty = async () => {

    const restId = props.deleteCaty.id;
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
                let catUrl = `http://localhost:3000/categorys/${store.state.allCatysIdIs[cats]}`;
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
                successMessage.value = "Deleted successfully";
                setTimeout(() => {
                    document.getElementById('btnClose').click();
                    successMessage.value = "";
                    //  emits('reloadData'); // useStore here
                }, 1000);
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
-->



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
store.commit('isLoggedInUser');
let successMessage = ref('');
let errorMessage = ref('');


//Mounted
onMounted(async () => {
       
       
});
//Methods

const deleteCaty = async () => {
    let catygoriID = toRef(props.deleteCaty.id);
    store.commit('getAllItemsIds', {catidIs: catygoriID.value})
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
          store.commit('displayAllCategorys', { userId: props.deleteCaty.userId, locId: props.deleteCaty.locationId });
        }, 1000)
    } else {
        successMessage.value = "";
        errorMessage.value = "Something went wrong , please try again later";
        console.log("something went wrong !!!");
    }
}


</script>