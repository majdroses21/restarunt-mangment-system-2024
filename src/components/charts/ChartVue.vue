<template>
    <v-chart class="chart" :option="option" />
</template>
  
<script setup>
import { useStore } from "vuex";
let store = useStore();
store.commit('getAllUserCategories');
console.log(store.state.allCategories);
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

provide(THEME_KEY, "light");

const option = ref({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
                borderRadius: 10
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 12, name: 'Restaurants', itemStyle: { color: '#ffc107' } },
                { value: 30, name: 'Menus', itemStyle: { color: '#eb2210' } },
                { value: 30, name: 'Categories', itemStyle: { color: 'plum' } },
                { value: 20, name: 'Meals', itemStyle: { color: '#00FF00' } }
            ]
        }
    ]
});




</script>
  
<style scoped>
.chart {
    height: 400px;
}
</style>  