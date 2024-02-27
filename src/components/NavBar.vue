<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">P O S</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <!-- Search -->
        <form class="d-flex me-auto" role="search">
          <div class="nav-search">
            <input class="nav-inp" type="search" placeholder="Search" aria-label="Search">
            <button class="" type="submit"><font-awesome-icon :icon="['fas', 'magnifying-glass']"
                class="font-icon" /></button>

          </div>
        </form>
        <!-- Actions -->
        <ul class="navbar-nav  mb-2 mb-lg-0 d-flex" style="align-items: baseline">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <font-awesome-icon :icon="['fas', 'comments']" class="font-icon" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <font-awesome-icon :icon="['fas', 'bell']" class="font-icon" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <font-awesome-icon :icon="['fas', 'gear']" class="font-icon" />
            </a>
          </li>
          <li class="nav-item">
            <ToggelBtn />
          </li>

        </ul>
        <!-- profile -->
        <div class="nav-profile">
          <div class="img-containar">
            <img src="../assets/images/avatar.webp" class="" alt="">
          </div>
          <div>
            <!-- <h5>Majd Ahmed</h5> -->
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Majd Ahmed
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import ToggelBtn from "@/components/ToggelBtn.vue";
</script>


<style scoped>
.nav-profile {
  display: flex;
}

.img-containar {
  width: 50px;
  height: 50px;

}

.img-containar>img {
  width: 100%;
  height: 100%;
  border-radius: 35%;
  object-fit: cover;
}

.font-icon {
  color: #ffa600;
  font-size: 22px;
}

.nav-search {
  /* border:  red solid 2px; */
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  width: 350px;
  height: 33px;
  background-color: #fff;
  border-top: solid 2px #ffa600;
  border-bottom: solid 2px red;
}

.nav-inp {
  position: absolute;
  all: unset;
  width: 90%;
}

.nav-search>button {
  all: unset;
  cursor: pointer;
  width: 20%;
}
</style>

