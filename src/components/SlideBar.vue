<template>
    <div :class="{ slideBar: true, active: isSlideBareActive }">
        <div class="top">
            <div class="logo">
                <font-awesome-icon :icon="['fas', 'utensils']" class=" iconX"
                    style="background-color: transparent; color: var(--main-color);" />
                <span>&nbsp; RMS</span>
            </div>
            <span @click="toggleSlideBar()" id="btnMenu">
                <font-awesome-icon :icon="['fas', 'list']" class=" bar-icon" />
            </span>
        </div>
        <ul>
            <li>
                <router-link to="/">
                    <font-awesome-icon :icon="['fas', 'house']" class="font-icon" />
                    <span class="nav-item">&nbsp; Home</span>
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard">
                    <font-awesome-icon :icon="['fas', 'fa-tachometer-alt']" class="font-icon" />
                    <span class="nav-item">&nbsp; Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/my-rests">
                    <font-awesome-icon :icon="['fas', 'utensils']" class="font-icon" />
                    <span class="nav-item">&nbsp; My Restarunts</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <font-awesome-icon :icon="['fas', 'user']" class="font-icon" />
                    <span class="nav-item">&nbsp; Profile</span>
                </router-link>
            </li>
            <li>
                <router-link to="/about">
                    <font-awesome-icon :icon="['fas', 'circle-info']" class="font-icon" />
                    <span class="nav-item">&nbsp; About</span>
                </router-link>
            </li>
            <li>
                <router-link to="">
                    <font-awesome-icon :icon="['fas', 'gear']" class="font-icon" />
                    <span class="nav-item">&nbsp; Setting</span>
                </router-link>
            </li>
            <li>
                <a @click="logMeOut()">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="font-icon" />
                    <span class="nav-item">&nbsp; logOut</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- Bootom Nave -->
    <nav class="bootom-nav d-none">
        <ul>
            <li>
                <router-link to="/">
                    <font-awesome-icon :icon="['fas', 'utensils']" class="font-icon" />
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard">
                    <font-awesome-icon :icon="['fas', 'dashboard']" class="font-icon" />
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <font-awesome-icon :icon="['fas', 'user']" class="font-icon" />
                </router-link>
            </li>
            <li>
                <router-link to="/about">
                    <font-awesome-icon :icon="['fas', 'circle-info']" class="font-icon" />
                </router-link>
            </li>
            <li>
                <router-link to="">
                    <font-awesome-icon :icon="['fas', 'gear']" class="font-icon" />
                </router-link>
            </li>
            <li>
                <a @click="logMeOut()">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="font-icon" />
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
//Import

import { ref } from "vue";
const isSlideBareActive = ref(false);

import { useRouter } from "vue-router";

const router = useRouter();

const toggleSlideBar = () => {
    isSlideBareActive.value = !isSlideBareActive.value;
}

const logMeOut = () => {
    localStorage.clear();
    router.push({ path: "/login" })
}


</script>


<style scoped>
.slideBar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 90px;
    background-color: #fff;
    padding: 0.4rem 0.8rem;
    transition: all 0.5s ease;
    z-index: 1;
    /* border: red 1px solid; */
    /* display: none; */
}

.slideBar.active {
    width: 250px;
}

.slideBar.active~.main-content {
    border: red 5px solid;
    left: 250px;
    width: calc(100% - 250px);
}

.slideBar #btnMenu {
    /* border: black 3px solid; */
    position: absolute;
    top: .4rem;
    left: 50%;
    transform: translateX(-10px);
    font-size: 1.5rem;
    line-height: 50px;
    cursor: pointer;
    color: #ffa600;

}

.slideBar.active #btnMenu {
    left: 85%;
    margin-left: 0;
}

.slideBar .top .logo {
    color: #ffa600;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    pointer-events: none;
    opacity: 0;
    /* display: none; */
}

.slideBar.active .top .logo {
    opacity: 1;
    /* display: block; */
}

.top .logo {
    font-size: 2rem;
    margin-right: 5px;
}

/*  */
.slideBar ul li {
    position: relative;
    list-style-type: none;
    height: 50px;
    width: 90%;
    margin: 0.8rem auto;
    line-height: 50px;
}

.slideBar ul li a {
    display: flex;
    color: #ffa600;
    flex-direction: column;
    text-decoration: none;
    border-radius: 20px;
    margin-left: -25px;
    margin-top: 20px;
    padding-top: 5px;
    height: 50px;
    /* align-items: center; */
    /* font-size: 25px; */
    /* margin-bottom: 10px; */
}

.slideBar.active ul li a {
    font-size: large;
    flex-direction: row;
}

.slideBar ul li a:hover {
    background-color: #ffa600;
    color: #fff;
}

.font-icon {
    min-width: 35px;
    height: 37px;
}

.slideBar.active .nav-item {
    opacity: 1;
}

.slideBar .nav-item {
    opacity: 0;
}


@media (max-width: 490px) {
    .slideBar {
        display: none;
    }

    .bootom-nav {
        display: block !important;
        position: fixed;
        width: 100%;
        height: 50px;
        bottom: 0;
        background-color: rgb(232, 231, 231);
        border: #fff solid 1px;
        list-style: none;
        z-index: 1;
    }

    ul {
        /* border: red solid 1px; */
        margin-top: -15px;
        display: flex;
        justify-content: space-between;
        list-style: none;
    }

    ul li {
        position: relative;
        height: 50px;
        margin: -10px;
        margin-right: -12px;
    }

    ul li a {
        color: var(--main-color);
        border-radius: 20px;
        margin-left: -25px;
    }

    ul li svg:hover {
        background-color: var(--main-color);
        height: 50px !important;
        border-radius: 20px !important;
        color: #fff;
    }
}
</style>
