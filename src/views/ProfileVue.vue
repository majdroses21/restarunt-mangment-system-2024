<template>
    <div class="container">
        <div class="wellcome">
            <div class="float-start">
                <h3 class="name">
                    Hi, {{ name }} welcome back!
                </h3>
                <p class="foat-start text-secondary">Your business dashboard template</p>
            </div>
        </div>

        <div class="contant shadow">
            <div class="img-container">
                <img src="../assets/images/cover-photo.jpg" class="shadow" alt="cover-Photo">
            </div>
            <div class="avatr-img-container">
                <img src="../assets/images/avatar.webp" alt="profil-photo">
            </div>
            <div class="user-info">
                <h1 style="margin-top: -25px;">{{ name }}</h1>
                <p class="text-secondary">info @{{ email }}</p>
                <button type="button" class="btn btn-warning text-light" @click="update()"> Update Your Information</button>
            </div>
        </div>
        <!-- prograsess -->
        <div class="card shadow mb-5 mt-3">
            <div class="card-header py-3">
                <h6 class="fw-bold m-0 float-start text-secondary">Statusies</h6>
            </div>
            <!-- All -->
            <div class="card-body">
                <!-- Red -->
                <h4 class="small fw-bold text-secondary">
                    <span class="float-start">Server migration</span>
                    <span class="float-end">20%</span>
                </h4>
                <br>
                <div class="progress progress-sm mb-3">
                    <div class="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                        style="width: 20%;">
                        <span class="visually-hidden">20%</span>
                    </div>
                </div>
                <!-- Warning -->
                <h4 class="small fw-bold text-secondary">
                    <span class="float-start">Sales tracking</span>
                    <span class="float-end">40%</span>
                </h4>
                <br>
                <div class="progress progress-sm mb-3">
                    <div class="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
                        style="width: 40%;">
                        <span class="visually-hidden">40%</span>
                    </div>
                </div>
                <!-- primry -->
                <h4 class="small fw-bold text-secondary">
                    <span class="float-start"> Customer Database</span>
                    <span class="float-end">60%</span>
                </h4>
                <br>
                <div class="progress progress-sm mb-3">
                    <div class="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                        style="width: 60%;">
                        <span class="visually-hidden">60%</span>
                    </div>
                </div>
                <!-- Cany -->
                <h4 class="small fw-bold text-secondary">
                    <span class="float-start">Payout Details</span>
                    <span class="float-end">80%</span>
                </h4>
                <br>
                <div class="progress progress-sm mb-3">
                    <div class="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                        style="width: 80%;">
                        <span class="visually-hidden">80%</span>
                    </div>
                </div>
                <!-- Comp Green -->
                <h4 class="small fw-bold text-secondary">
                    <span class="float-start">Account setup</span>
                    <span class="float-end">Complete!</span>
                </h4>
                <br>
                <div class="progress progress-sm mb-3">
                    <div class="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                        style="width: 100%;">
                        <span class="visually-hidden">100%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.wellcome {
    background-color: #fff;
    border-radius: 10px;
    height: 80px;
    margin-top: 15px;
    padding: 10px;
}

.contant {
    margin-top: 30px;
    padding: 13px 20px 30px 20px;
    background-color: #fff;
    position: relative;

}

.name {
    color: var(--main-color);
}

.img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    width: 95%;
}

.img-container {
    margin-right: auto;
    margin-left: auto;
}

.avatr-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatr-img-container {
    position: relative;
    max-width: 6.25rem;
    margin-top: -3.5rem;
    margin-left: 2.5rem !important;
    z-index: 1;
}

@media (max-width: 490px) {
    .wellcome {
        height: 55px;
    }

    .wellcome h3 {
        font-size: 15px;
    }

    .wellcome p {
        font-size: 10px;
    }

    .contant {
        margin-top: 10px;
    }

    .img-container {
        /* border: 1px solid red; */
        padding-top: 40px;
        width: 100%;
    }

    .avatr-img-container {
        margin-right: auto !important;
        margin-left: auto !important;
        width: 4.7rem;
    }
}
</style>

<script setup>
//Import 
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
//Data
let name = ref('');
let email = ref('');
let psw = ref('');
let userId = ref('');
//Mounted
let user = localStorage.getItem("user-info");
if (user) {
    name.value = JSON.parse(user).name;
    email.value = JSON.parse(user).email;
    psw.value = JSON.parse(user).psw;
    userId.value = JSON.parse(user).id;
} else {
    router.push({ path: "/login" });
}

//Methods
const update = () => {
    router.push({ path: "/UpdateProfile" });
};

</script>
