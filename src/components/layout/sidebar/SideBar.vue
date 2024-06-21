<template>
  <transition name="showPopover">
    <div
        v-if="useResponsiveLayoutStore().showPopoverSideBar"
        class="shield-sidebar-style">
      <UserInfo/>
      <SidebarMenu/>
    </div>
  </transition>
  <div v-if="useResponsiveLayoutStore().showPopoverSideBar" class="right-shield"
       @click="useResponsiveLayoutStore().closePopoverSidebarAction()"></div>
  <div v-if="!useResponsiveLayoutStore().showPopoverSideBar&&useResponsiveLayoutStore().isDesktop&&!useResponsiveLayoutStore().rotateHamburger"
      class="sidebar-style">
    <UserInfo/>
    <SidebarMenu/>
  </div>
</template>

<script lang="ts" setup>
import UserInfo from "/src/components/layout/sidebar/userInfo/UserInfo.vue";
import SidebarMenu from "/src/components/layout/sidebar/sidebarMenu/SidebarMenu.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
</script>

<style lang="scss" scoped>
.right-shield {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  right: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-style {
  width: 240px;
  height: 100%;
  z-index: 0;
}

.shield-sidebar-style {
  position: absolute;
  left: 0;
  width: 240px;
  height: 100%;
  z-index: 1000;
}

.showPopover-enter-active {
  transition: transform .5s ease;
}

.showPopover-leave-active {
  transition: transform .3s ease;
}

.showPopover-enter-from, .showPopover-leave-to {
  transform: translateX(-240px);
}
</style>