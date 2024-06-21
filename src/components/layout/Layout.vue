<template>
  <SideBar></SideBar>
  <RightSection></RightSection>
</template>

<script lang="ts" setup>
import RightSection from "/src/components/layout/rightSection/RightSection.vue";
import SideBar from "/src/components/layout/sidebar/SideBar.vue";
import {onMounted, onUnmounted} from "vue";
import {useThemeStore} from "/src/pinia/module/useThemeStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

onMounted(() => {
  // 初始化时执行一次
  useResponsiveLayoutStore().updateLayout();
  useThemeStore().toggleToAppMain()
  window.addEventListener('resize', () => {
    useResponsiveLayoutStore().updateLayout()
  });
});
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    useResponsiveLayoutStore().updateLayout()
  });
});
</script>
<style lang="scss" scoped>
</style>

