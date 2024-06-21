<template>
  <el-row v-if="useResponsiveLayoutStore().isDesktop">
    <el-col :span="24">
      <InfoCard></InfoCard>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="!useResponsiveLayoutStore().isDesktop?24:16">
      <Calendar></Calendar>
    </el-col>
    <el-col :span="!useResponsiveLayoutStore().isDesktop?24:8"
            style="font-family: AlibabaPuHuiTi-3-55-RegularL3,serif;">
      <QuickNavigation></QuickNavigation>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import InfoCard from "/src/components/layout/rightSection/main/views/workbench/console/infoCard/InfoCard.vue";
import Calendar from "/src/components/layout/rightSection/main/views/workbench/console/calendar/Calendar.vue";
import QuickNavigation
  from "/src/components/layout/rightSection/main/views/workbench/console/quickNavigation/QuickNavigation.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}

</style>