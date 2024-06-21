<template>
  <div v-if="item.meta?!item.meta.hidden:true">
    <template v-if="hasOneShowingChild(item.children,item)">
      <el-menu-item v-if="Utils.isUrl(sidebarItemData.onlyOneChild.path)" style="padding: 0">
        <el-link :href="sidebarItemData.onlyOneChild.path" :underline="false">
          <component style="margin-right: 8px" :is="sidebarItemData.onlyOneChild.meta.icon"></component>
          <span>
          {{ sidebarItemData.onlyOneChild.meta.title }}
          </span>
        </el-link>
      </el-menu-item>
      <el-menu-item v-else :index="sidebarItemData.onlyOneChild.path">
        <component style="margin-right: 8px" :is="sidebarItemData.onlyOneChild.meta.icon"></component>
        <span>
          {{ sidebarItemData.onlyOneChild.meta.title }}
        </span>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index=item.path>
      <template #title>
        <component style="margin-right: 8px" :is="item.meta.icon"></component>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
          v-for="(child) in item.children"
          :item="child"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import Utils from "/src/utils/Utils.ts";
import {RouteRecordRaw} from "vue-router";

interface SidebarItemData {
  onlyOneChild: RouteRecordRaw
}

interface SidebarItemProp {
  item: RouteRecordRaw,
}

defineProps<SidebarItemProp>()

const sidebarItemData: SidebarItemData = reactive({
  onlyOneChild: undefined
})
const hasOneShowingChild = (children: RouteRecordRaw[], parent: RouteRecordRaw) => {
  {
    if (!children) {
      children = [];
    }
    const showingChildren = children.filter(item => {
      if (item.meta.hidden) {
        return false
      } else {
        sidebarItemData.onlyOneChild = item
        return true
      }
    })
    if (showingChildren.length === 1) {
      if (Utils.isEmpty(sidebarItemData.onlyOneChild.children)) {
        return true
      }
    }
    if (showingChildren.length === 0) {
      sidebarItemData.onlyOneChild = {...parent}
      return true
    }
    return false
  }
}
</script>

<style lang="scss" scoped>
.el-link {
  width: 100%;
  justify-content: flex-start;
  background-color: var(--el-bg-color-page);
  padding-left: 20px;
  padding-right: 20px;
}

.el-sub-menu {
  ::v-deep(.el-sub-menu__title) {
    background-color: var(--el-bg-color-page);
  }

  .el-menu-item {
    background-color: var(--el-bg-color-overlay);

    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>