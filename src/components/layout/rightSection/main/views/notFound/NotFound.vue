<template>
  <div class="not-found">
    <el-image :src="notFound"></el-image>
  </div>
</template>

<script lang="ts" setup>
import notFound from '/src/assets/svg/404_未找到访问页面.svg'
</script>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-image {
    height: 100%
  }
}
</style>