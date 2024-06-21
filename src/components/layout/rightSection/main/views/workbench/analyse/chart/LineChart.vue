<template>
  <div class="class-fares-style">
    <div ref="classFares"
         :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
         class="class-fares-chart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const classFares = ref(null);
let myChart = null;
let resizeObserver = null;

onMounted(async () => {
  myChart = echarts.init(
      classFares.value,
      getCurrentInstance().appContext.config.globalProperties.$theme
  );
  myChart.setOption({
        title: {
          text: "折线统计图",
          textStyle: {
            fontSize: 20
          },
          show: true,
        },
        xAxis: {
          type: 'category',
          data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7'],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
  );
  resizeObserver = new ResizeObserver(() => {
    // 在这里调用resize方法
    myChart.resize();
  });
  if (classFares.value) {
    resizeObserver.observe(classFares.value);
  }
})

onUnmounted(() => {
  if (classFares.value) {
    resizeObserver.unobserve(classFares.value);
  }
});

</script>
<style lang="scss" scoped>
.class-fares-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .class-fares-chart {
    width: 400px;
    flex-shrink: 0;
    height: 300px;

    &.is-mobile {
      width: 300px;
    }

    &.is-pad {
      width: 300px;
    }

    &.is-desktop {
      width: 400px;
      height: 300px;
    }
  }
}
</style>