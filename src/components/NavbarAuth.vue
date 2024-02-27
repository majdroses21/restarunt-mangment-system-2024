<template>
    <nav class="containar">
        <div class="logo-containar">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="d-flex align-items-center mt-2">
            <p class="noMob">already have an account? &nbsp;</p>
            <router-link to="/sinup" class="btn btn-sign mb-3">SinUp</router-link>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color:  rgb(232, 231, 231);
    z-index: 9999 !important;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.logo-containar {
    transform: translateY(-25px);
    width: 5rem;
    height: 5rem;
}

.btn-sign {
    background-color: #ffa600;
    border-radius: 20px;
}

.btn-sign:hover {
    background-color: #ffa600 !important;
}

@media (max-width: 490px) {
    .noMob{
        display: none;
    }
    .logo-containar {
    transform: translateY(10px);
    }
}
</style>