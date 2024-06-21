<template>
  <el-text class="fullscreen-style" size="default" tag="b" @click="enterFullscreen">
    <el-icon>
      <FullScreen/>
    </el-icon>
    <span v-if="!useResponsiveLayoutStore().isMobile">
      <span v-if="!isFullscreen">
        全屏
      </span>
      <span v-else>
        退出全屏
      </span>
    </span>
  </el-text>
</template>

<script lang="ts" setup>
import {FullScreen} from "@element-plus/icons-vue";
import {ref} from "vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

let isFullscreen = ref(false)
const enterFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen(); // 标准的 Fullscreen API
    isFullscreen.value = true
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    isFullscreen.value = false
  }
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/header";

.fullscreen-style {
  @include header.headerTheme
}
</style>