<template>
  <div class="user-info-style">
    <el-avatar :size="80" :src="useUserInfoStore().avatarImage" @click="handleAvatarClick">
      {{ useUserInfoStore().avatarImage }}
    </el-avatar>
    <span
        style="margin-top: 5px;margin-bottom: 5px;font-family: AlibabaPuHuiTi-3-55-RegularL3,serif">{{
        useUserInfoStore().userInfo.user.userName
      }}</span>
    <el-dropdown trigger="click" @visible-change="handleIcon">
      <el-button style="font-family: AlimamaShuHeiTi-Bold,serif" type="primary">
        {{
          useRoleStore().selectedRole.roleName
        }}
        <el-icon class="el-icon--right">
          <arrow-down v-if="isDownIcon"/>
          <arrow-up v-else/>
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="role in  useUserInfoStore().userInfo.roles"
              :key="role.roleName"
              :disabled="isEqual(role.roleName,useRoleStore().selectedRole.roleName)"
              @click="selectRole(role)"
          >
            {{ role.roleName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {ArrowDown, ArrowUp} from "@element-plus/icons-vue";
import {ref, watch} from "vue";
import {useRouteStore} from "/src/pinia/module/useRouteStore.ts";
import {ElMessage} from "element-plus";
import {queryNavigationsRequest} from "/src/axios/api/userRoleMenuApi.ts";
import router from "/src/router";
import {Role} from "/src/axios/api/type/Role.ts";
import {useRoleStore} from "/src/pinia/module/role/useRoleStore.ts";
import {useUserInfoStore} from "/src/pinia/module/userInfo/useUserInfoStore.ts";
import {setItem} from "/src/utils/LocalStorage.ts";
import {isEqual} from "lodash-es";

const isDownIcon = ref(true)

const selectRole = (role: Role) => {
  useRoleStore().selectedRole = role;
  setItem('selectedRole', JSON.stringify(role, ['roleId', 'roleName']));
}

//图标变化
const handleIcon = () => {
  isDownIcon.value = !isDownIcon.value
}

const handleAvatarClick = () => {
  router.push({path: '/userInfo'});
}

watch(() => useRoleStore().selectedRole, () => {
  useRouteStore().generateRoutes(useRoleStore().selectedRole.roleId).then(() => {
    queryNavigationsRequest(useRoleStore().selectedRole.roleId).then((res) => {
      useRouteStore().navigations = res
    })
    router.push({path: '/workbench/analyse'})
  }).catch(() => {
    ElMessage({
      message: '生成路由错误',
      type: 'error',
    })
  })
}, {
  deep: true
})
</script>

<style lang="scss" scoped>
.user-info-style {
  width: 240px;
  height: 200px;
  background-color: var(--el-bg-color-page);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>