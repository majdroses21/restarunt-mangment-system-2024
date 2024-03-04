<template>
    <v-chart class="chart" :option="option" />
</template>  
<script setup>
import { useStore } from "vuex";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
let store = useStore();
store.commit('getUserId');
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
            data: []
        }
    ]
});

// Delayed execution after 5 seconds
setTimeout(() => {
    console.log(store.state.allUserMeals);

    // Update the 'data' property in the 'option' ref
    option.value.series[0].data = [
        { value: store.state.allRestarunts, name: 'Restaurants', itemStyle: { color: '#ffc107' } },
        { value: store.state.allRestarunts, name: 'Menus', itemStyle: { color: '#eb2210' } },
        { value: store.state.allCategories, name: 'Categories', itemStyle: { color: 'plum' } },
        { value: store.state.allUserMeals, name: 'Meals', itemStyle: { color: '#00FF00' } }
    ];
}, 100); // 5000 milliseconds (5 seconds)
</script>
  
<style scoped>
.chart {
    height: 400px;
}
</style>  