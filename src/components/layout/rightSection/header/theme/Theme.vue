<template>
  <el-switch v-model="isDark" @change="getChangSwitchValue">
    <template #active-action>
      <el-icon style="--color: var(--el-color-white)">
        <Moon/>
      </el-icon>
    </template>
    <template #inactive-action>
      <el-icon style="--color: var(--el-color-black)">
        <Sunny/>
      </el-icon>
    </template>
  </el-switch>
</template>

<script lang="ts" setup>
import {useDark} from "@vueuse/core";
import {Moon, Sunny} from "@element-plus/icons-vue";
import {useThemeStore} from "/src/pinia/module/useThemeStore.ts";

const isDark = useDark({
  storageKey: 'afro-theme',
})

const getChangSwitchValue = (value: boolean) => {
  useThemeStore().isDark = value
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/header";

.el-switch {
  --el-switch-on-color: var(--el-border-color-light);
  --el-switch-off-color: var(--el-border-color-light);
  @include header.headerTheme;

  ::v-deep(.el-switch__core .el-switch__action) {
    background-color: var(--el-border-color-light);
  }
}
</style>