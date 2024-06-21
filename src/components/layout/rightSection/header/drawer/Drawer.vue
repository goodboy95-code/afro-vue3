<template>
  <el-text class="drawer-style" size="default" tag="b" @click="data.drawer = true">
    <el-icon>
      <Setting/>
    </el-icon>
    <span v-if="!useResponsiveLayoutStore().isMobile">
      设置
    </span>
  </el-text>
  <el-drawer v-model="data.drawer"
             :with-header="true"
             :size="useResponsiveLayoutStore().isMobile ? '70%' : '30%'"
             title="设置">
    <el-button type="primary" @click="dialogTableVisible = true">添加快捷导航</el-button>
    <el-dialog v-model="dialogTableVisible" title="添加快捷导航"
               @close="setUerRoleMenu">
      <el-cascader
          ref="cascader"
          v-model="useMenuStore().selectedNavigationIds"
          :options="cloneDeep(useRouteStore().dynamicRoute)"
          :props="props"
          clearable
          collapse-tags
          collapse-tags-tooltip
      >
      </el-cascader>
    </el-dialog>
  </el-drawer>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {Setting} from "@element-plus/icons-vue";
import {useRouteStore} from "/src/pinia/module/useRouteStore.ts";
import {CascaderProps, ElMessage} from "element-plus";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import Utils from "/src/utils/Utils.ts";
import {UserRoleMenu} from "/src/axios/api/type/UserRoleMenu.ts";
import {insertOrDeleteUserRoleMenuRequest, queryNavigationsRequest} from "/src/axios/api/userRoleMenuApi.ts";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import {cloneDeep} from "lodash-es";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

const dialogTableVisible = ref(false)
const cascader = ref()

const data = reactive({
  drawer: false,
})

const props: CascaderProps = {
  multiple: true,
  value: 'menuId',
  label: 'name',
  children: 'children',
  disabled: 'isNavigation'
}

const setUerRoleMenu = () => {
  let uerRoleMenu: UserRoleMenu[] = useCommonStore().setUserRoleMenu(
      useMenuStore().selectedNavigationIds,
      useRoleStore().selectedRole.roleId,
      useUserInfoStore().userInfo.user.userId
  );
  if (Utils.isEmpty(uerRoleMenu)) {
    uerRoleMenu = []
  }
  insertOrDeleteUserRoleMenuRequest(uerRoleMenu).then((res) => {
    ElMessage({
      message: res,
      type: "success"
    });
    queryNavigationsRequest(useRoleStore().selectedRole.roleId).then((res) => {
      useRouteStore().navigations = res
      for (let i = 0; i < res.length; i++) {
        useMenuStore().owningNavigationIds.push(res[i].menuId);
      }
      useMenuStore().selectedNavigationIds = useMenuStore().owningNavigationIds
    })
  })
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";
@use "/src/assets/styles/scss/drawer";
@use "/src/assets/styles/scss/header";

.drawer-style {
  @include header.headerTheme;
}

.el-drawer {
  @include drawer.drawerTheme;

  .el-card {
    @include card.cardTheme;
    border: none;

    .card-header {
      @include card.cardHeaderCenter
    }
  }
}
</style>