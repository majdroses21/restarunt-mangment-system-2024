
<template>
    <div>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li v-for="(tab, index) in store.state.listOfCategorys" :key="index" class="nav-item" role="presentation">
                <button :class="{ 'nav-link': true, 'active': index === activeTabIndex }"
                    :id="'pills-' + tab.name.toLowerCase() + '-tab'" data-bs-toggle="pill"
                    :data-bs-target="'#pills-' + tab.name.toLowerCase()" type="button" role="tab"
                    :aria-controls="'pills-' + tab.name.toLowerCase()" :aria-selected="index === activeTabIndex"
                    @click="setActiveTab(index)">
                    {{ tab.name }}
                </button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div v-for="(tab, index) in store.state.listOfItems" :key="index"
                v-show="store.state.listOfCategorys[activeTabIndex].id == tab.ctageoryID"
                :class="{ 'nav-link': true, 'active': index === activeTabIndex }">

                {{ tab }}
            </div>
        </div>
    </div>
</template>
  



<script setup>
// Import 
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
let store = useStore();
let route = useRoute();


//Data
let activeTabIndex = 0;
let locationId = ref('');
//-
let getData = computed(() => {
    console.log(store.state.listOfCategorys);
    return store.state.listOfCategorys
})
console.log(getData.effect.computed);

console.log(store.state.listOfCategorys);
//-
// Mounted
onMounted(async () => {
    console.log("stor is", store);
    store.commit('isLoggedInUser');

    locationId.value = route.params.locationId;

    console.log(route.params);
    let usID = JSON.parse(localStorage.getItem("user-info")).id;
    store.commit('displayAllCategorys', { userId: usID, locId: locationId.value });

    store.commit('canUserAccessThisLocation', { locationIdIs: locationId.value });

    store.commit('getLocationInfo', { locidIs: locationId.value });

    store.commit('displayAllItems', { locidIs: locationId.value });
})


//Methods
const setActiveTab = (index) => {
    activeTabIndex = index;
}

</script>
  
  
<style>
/* يمكنك إضافة أنماط تصميم Bootstrap هنا إذا لزم الأمر */
</style>
  