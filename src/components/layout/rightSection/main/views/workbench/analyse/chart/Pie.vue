<template>
  <div class="pie-style">
    <div ref="chart"
         :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
         class="pie-chart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, ref} from "vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const chart = ref();
onMounted(() => {
  init()
});

function init() {
  const myChart = echarts.init(
      chart.value,
      getCurrentInstance().appContext.config.globalProperties.$theme);
  myChart.setOption({
        title: {
          text: "性别分布",
          top: "top",
          left: "center",
          textStyle: {
            fontSize: 16
          },
          show: true,
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          left: 'center'
        },
        series: [
          {
            name: '性别',
            type: 'pie',
            radius: ['5%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderWidth: 0
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 753,
                name: '男',
              },
              {
                value: 654,
                name: '女',
              },
              {
                value: 543,
                name: '未知',
              },
            ],
          }
        ]
      }
  );
}
</script>

<style lang="scss" scoped>
.pie-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .pie-chart {
    width: 200px;
    height: 300px;

    &.is-mobile {
      width: 200px;
    }

    &.is-pad {
      width: 200px;
    }

    &.is-desktop {
      width: 200px;
    }

    /*@media (max-width: 768px) {
      background-color: #00A896;
    }*/
  }
}
</style>