<template>
  <div class="funnel-style">
    <div ref="funnel"
         :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
         class="funnel-chart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, ref} from "vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

let funnel =  ref(null);
let funnelChart = null;
let resizeObserver = null;

onMounted(() => {
  funnelChart = echarts.init(
      funnel.value,
      getCurrentInstance().appContext.config.globalProperties.$theme);
  funnelChart.setOption(
      {
        title: {
          text: '漏斗图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: '数据',
            type: 'funnel',
            left: 'center',
            bottom: 60,
            width: '100%',
            minSize: '20%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
            label: {
              show: true,
              position: 'inside'
            },
            data: [
              {value: 60, name: '数据1'},
              {value: 40, name: '数据2'},
              {value: 20, name: '数据3'},
              {value: 80, name: '数据4'},
              {value: 100, name: '数据5'}
            ]
          }
        ]
      }
  );
  resizeObserver = new ResizeObserver(() => {
    // 在这里调用resize方法
    funnelChart.resize();
  });
  if (funnel.value) {
    resizeObserver.observe(funnel.value);
  }
});
</script>

<style lang="scss" scoped>
.funnel-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .funnel-chart {
    width: 200px;
    flex-shrink: 0;
    height: 300px;

    &.is-mobile {
      width: 150px;
    }

    &.is-pad {
      width: 150px;
    }

    &.is-desktop {
      width: 200px;
    }
  }
}
</style>