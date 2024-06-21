<template>
  <el-dialog
      v-model="useMenuDialogDataStore().menuDialogVisibleForAdd"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="添加菜单"
  >
    <el-form ref="addMenuRef"
             :inline="true"
             :model="useMenuDialogDataStore().menuDialogRawForAdd"
             :rules="rulesForMenu"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单名" prop="menuName">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.menuName" clearable placeholder="菜单名"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单icon" prop="icon">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.icon" clearable placeholder="菜单icon"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="父菜单ID" prop="parentId">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.parentId" clearable placeholder="父菜单ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="排序" prop="orderNum">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.orderNum" clearable placeholder="排序"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.path" clearable placeholder="组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.component" clearable
                      placeholder="组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="是否外链" prop="isFrame">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.isFrame" clearable placeholder="是否外链"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单类型" prop="menuType">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.menuType" clearable placeholder="菜单类型"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单可见性" prop="visible">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.visible" clearable
                      placeholder="菜单可见性"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="状态" prop="status">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.status" clearable placeholder="状态"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="权限标识" prop="visible">
            <el-input v-model="useMenuDialogDataStore().menuDialogRawForAdd.perms" clearable
                      placeholder="菜单权限标识"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useMenuDialogDataStore().menuDialogRawForAdd.remark"
                :rows="3"
                placeholder="备注"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useMenuDialogDataStore().menuDialogVisibleForAdd = false">取消</el-button>
        <el-button type="primary" @click="addMenuForm(addMenuRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useMenuDialogDataStore} from "/src/pinia/module/menu/useMenuDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {addRequest} from "/src/axios/api/menuApi.ts";
import {useUserDialogDataStore} from "/src/pinia/module/user/useUserDialogDataStore.ts";
import {Menu} from "/src/axios/api/type/Menu.ts";
import Utils from "/src/utils/Utils.ts";
import {rulesForMenu} from "/src/components/layout/rightSection/main/views/system/menu/menuData.ts";
import {isEqual} from "lodash-es";

const handleClose = (done: () => void) => {
  done()
}

const addMenuRef = ref<FormInstance>()

const addMenuForm = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
    if (valid) {
      addRequest(useMenuDialogDataStore().menuDialogRawForAdd).then((res: number) => {
        if (isEqual(res, 1)) {
          ElMessage({
            message: '添加菜单成功',
            type: 'success',
          })
          useUserDialogDataStore().userDialogVisibleForAdd = false
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
