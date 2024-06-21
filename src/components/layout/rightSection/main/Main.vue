<template>
  <div class="main-style">
    <el-scrollbar class="el-scrollbar-tabs-view">
      <Tabs/>
    </el-scrollbar>
    <el-scrollbar class="el-scrollbar-router-view">
      <router-view/>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Tabs from "/src/components/layout/rightSection/main/tabs/Tabs.vue";
</script>

<style lang="scss" scoped>
.main-style {
  width: 100%;
  height: calc(100% - 46px);
  background-color: var(--el-bg-color);

  .el-scrollbar-tabs-view {
    height: 30px;
    width: calc(100% - 40px);
    margin: 0 20px;

    & >::v-deep(.el-scrollbar__wrap>.el-scrollbar__view) {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .el-scrollbar-router-view {
    border-top: var(--sys-border-style);
    height: calc(100% - 31px);

    & > ::v-deep(.el-scrollbar__wrap>.el-scrollbar__view) {
      padding: 20px 15px 20px;
    }

    ::v-deep(.el-scrollbar__bar) {
      right: 2px;
    }
  }
}

</style>