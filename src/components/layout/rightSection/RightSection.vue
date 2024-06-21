<template>
  <icon-hamburger-button v-if="useResponsiveLayoutStore().isDesktop&&useResponsiveLayoutStore().rotateHamburger"
                         class="suspended-hamburger" fill="#333" size="28"
                         theme="outline" @click="useResponsiveLayoutStore().showPopoverSideBarAction"/>
  <div
      :class="{'rotateHamburger':useResponsiveLayoutStore().rotateHamburger,'isNotDeskTop':!useResponsiveLayoutStore().isDesktop}"
      class="right-style">
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script lang="ts" setup>
import Header from "/src/components/layout/rightSection/header/Header.vue";
import Main from "/src/components/layout/rightSection/main/Main.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
</script>

<style lang="scss" scoped>
.suspended-hamburger {
  position: fixed;
  left: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  z-index: 3;
  cursor: pointer;
}

.right-style {
  width: calc(100% - 241px);
  height: 100%;

  &.rotateHamburger {
    width: 100%
  }

  &.isNotDeskTop {
    width: 100%;
  }
}
</style>