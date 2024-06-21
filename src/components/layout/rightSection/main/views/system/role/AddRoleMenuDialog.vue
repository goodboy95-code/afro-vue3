<template>
  <el-dialog
      v-model="useRoleDialogDataStore().roleDialogVisibleForAddMenu"
      title="添加菜单"
      width="800"
  >
    <el-cascader-panel
        v-model="useMenuStore().selectedMenuIds"
        :options="useMenuStore().allMenus"
        :props="props"
        style="width: fit-content"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelAddMenus">取消</el-button>
        <el-button type="primary" @click="submitAddMenus">
          添加
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {CascaderProps, ElMessage} from "element-plus";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {insertOrDeleteRoleMenuRequest} from "/src/axios/api/roleMenuApi.ts";
import Utils from "/src/utils/Utils.ts";
import {RoleMenu} from "/src/axios/api/type/RoleMenu.ts";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

const props: CascaderProps = {
  multiple: true,
  value: 'menuId',
  label: 'menuName',
  children: 'children',
}

const cancelAddMenus = () => {
  useRoleDialogDataStore().roleDialogVisibleForAddMenu = false;
}

const submitAddMenus = () => {
  let roleMenu: RoleMenu[] = useCommonStore().setRoleMenu(useMenuStore().selectedMenuIds, useRoleStore().tableRoleId);
  if (Utils.isEmpty(roleMenu)) {
    roleMenu = [{
      roleId: useRoleStore().tableRoleId,
      menuId: 1
    }]
  }
  insertOrDeleteRoleMenuRequest(roleMenu).then((res) => {
    ElMessage({
      message: res,
      type: "success"
    });
    useRoleDialogDataStore().roleDialogVisibleForAddMenu = false;
  })
}
</script>

<style lang="scss" scoped>
</style>