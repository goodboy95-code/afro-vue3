<template>
  <Calendar borderless :is-dark="useThemeStore().isDark" expanded title-position="left">
  </Calendar>
</template>

<script lang="ts" setup>
import {Calendar} from 'v-calendar'
import {useThemeStore} from "/src/pinia/module/useThemeStore.ts";
</script>

<style lang="scss">
button {
  background-color: transparent;
}
.vc-container {
  background-color: var(--el-bg-color-overlay);
  border-radius: .40rem;
}
</style>