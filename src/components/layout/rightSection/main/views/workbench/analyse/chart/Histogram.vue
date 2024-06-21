<template>
  <div class="grade-style">
    <div ref="grade"
         :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isPad,
                'is-desktop':useResponsiveLayoutStore().isDesktop}"
         class="grade-chart"></div>
    <el-scrollbar style="width: 100%;">
      <div class="scrollbar-flex-content">
        <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" class="statistic-card">
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
        <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" class="statistic-card">
          <el-statistic :value="2">
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
        <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" class="statistic-card">
          <el-statistic :value="12">
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
        <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" class="statistic-card">
          <el-statistic :value="29">
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
        <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" class="statistic-card">
          <el-statistic :value="3">
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
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import {CaretTop, Warning} from "@element-plus/icons-vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const grade = ref(null);
let myChart = null;
let resizeObserver = null;

onMounted(() => {
  myChart = echarts.init(
      grade.value,
      getCurrentInstance().appContext.config.globalProperties.$theme,
  );
  myChart.setOption({
    title: {
      text: "条形统计图",
      left: "left",
      textStyle: {
        fontSize: 20
      },
      show: true,
    },
    tooltip: {},
    xAxis: {
      data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6']
    },
    yAxis: {},
    series: [
      {
        name: '数量信息',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ],
  });

  resizeObserver = new ResizeObserver(() => {
    // 在这里调用resize方法
    myChart.resize();
  });
  if (grade.value) {
    resizeObserver.observe(grade.value);
  }
});

onUnmounted(() => {
  if (grade.value) {
    resizeObserver.unobserve(grade.value);
  }
});

</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/statistic";
.grade-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .grade-chart {
    width: 500px;
    flex-shrink: 0;
    height: 300px;

    &.is-mobile {
      width: 300px;
      height: 300px;
    }

    &.is-pad {
      width: 300px;
      height: 300px;
    }

    &.is-desktop {
      width: 500px;
      height: 300px;
    }
  }

  .scrollbar-flex-content {
    display: flex;

    .statistic-card {
      flex-shrink: 0;
      margin-right: 10px;
      width: 170px;


      &.is-mobile {
        width: 140px;
      }

      .el-statistic {
        padding: 8px;
        @include statistic.statisticThemeFirst;
      }

      .statistic-footer {
        @include statistic.statisticThemeFooter
      }
    }
  }
}
</style>