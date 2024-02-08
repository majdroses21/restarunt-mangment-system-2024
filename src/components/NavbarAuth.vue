<template>
    <nav class="containar">
       <div class="logo-containar">
        <img src="../assets/images/logo.png" alt="">
       </div>
       <div class="d-flex align-items-center mt-2">
        <p>already have an account? &nbsp;</p>
        <router-link to="/sinup" class="btn btn-sign">SinUp</router-link>
       </div>
    </nav>
</template>

<style scoped>
nav{
    display: flex;
    justify-content: space-between;
   height: 50px;
   z-index: 9999;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.logo-containar{
    transform: translateY(-20px);
    width: 5rem;
    height: 5rem;
}
.btn-sign{
    background-color: #ffa600;
    border-radius: 20px;
}
.btn-sign:hover{
    background-color: #ffa600 !important;
}
</style>

