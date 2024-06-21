<template>
  <el-dialog
      v-model="useUserDialogDataStore().userDialogVisibleForEdit"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      class="dialog-edit"
      title="修改用户信息"
  >
    <el-form ref="editUserRef"
             :inline="true"
             :model="useUserDialogDataStore().userDialogRaw"
             :rules="rulesForUser"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="useUserDialogDataStore().userDialogRaw.nickName" clearable placeholder="用户昵称"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户性别" prop="sex">
            <el-radio-group v-model="useUserDialogDataStore().userDialogRaw.sex">
              <el-radio-button label="M" size="large"> 男</el-radio-button>
              <el-radio-button label="F" size="large"> 女</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="用户状态" prop="status">
            <el-radio-group v-model="useUserDialogDataStore().userDialogRaw.status">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="useUserDialogDataStore().userDialogRaw.phoneNumber" clearable placeholder="手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="useUserDialogDataStore().userDialogRaw.email" clearable placeholder="邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="角色">
            <el-select
                v-model="useRoleStore().selectedRoleIds"
                clearable
                multiple
                placeholder="选择角色"
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
        <el-col :span="24">
          <el-form-item label="备注" style="width: 100%">
            <el-input
                v-model="useUserDialogDataStore().userDialogRaw.remark"
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
        <el-button @click="useUserDialogDataStore().userDialogVisibleForEdit = false">取消</el-button>
        <el-button type="primary" @click="editUser(editUserRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useUserDialogDataStore} from "/src/pinia/module/user/useUserDialogDataStore.ts";
import {editRequest, queryByDepartmentIdRequest} from "/src/axios/api/userApi.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {insertOrDeleteUserRoleRequest} from "/src/axios/api/userRoleApi.ts";
import {ElMessage, FormInstance} from "element-plus";
import {User, UsersCondition} from "/src/axios/api/type/User.ts";
import {useUserStore} from "/src/pinia/module/user/useUserStore.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {rulesForUser} from "/src/components/layout/rightSection/main/views/system/user/userData.ts";
import {useCommonStore} from "/src/pinia/module/useCommonStore.ts";

//用户点击✖️按钮或者对话框的遮罩区域时被调用
const handleClose = (done: () => void) => {
  done()
}

const editUserRef = ref<FormInstance>()

//更新修改后的用户信息
const editUser = (formEl: FormInstance | undefined) => {
  formEl.validate(async (valid) => {
    if (valid) {
      await editRequest(useUserDialogDataStore().userDialogRaw).then(
          () => {
            ElMessage({
              message: '修改用户信息成功',
              type: 'success',
            })
          }
      )
      let userRoleList = useCommonStore().setUserRole(
          useRoleStore().selectedRoleIds,
          useUserDialogDataStore().userDialogRaw.userId
      );

      insertOrDeleteUserRoleRequest(userRoleList).then((res) => {
        ElMessage({
          message: res,
          type: "success"
        });
      })

      queryByDepartmentIdRequest(
          new UsersCondition(
              useUserStore().departmentId,
              useUserStore().pageNumber,
              useUserStore().lastQueryUserName,
              useUserStore().lastQueryStatusForSelect,
              useUserStore().lastQueryPhoneNumber,
          )
      ).then(
          (res: SpringPage<User>) => {
            useUserStore().tableData = res.content
            useUserStore().totalPages = res.totalPages
          }
      )
      useUserDialogDataStore().userDialogVisibleForEdit = false
    }
  })
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
