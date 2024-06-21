<template>
  <el-dialog
      v-model="useMenuDialogDataStore().menuDialogVisibleForEdit"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      class="dialog-edit"
      title="修改菜单信息"
  >
    <el-form ref="editMenuRef"
             :inline="true"
             :model="useMenuDialogDataStore().menuDialogRaw"
             :rules="rulesForMenu"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单ID" prop="menuId">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.menuId" clearable placeholder="菜单ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单名" prop="menuName">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.menuName" clearable placeholder="菜单名"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单icon" prop="icon">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.icon" clearable placeholder="菜单icon"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="父菜单ID" prop="parentId">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.parentId" clearable placeholder="父菜单ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="排序" prop="orderNum">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.orderNum" clearable placeholder="排序"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.path" clearable placeholder="组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.component" clearable placeholder="组件路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="是否外链" prop="isFrame">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.isFrame" clearable placeholder="是否外链"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单类型" prop="menuType">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.menuType" clearable placeholder="菜单类型"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="菜单可见性" prop="visible">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.visible" clearable placeholder="菜单可见性"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="状态" prop="status">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.status" clearable placeholder="状态"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="权限标识" prop="perms">
            <el-input v-model="useMenuDialogDataStore().menuDialogRaw.perms" clearable placeholder="菜单权限标识"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useMenuDialogDataStore().menuDialogRaw.remark"
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
        <el-button @click="useMenuDialogDataStore().menuDialogVisibleForEdit = false">取消</el-button>
        <el-button type="primary" @click="editMenu(editMenuRef)">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useMenuDialogDataStore} from "/src/pinia/module/menu/useMenuDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ElMessage, FormInstance} from "element-plus";
import {editRequest, queryMenuTreeRequest} from "/src/axios/api/menuApi.ts";
import {useMenuStore} from "/src/pinia/module/menu/useMenuStore.ts";
import {Menu} from "/src/axios/api/type/Menu.ts";
import {ref} from "vue";
import {rulesForMenu} from "/src/components/layout/rightSection/main/views/system/menu/menuData.ts";

const handleClose = (done: () => void) => {
  done()
}

const editMenuRef = ref<FormInstance>()

const editMenu = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
        if (valid) {
          editRequest(useMenuDialogDataStore().menuDialogRaw).then(
              () => {
                ElMessage({
                      message: '修改菜单信息成功',
                      type: 'success',
                    }
                )
                queryMenuTreeRequest().then((res: Menu[]) => {
                  useMenuStore().tableData = res
                })
              })
          useMenuDialogDataStore().menuDialogVisibleForEdit = false
        }
      }
  )
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.dialog-edit {
  border-radius: .75rem
}
</style>
