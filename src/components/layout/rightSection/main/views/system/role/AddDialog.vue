<template>
  <el-dialog
      v-model="useRoleDialogDataStore().roleDialogVisibleForAdd"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="添加角色"
  >
    <el-form ref="addRoleRef"
             :inline="true"
             :model="useRoleDialogDataStore().roleDialogRawForAdd"
             :rules="rulesForRole"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="useRoleDialogDataStore().roleDialogRawForAdd.roleName" clearable placeholder="角色名"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="角色状态" prop="status">
            <el-radio-group v-model="useRoleDialogDataStore().roleDialogRawForAdd.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="显示顺序" prop="roleSort">
            <el-input-number v-model="useRoleDialogDataStore().roleDialogRawForAdd.roleSort" :min="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useRoleDialogDataStore().roleDialogRawForAdd.remark"
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
        <el-button @click="useRoleDialogDataStore().roleDialogVisibleForAdd = false">取消</el-button>
        <el-button type="primary" @click="addRoleForm(addRoleRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {addRequest} from "/src/axios/api/roleApi.ts";
import {Role} from "/src/axios/api/type/Role.ts";
import {isEmpty, isEqual} from "lodash-es";
import {rulesForRole} from "/src/components/layout/rightSection/main/views/system/role/roleData.ts";

const handleClose = (done: () => void) => {
  done()
}

const addRoleRef = ref<FormInstance>()

const addRoleForm = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
    if (valid) {
      addRequest(useRoleDialogDataStore().roleDialogRawForAdd).then((res: number) => {
        if (isEqual(res, 1)) {
          ElMessage({
            message: '添加用户角色成功',
            type: 'success',
          })
          useRoleDialogDataStore().roleDialogVisibleForAdd = false
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
