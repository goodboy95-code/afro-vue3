<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>

console.log(import.meta.env.VITE_TARGET) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
</script>

<style lang="scss">
.el-dialog {
  border-radius: .75rem !important;
}
</style>
