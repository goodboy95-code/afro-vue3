<template>
  <el-dialog
      v-model="useUserDialogDataStore().userDialogVisibleForAdd"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="添加"
  >
    <el-form ref="addUserRef"
             :inline="true"
             :model="useUserDialogDataStore().userDialogRawForAdd"
             :rules="rulesForUser"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="useUserDialogDataStore().userDialogRawForAdd.userName" clearable placeholder="用户名"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="useUserDialogDataStore().userDialogRawForAdd.nickName" clearable placeholder="用户昵称"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="添加角色" prop="selectedRole">
            <el-select
                v-model="useUserDialogDataStore().userDialogRawForAdd.selectedRole"
                multiple
                placeholder="角色类型"
                style="width: 167px"
            >
              <el-option
                  v-for="item in useRoleStore().allRoles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户性别" prop="sex">
            <el-radio-group v-model="useUserDialogDataStore().userDialogRawForAdd.sex">
              <el-radio-button label="M" size="large"> 男</el-radio-button>
              <el-radio-button label="F" size="large"> 女</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户状态" prop="status">
            <el-radio-group v-model="useUserDialogDataStore().userDialogRawForAdd.status">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="useUserDialogDataStore().userDialogRawForAdd.phoneNumber" clearable
                      placeholder="手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="useUserDialogDataStore().userDialogRawForAdd.email" clearable placeholder="邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useUserDialogDataStore().userDialogRawForAdd.remark"
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
        <el-button @click="useUserDialogDataStore().userDialogVisibleForAdd = false">取消</el-button>
        <el-button type="primary" @click="addUserForm(addUserRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useUserDialogDataStore} from "/src/pinia/module/user/useUserDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {addBatchRequest} from "/src/axios/api/userRoleApi.ts";
import {addRequest} from "/src/axios/api/userApi.ts";
import {rulesForUser} from "/src/components/layout/rightSection/main/views/system/user/userData.ts";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

//关闭addDialog
const handleClose = (done: () => void) => {
  done()
}

const addUserRef = ref<FormInstance>()

const addUserForm = (formEl: FormInstance | undefined) => {
  formEl.validate((valid) => {
    if (valid) {
      addRequest(useUserDialogDataStore().userDialogRawForAdd).then(() => {
        let userRoleList = useCommonStore().setUserRole(
            useUserDialogDataStore().userDialogRawForAdd.selectedRole,
            useUserDialogDataStore().userDialogRawForAdd.userId
        );
        addBatchRequest(userRoleList).then(
            (res: string) => {
              ElMessage({
                message: res,
                type: 'success',
              })
              useUserDialogDataStore().userDialogVisibleForAdd = false
            }
        )
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
