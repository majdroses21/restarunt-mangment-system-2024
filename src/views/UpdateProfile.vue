<template>
    <div class="container-fluid">
        <h3 class="text-dark mt-3 mb-0 float-start">Profile</h3> <br><br><br>
        <div class="row mb-3">
                        <div class="col-lg-4">
                            <!-- profile photo -->
                            <div class="card mb-3">
                                <div class="card-body text-center shadow">
                                    <div class="img-profile-container">
                                        <img class="rounded-circle mb-3 mt-4" src="../assets/images/avatar.webp" >
                                    </div>
                                    <div class="mb-3">
                                        <button class="btn btn-sm btn-change mt-5" type="button">Change Photo</button>
                                    </div>
                                </div>
                            </div>
                            <!-- prograsess -->
                            <div class="card shadow mb-4">
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
                                        <div class="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">
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
                                        <div class="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">
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
                                        <div class="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
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
                                        <div class="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
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
                                        <div class="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                                            <span class="visually-hidden">100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col">
                                    <!-- User Info -->
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-3">
                                            <p class="text-dark float-start m-0 fw-bold">User Settings</p>
                                        </div>
                                        <div class="card-body">
                                            <form @click.prevent>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3">
                                                            <label class="form-label text-secondary float-start" for="username"><strong>Name</strong></label>
                                                            <input class="form-control" type="text" id="username" placeholder="Enter your name" name="username" v-model="state.name" >
                                                        </div>
                                                        <span class="validate-style" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span>
                                                    </div>
                                                   <div class="col">
                                                        <div class="mb-3"><label class="form-label text-secondary float-start" for="last_name"><strong>Last Name</strong></label>
                                                             <input class="form-control" type="text" id="last_name" placeholder="Doe" name="last_name">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3">
                                                            <label class="form-label text-secondary float-start" for="email"><strong>Email Address</strong></label>
                                                            <input class="form-control" type="email" id="email" placeholder="user@example.com" name="email" autocomplete="email" v-model="state.email">
                                                        </div>
                                                        <span class="validate-style" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label text-secondary float-start" for="pass"><strong>Password</strong></label>
                                                            <input class="form-control" type="password" id="pass" placeholder="John" name="pass" autocomplete="current-password" v-model="state.psw">
                                                         </div>
                                                         <span class="validate-style" v-if="v$.psw.$error"> {{ v$.psw.$errors[0].$message }}</span>
                                                    </div>
                                                </div>
                                                <div class="mb-3"><button class="btn btn-change btn-sm float-start" type="submit"  @click="updateNow()">Save changes</button></div>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- More Ditels -->
                                    <div class="card shadow ">
                                        <div class="card-header py-3">
                                            <p class="text-dark float-start m-0 fw-bold">Contact Settings</p>
                                        </div>
                                        <div class="card-body">
                                            <form @click.prevent>
                                                <div class="mb-3">
                                                    <label class="form-label text-secondary float-start" for="address"><strong>Address</strong></label>
                                                    <input class="form-control" type="text" id="address" placeholder="Sunset Blvd, 38" name="address">
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3">
                                                            <label class="form-label text-secondary float-start" for="city"><strong>City</strong></label>
                                                            <input class="form-control" type="text" id="city" placeholder="Los Angeles" name="city">
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label text-secondary float-start" for="country"><strong>Country</strong></label>
                                                            <input class="form-control" type="text" id="country" placeholder="USA" name="country">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3"><button class="btn btn-change btn-sm float-start" type="button">Save changes</button></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card shadow mb-5">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold text-dark float-start">Forum Settings</p>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <form @click.prevent>
                                        <div class="mb-3">
                                            <label class="form-label text-secondary float-start" for="signature"><strong>Signature</strong><br></label>
                                            <textarea class="form-control" id="signature" rows="4" name="signature"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="formCheck-1">
                                                <label class="form-check-label text-secondary float-start" for="formCheck-1"><strong>Notify me about new replies</strong></label>
                                            </div>
                                        </div>
                                        <div class="mb-3"><button class="btn btn-change btn-sm float-start" type="submit">Save Settings</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template> 
<script setup>
//Import
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

let router = useRouter();
//Data
let userNotfoundError = ref('');
let userId = ref('');
let successMessege = ref('');
let errorMessage = ref('');
//Validation
let state = ref({
    name: "",
    email: "",
    psw: "",
});

let rulses = computed(() => {
    return {
        name: { required, minLength: minLength(10) },
        email: { required, email },
        psw: { required, minLength: minLength(8) }
    };
});
const v$ = useVuelidate(rulses, state );
//Mounted
let user = localStorage.getItem("user-info");

if (!user) {
    router.push({ path: "/" });
} else {
    state.value.name = JSON.parse(user).name;
    state.value.email = JSON.parse(user).email;
    state.value.psw = JSON.parse(user).psw;
    userId.value = JSON.parse(user).id;
}
//Methods
const updateNow = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        console.log("تمااام !");
        let url = `http://localhost:3000/users/${userId.value}`;
        let params = {
            name: state.value.name,
            email: state.value.email,
            psw: state.value.psw
        };
        await axios.put(url, params)
            .then(result => {
                console.log("Profile is updated successfully");
                localStorage.setItem("user-info", JSON.stringify(result.data));
                errorMessage.value = "";
                successMessege.value = "Profile is updated successfully";
                setTimeout(() => {
                    router.push({ path: "/profile" });
                }, 2500);
                console.log(result.data);
            })
            .catch(error => {
                successMessege.value = "";
                errorMessage.value = "Profile is Not updated";
                console.warn("Profile is Not updated", error);
            });
    } else {
        console.log("Not Validted");
        userNotfoundError.value = "User not found 404";
    }
};
</script>



<style scoped>
.img-profile-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 10px;
}
.img-profile-container{
    width: 160px;
    height: 160px;
    margin-left: auto;
    margin-right: auto;
}
.btn-change{
    background-color: var(--main-color);
    color: #fff;
    border: none;
    padding: 6px;
    font-size: 15px;
}
.btn-change:hover{
    background-color: var(--main-color);
}
.user-info {
    margin-right: 350px;
    color: rgba(106, 106, 106, 0.926);
}
.capt{
    margin-right: 700px !important;
}
@media (max-width: 490px) {
    .img-profile-container{
        margin-top: 15px; 
    }
    .btn-change{
        margin-top: 3px !important;
    }
}
</style>
