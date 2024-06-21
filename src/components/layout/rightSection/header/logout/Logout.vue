<template>
  <el-text class="logout-style" size="default" tag="b" @click="open">
    <el-icon>
      <SwitchButton/>
    </el-icon>
    <span v-if="!useResponsiveLayoutStore().isMobile">
      退出
    </span>
  </el-text>
</template>

<script lang="ts" setup>
import {SwitchButton} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "/src/router";
import {useUserStore} from "/src/pinia/module/user/useUserStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const open = () => {
  ElMessageBox.confirm(
      '您确定退出吗',
      '退出',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  ).then(() => {
    useUserStore().logOut().then(async (res) => {
      //跳转到登录页面
      await router.push({path: res})
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消退出',
    })
  })
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/header";

.logout-style {
  @include header.headerTheme
}
</style>