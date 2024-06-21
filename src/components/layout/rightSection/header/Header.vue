<template>
  <div class="header-style">
    <Breadcrumb/>
    <div class="header-right-style">
      <Theme></Theme>
      <FullScreen></FullScreen>
      <Drawer></Drawer>
      <Logout></Logout>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Drawer from "/src/components/layout/rightSection/header/drawer/Drawer.vue";
import Logout from "/src/components/layout/rightSection/header/logout/Logout.vue";
import FullScreen from "/src/components/layout/rightSection/header/fullscreen/FullScreen.vue";
import Breadcrumb from "/src/components/layout/rightSection/header/breadcrumb/Breadcrumb.vue";
import Theme from "/src/components/layout/rightSection/header/theme/Theme.vue";
</script>

<style lang="scss" scoped>
.header-style {
  width: 100%;
  height: 46px;
  background-color: var(--el-bg-color-overlay);
  display: flex;
  justify-content: space-between;

  .header-right-style {
    display: flex;
    align-items: center;
  }
}
</style>