<template>
    <div class="container">
        <div class="row mt-3">
            <!-- Rests -->
            <div class="col-md-6 col-xl-3 mb-4">
                <div class="card  border-start-primary py-2">
                    <div class="card-body">
                        <div class="row align-items-center no-gutters">
                            <div class="col me-2">
                                <div class="text-uppercase text-warning fw-bold text-xs mb-1">
                                    <span>Total of Restarunts</span>
                                </div>
                                <div class="text-dark fw-bold h5 mb-0"><span>{{ store.state.allRestarunts }}</span></div>
                            </div>
                            <div class="col-auto"><span class="fa-2x text-gray-300 text-warning"><font-awesome-icon
                                        :icon="['fas', 'utensils']" class="font-icon" /></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Menus -->
            <div class="col-md-6 col-xl-3 mb-4">
                <div class="card  border-start-danger py-2">
                    <div class="card-body">
                        <div class="row align-items-center no-gutters">
                            <div class="col me-2">
                                <div class="text-uppercase text-danger fw-bold text-xs mb-1"><span>Total of menus</span>
                                </div>
                                <div class="text-dark fw-bold h5 mb-0"><span>{{ store.state.allRestarunts }}</span></div>
                            </div>
                            <div class="col-auto"><span class="fa-2x text-gray-300 text-danger"><font-awesome-icon
                                        :icon="['fas', 'utensils']" class="font-icon" /></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Catygories -->
            <div class="col-md-6 col-xl-3 mb-4">
                <div class="card  border-start-dark py-2">
                    <div class="card-body">
                        <div class="row align-items-center no-gutters">
                            <div class="col me-2">
                                <div class="text-uppercase fw-bold text-xs mb-1" style="color: plum;"><span>Total of
                                        Catygories</span>
                                </div>
                                <div class="text-dark fw-bold h5 mb-0"><span>{{ store.state.allCategories }}</span></div>
                            </div>
                            <div class="col-auto"><span class="fa-2x text-gray-300" style="color: plum;"><font-awesome-icon
                                        :icon="['fas', 'utensils']" class="font-icon" /></span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Meals -->
            <div class="col-md-6 col-xl-3 mb-4">
                <div class="card  border-start-dark py-2">
                    <div class="card-body">
                        <div class="row align-items-center no-gutters">
                            <div class="col me-2">
                                <div class="text-uppercase fw-bold text-xs mb-1 text-warning">
                                    <span>Total of meals</span>
                                </div>
                                <div class="text-dark fw-bold h5 mb-0">
                                    <span>{{ store.state.allUserMeals }}</span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <span class="fa-2x text-gray-300 text-warning">
                                    <font-awesome-icon :icon="['fas', 'bowl-food']" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="card">
                <h5 class="card-header">Featured</h5>
                <div class="card-body">
                    <ChartVue :allMeals="store.state.allUserMeals" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ChartVue from '../components/charts/ChartVue';
import { useStore } from "vuex";

let store = useStore();
store.commit('getUserId');
store.dispatch('doGetAllUserCategories');
store.dispatch('doGetAllUserRestarunts');
store.dispatch('doGetAllUserMeals');


</script>