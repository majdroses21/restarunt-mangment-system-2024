<template>
    <NavBar v-if="store.state.isAuthenticated" />
    <slide-bar v-if="store.state.isAuthenticated"></slide-bar>
    <!-- <h1 class="text-warning">{{this.$store.state.isAuthenticated }}</h1> -->
    <!-- navbar if user logged -->
    <!-- // layout -->
    <div>
        <slot name="body"></slot>
    </div>
</template>


<script setup>
// import { defineComponent } from 'vue';
import { onMounted } from "vue";
import { useStore } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import SlideBar from "@/components/SlideBar.vue";


let store = useStore();
onMounted(() => {
    store.commit('Authentication');
})
</script>