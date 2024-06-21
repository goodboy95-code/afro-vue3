<template>
  <div :class="{'is-mobile':useResponsiveLayoutStore().isMobile,
                'is-pad':useResponsiveLayoutStore().isMobile,
                'is-desktop':useResponsiveLayoutStore().isMobile}"
       class="analyse-style">
    <el-card class="a" shadow="never">
      <Histogram/>
    </el-card>
    <el-card class="b" shadow="never">
      <RadarChart/>
    </el-card>
    <el-card class="c" shadow="never">
      <LineChart/>
    </el-card>
    <el-card class="d" shadow="never">
      <Pie/>
    </el-card>
    <el-card class="e" shadow="never">
      <Funnel/>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Pie from "/src/components/layout/rightSection/main/views/workbench/analyse/chart/Pie.vue";
import RadarChart from "/src/components/layout/rightSection/main/views/workbench/analyse/chart/RadarChart.vue";
import Histogram from "/src/components/layout/rightSection/main/views/workbench/analyse/chart/Histogram.vue";
import LineChart from "/src/components/layout/rightSection/main/views/workbench/analyse/chart/LineChart.vue";
import Funnel from "/src/components/layout/rightSection/main/views/workbench/analyse/chart/Funnel.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
</script>

<style>
.analyse-style {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 452px 342px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  .a {
    grid-row: 1;
    grid-column: span 2;
  }

  .b {
    grid-row: 1;
    grid-column: span 2;
  }

  .c {
    grid-row: 2;
    grid-column: span 2;
  }

  .d {
    grid-row: 2;
    grid-column: 3;
  }

  .e {
    grid-row: 2;
    grid-column: 4;
  }

  &.is-mobile {
    grid-template-columns: 1fr;
    grid-template-rows: 452px 452px 342px 342px 342px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;

    .a {
      grid-row: 1;
      grid-column: 1;
    }

    .b {
      grid-row: 2;
      grid-column: 1;
    }

    .c {
      grid-row: 3;
      grid-column: 1;
    }

    .d {
      grid-row: 4;
      grid-column: 1;
    }

    .e {
      grid-row: 5;
      grid-column: 1;
    }
  }
}
</style>