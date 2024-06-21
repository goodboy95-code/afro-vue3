<template>
  <el-scrollbar>
    <el-menu
        :default-active="useRoute().path"
        router
        unique-opened
    >
      <sidebar-item
          v-for="(route) in useRouteStore().getSideBarRoutes"
          :key="Utils.uniqueId()"
          :item="route"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import SidebarItem from "/src/components/layout/sidebar/sidebarMenu/sideBarItem/SidebarItem.vue";
import {useRouteStore} from '/src/pinia/module/useRouteStore.ts'
import {reactive} from "vue";
import {useRoute} from "vue-router";
import Utils from "/src/utils/Utils.ts";

interface SidebarMenuData {
}

const sidebarMenuData: SidebarMenuData = reactive({});
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: calc(100% - 200px);
  width: 240px;
  background-color: var(--el-bg-color-page);
  .el-menu{
    border-right: none;
  }
}
</style>