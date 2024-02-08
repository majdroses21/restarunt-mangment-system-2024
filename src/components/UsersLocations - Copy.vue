<template>
    <br><br>
    <div class="container">
        <div class="row">
            <table class=" table caption-top" v-if="props.allLocations.length > 0">
                <caption>
                    <span>
                        List Of locattions {{ props.allLocations.length }}     
                    </span>
                    <span>
                        <RouterLink class="btn btn-danger" to="/deleteAll">Delete All</RouterLink>
                    </span>
                    </caption>
                <thead class=" table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(loc, i) in props.allLocations" :key="i">
                        <td> {{ loc.name }}</td>
                        <td> {{ loc.num }}</td>
                        <td> {{ loc.addr }}</td>
                        <!-- <td> {{ loc.id }}</td> -->
                        <td>
                            <router-link :to="{name: 'DeletePage', params: {locationId: loc.id}}" class=" btn btn-danger me-1"> Delete</router-link>
                            <!-- <button :to="{name: 'DeletePage', params: {locationId: loc.id}}" class=" btn btn-danger me-1"> Delete</button> -->

                            <RouterLink :to="{name: 'UpdateLocation', params: {locationId: loc.id}}" class=" btn btn-success ms-1">Update</RouterLink>

                            <RouterLink :to="{name: 'ViewMenu' ,params: {locationId: loc.id} }" class=" btn btn-info ms-2"> Menu</RouterLink>
                        </td>

                    </tr>
                </tbody>

            </table>
            <div class=" alert alert-warning" v-else> No Locations Yet !!!</div>
        </div>
    </div>

</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from "vue";

const props = defineProps(["allLocations"]);

</script>