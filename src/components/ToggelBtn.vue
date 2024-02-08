<template>
    <body color-scheme="isDark ? 'dark' : 'light'">
        <div>
            <input type="checkbox" class="checkbox" id="checkbox" @click="toggelDark()">
            <label for="checkbox" class="checkbox-label">
                <font-awesome-icon :icon="['fas', 'fa-moon']" class="fa-moon" />
                <font-awesome-icon :icon="['fas', 'fa-sun']" class="fa-sun"/>
                <span class="ball"></span>
            </label>
        </div>
    </body>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
    selector: "body",
    attribute: "color-scheme",
    valueDark: "dark",
    valueLight: "light"
})

const toggelDark = useToggle(isDark)
</script>

<style >
/* @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap"); */



.checkbox {
    opacity: 0;
    position: absolute;
}

.checkbox-label {
    background-color: #111;
    width: 50px;
    height: 26px;
    border-radius: 50px;
    position: relative;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fa-moon {
    color: #f1c40f;
}

.fa-sun {
    color: #f39c12;
}

.checkbox-label .ball {
    background-color: #fff;
    width: 22px;
    height: 22px;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    transition: transform 0.2s linear;
}

.checkbox:checked+.checkbox-label .ball {
    transform: translateX(24px);
}

[color-scheme = 'dark'] {
    background-color: #000;
    color: #fff;
}
[color-scheme = 'light'] {
    background-color: rgb(232, 231, 231);
}




</style>
