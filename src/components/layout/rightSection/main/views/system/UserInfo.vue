<template>
  <el-row :gutter="20">
    <el-col :span="useResponsiveLayoutStore().isMobile?24:24">
      <el-card>
        <template #header>
          <div>
            <span>用户信息</span>
          </div>
        </template>
        <UserAvatar></UserAvatar>
        <el-form ref="editLoginUserRef"
                 :inline="true"
                 :model="useUserInfoStore().userInfo.user"
                 :rules="rulesForUser"
                 label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="useUserInfoStore().userInfo.user.userName" clearable placeholder="用户名"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户昵称" prop="nickName">
                <el-input v-model="useUserInfoStore().userInfo.user.nickName" clearable placeholder="用户昵称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色类型">
                <el-tag v-for="role in useUserInfoStore().userInfo.roles">
                  {{ role.roleName }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户性别" prop="sex">
                <el-radio-group v-model="useUserInfoStore().userInfo.user.sex">
                  <el-radio-button label="M" size="large"> 男</el-radio-button>
                  <el-radio-button label="F" size="large"> 女</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model="useUserInfoStore().userInfo.user.phoneNumber" clearable
                          placeholder="手机号码"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="useUserInfoStore().userInfo.user.email" clearable placeholder="邮箱"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="账号创建时间">
                <el-text>{{ useUserInfoStore().userInfo.user.createTime }}</el-text>
              </el-form-item>
            </el-col>
            <el-col v-if="loginUserChanged" :span="24">
              <el-form-item>
                <el-button style="margin-left: 100px" type="primary" @click="editLoginUser(editLoginUserRef)">
                  修改
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import UserAvatar from "/src/components/layout/sidebar/userInfo/userAvatar/UserAvatar.vue";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {rulesForUser} from "/src/components/layout/rightSection/main/views/system/user/userData.ts";
import {ElMessage, FormInstance} from "element-plus";
import {ref, watch} from "vue";
import {cloneDeep, isEqual} from "lodash-es";
import {editUserInfoRequest, getInfoRequest} from "/src/axios/api/userInfoApi.ts";
import {UserInfo} from "/src/axios/api/type/UserInfo.ts";

const editLoginUserRef = ref<FormInstance>()

const beginningLoginUserData = cloneDeep(useUserInfoStore().userInfo.user)

const loginUserChanged = ref(false)

const editLoginUser = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 提交表单
      editUserInfoRequest(useUserInfoStore().userInfo).then(() => {
        ElMessage.success('修改成功')
        getInfoRequest().then((res: UserInfo) => {
          useUserInfoStore().userInfo.user = res.user
        })
      })
    }
  });
}

watch(
    () => useUserInfoStore().userInfo.user,
    (newUser) => {

      // 检查新值是否与原始值相等
      loginUserChanged.value = !isEqual(newUser, beginningLoginUserData);
    },
    {deep: true}
);
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";

.el-card {
  height: 600px;
  @include card.cardTheme;

  &.is-mobile {
    height: 100%;
  }

  .el-col {
    &.is-mobile {
      margin-top: 5px;
    }
  }
}
</style>