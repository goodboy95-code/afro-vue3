<template>
  <el-dialog
      v-model="useRoleDialogDataStore().roleDialogVisibleForEdit"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      class="dialog-edit"
      title="修改角色信息"
  >
    <el-form ref="editRoleRef"
             :inline="true"
             :model="useRoleDialogDataStore().roleDialogRaw"
             :rules="rulesForRole"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="useRoleDialogDataStore().roleDialogRaw.roleName" clearable placeholder="用户昵称"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="角色状态" prop="status">
            <el-radio-group v-model="useRoleDialogDataStore().roleDialogRaw.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="显示顺序" prop="roleSort">
            <el-input-number v-model="useRoleDialogDataStore().roleDialogRaw.roleSort" :min="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="所属部门">
            <el-select
                v-model="useDepartmentStore().selectedDepartmentIds"
                multiple
                placeholder="Select"
                style="width: 240px">
              <el-option-group
                  v-for="group in useDepartmentStore().queryDepartmentOption"
                  :key="group.label"
                  :label="group.label"
              >
                <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useRoleDialogDataStore().roleDialogRaw.remark"
                :rows="3"
                placeholder="Please input"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useRoleDialogDataStore().roleDialogVisibleForEdit = false">取消</el-button>
        <el-button type="primary" @click="editRole">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import {editRequest, queryByPageRequest} from "/src/axios/api/roleApi.ts";
import {ElMessage, FormInstance} from "element-plus";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Role, RoleCondition} from "/src/axios/api/type/Role.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {rulesForRole} from "/src/components/layout/rightSection/main/views/system/role/roleData.ts";
import {ref} from "vue";
import {useDepartmentStore} from "/src/pinia/module/department/useDepartmentStore.ts";
import {insertOrDeleteRoleDepartmentRequest} from "/src/axios/api/roleDepartmentApi.ts";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

const handleClose = (done: () => void) => {
  done()
}

const editRoleRef = ref<FormInstance>()

const editRole = async () => {
  await editRequest(useRoleDialogDataStore().roleDialogRaw).then(
      () => {
        ElMessage({
          message: '修改角色信息成功',
          type: 'success',
        })
      },
  )
  let roleDepartmentList = useCommonStore().setRoleDepartment(useDepartmentStore().selectedDepartmentIds, useRoleStore().tableRoleId);
  await insertOrDeleteRoleDepartmentRequest(roleDepartmentList).then(
      (res) => {
        ElMessage({
          message: res,
          type: 'success',
        })
      },
  )
  await queryByPageRequest(
      new RoleCondition(
          useRoleStore().pageNumber,
          useRoleStore().lastQueryRoleName,
          useRoleStore().lastQueryStatusForSelect,
      )
  ).then(
      (res: SpringPage<Role>) => {
        useRoleStore().tableData = res.content
        useRoleStore().totalPages = res.totalPages
      }
  )
  await queryByPageRequest(
      new RoleCondition(
          useRoleStore().pageNumber,
          useRoleStore().lastQueryRoleName,
          useRoleStore().lastQueryStatusForSelect,
      )
  ).then(
      (res: SpringPage<Role>) => {
        useRoleStore().tableData = res.content
        useRoleStore().totalPages = res.totalPages
      }
  )
  useRoleDialogDataStore().roleDialogVisibleForEdit = false
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
