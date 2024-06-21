<template>
  <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
       class="one-grade-style">
    <el-scrollbar v-if="useResponsiveLayoutStore().isDesktop" height="400">
      <div class="statistic-container">
        <div class="statistic-card">
          <el-statistic :value="60">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                数据1
                <el-tooltip
                    content="数据1介绍"
                    effect="dark"
                    placement="top"
                >
                  <el-icon :size="12" style="margin-left: 4px">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <span>比上一季度</span>
            <span class="green">
                <el-icon>
                  <CaretTop/>
                </el-icon>
                24%
              </span>
          </div>
        </div>
        <div class="statistic-card">
          <el-statistic :value="60">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                数据2
                <el-tooltip
                    content="数据2介绍"
                    effect="dark"
                    placement="top"
                >
                  <el-icon :size="12" style="margin-left: 4px">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <span>比上一季度</span>
            <span class="green">
                <el-icon>
                  <CaretTop/>
                </el-icon>
                24%
              </span>
          </div>
        </div>
        <div class="statistic-card">
          <el-statistic :value="60">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                数据3
                <el-tooltip
                    content="数据3介绍"
                    effect="dark"
                    placement="top"
                >
                  <el-icon :size="12" style="margin-left: 4px">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <span>比上一季度</span>
            <span class="green">
                <el-icon>
                  <CaretTop/>
                </el-icon>
                24%
              </span>
          </div>
        </div>
        <div class="statistic-card">
          <el-statistic :value="60">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                数据4
                <el-tooltip
                    content="数据4介绍"
                    effect="dark"
                    placement="top"
                >
                  <el-icon :size="12" style="margin-left: 4px">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <span>比上一季度</span>
            <span class="green">
                <el-icon>
                  <CaretTop/>
                </el-icon>
                24%
              </span>
          </div>
        </div>
        <div class="statistic-card">
          <el-statistic :value="60">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                数据5
                <el-tooltip
                    content="数据5介绍"
                    effect="dark"
                    placement="top"
                >
                  <el-icon :size="12" style="margin-left: 4px">
                    <Warning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <span>比上一季度</span>
            <span class="green">
                <el-icon>
                  <CaretTop/>
                </el-icon>
                24%
              </span>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div ref="radar"
         :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
         class="class-fares-chart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import {CaretTop, Warning} from "@element-plus/icons-vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const radar = ref(null);
let radarChart = null;
let resizeObserver = null;

onMounted(() => {
  radarChart = echarts.init(
      radar.value,
      getCurrentInstance().appContext.config.globalProperties.$theme
  );
  radarChart.setOption({
        title: {
          text: "雷达图",
          left: 'center',
          textStyle: {
            fontSize: 20
          },
          show: true,
        },
        legend: {
          data: ['对象1', '对象2'],
          bottom: 'bottom'
        },
        radar: {
          indicator: [
            {name: '数据1', max: 100},
            {name: '数据2', max: 100},
            {name: '数据3', max: 100},
            {name: '数据4', max: 100},
            {name: '数据5', max: 100},
            {name: '数据6', max: 100}
          ]
        },
        series: [
          {
            name: '比较数据',
            type: 'radar',
            data: [
              {
                value: [80, 80, 80, 80, 80, 80],
                name: '对象1'
              },
              {
                value: [90, 90, 90, 90, 90, 90],
                name: '对象2'
              }
            ]
          }
        ]
      }
  );
  resizeObserver = new ResizeObserver(() => {
    // 在这里调用resize方法
    radarChart.resize();
  });
  if (radar.value) {
    resizeObserver.observe(radar.value);
  }
})

onUnmounted(() => {
  if (radar.value) {
    resizeObserver.unobserve(radar.value);
  }
});
</script>
<style lang="scss" scoped>
@use "/src/assets/styles/scss/statistic";

.one-grade-style {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.is-mobile {
    justify-content: center;
  }

  &.is-pad {
    justify-content: center;
  }

  .statistic-container {
    width: 132px;
    height: 100%;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;

    .statistic-card {
      margin-top: 8px;

      .el-statistic {
        padding: 8px;
        @include statistic.statisticThemeFirst;
      }

      .statistic-footer {
        @include statistic.statisticThemeFooter
      }
    }
  }

  .class-fares-chart {
    width: 340px;
    height: 400px;
    flex-shrink: 0;

    &.is-mobile {
      width: 300px;
      height: 400px;
    }

    &.is-pad {
      width: 300px;
      height: 400px;
    }

    &.is-desktop {
      width: 340px;
      height: 400px;
    }
  }
}
</style>