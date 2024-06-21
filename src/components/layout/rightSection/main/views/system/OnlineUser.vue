<template>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24">
      <el-card shadow="never" >
        <el-row :gutter="10">
          <el-col :span="9">
            <el-input v-model="useOnlineUserStore().ipAddress" placeholder="请输入ip地址"/>
          </el-col>
          <el-col :span="4">
            <el-input v-model="useOnlineUserStore().userName" placeholder="请输入用户名"/>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getOnlineUsersByCondition">确定</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never" >
        <el-table :data="useOnlineUserStore().tableData" border stripe="stripe" style="width: 100%" table-layout="auto">
          <el-table-column label="用户名称" min-width="120" prop="userName"/>
          <el-table-column label="部门名称" min-width="120" prop="departmentName"/>
          <el-table-column label="登录IP地址" min-width="120" prop="ipAddress"/>
          <el-table-column label="登录地址" min-width="120" prop="loginLocation"/>
          <el-table-column label="浏览器类型" min-width="120" prop="browserType"/>
          <el-table-column label="操作系统" min-width="120" prop="operatingSystem"/>
          <el-table-column label="登录时间" min-width="120" prop="loginTime"/>

          <el-table-column fixed="right" label="操作" width="139">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="forcedRetreat(scope.row)">强退</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {Role} from "/src/axios/api/type/Role.ts";
import {useRoleDialogDataStore} from "/src/pinia/module/role/useRoleDialogDataStore.ts";
import {queryByConditionRequest} from "/src/axios/api/onlineUserApi.ts";
import {OnlineUser, OnlineUserCondition} from "/src/axios/api/type/OnlineUser.ts";
import {useOnlineUserStore} from "/src/pinia/module/useOnlineUserStore.ts";

queryByConditionRequest(
    new OnlineUserCondition(
        useOnlineUserStore().ipAddress,
        useOnlineUserStore().userName,
    )
).then((res: OnlineUser[]) => {
  useOnlineUserStore().tableData = res
})

const forcedRetreat = (data: Role) => {
  useRoleDialogDataStore().roleDialogRaw = data
  useRoleDialogDataStore().roleDialogVisibleForInfo = true
}

//条件获取登录用户列表
const getOnlineUsersByCondition = () => {
  queryByConditionRequest(
      new OnlineUserCondition(
          useOnlineUserStore().ipAddress,
          useOnlineUserStore().userName,
      )
  ).then(
      (res: OnlineUser[]) => {
        useOnlineUserStore().lastQueryUserName = useOnlineUserStore().userName
        useOnlineUserStore().lastQueryIpAddress = useOnlineUserStore().ipAddress
        useOnlineUserStore().tableData = res
      }
  )
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";
@use "/src/assets/styles/scss/table";
@use "/src/assets/styles/scss/pagination";

.el-card {
  @include card.cardTheme;

  .el-table {
    @include table.tableTheme;
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>