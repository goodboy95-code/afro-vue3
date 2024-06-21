<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <div v-if="useResponsiveLayoutStore().isDesktop" class="logo-fold"
         @click="rHamburger">
      <img :class="{'rotatePicture': useResponsiveLayoutStore().rotateHamburger}" alt=""
           src="/src/assets/image/icon-rotatePicture.png" style="display: block;width: 100%">
    </div>
    <div v-else class="logo-fold" @click="useResponsiveLayoutStore().showPopoverSideBarAction()">
      <img v-if="true" :class="{'rotatePicture': true}" alt=""
           src="/src/assets/image/icon-rotatePicture.png" style="display: block;width: 100%">
    </div>
    <div v-if="!useResponsiveLayoutStore().isMobile" class="breadcrumb-border">
      <transition-group name="slide-fade">
        <el-breadcrumb-item v-for="(route) in breadcrumbData.pathMatched" :key="route.name">
          {{ route.name }}
        </el-breadcrumb-item>
      </transition-group>
    </div>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import {RouteLocationMatched, useRoute} from "vue-router";
import {reactive, watch} from "vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

interface BreadcrumbData {
  pathMatched: RouteLocationMatched[],
}

const route = useRoute()
const breadcrumbData: BreadcrumbData = reactive({
  pathMatched: undefined,
})

watch(route, (route) => {
  breadcrumbData.pathMatched = route.matched.filter((data) => {
    return !data.meta.hidden
  })
}, {immediate: true})
const rHamburger = () => {
  useResponsiveLayoutStore().rotateHamburger = !useResponsiveLayoutStore().rotateHamburger
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  padding-top: 5px;
  width: 50%;
  height: 36px;

  .logo-fold {
    display: inline-block;
    //避免双击被选中
    user-select: none;

    padding: 8px 16px 8px 8px;
    box-sizing: border-box;
    width: 44px;
    height: 36px;

    .rotatePicture {
      transform: scaleX(-1);
    }
  }

  .breadcrumb-border {
    border: var(--el-bg-color-page) 1px solid;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    display: inline-block;
  }
}

.slide-fade-enter-active {
  transition: opacity .4s ease;
}

.slide-fade-leave-active {
  position: absolute;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
}

</style>