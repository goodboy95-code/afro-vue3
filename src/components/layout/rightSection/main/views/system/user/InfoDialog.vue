<template>
  <el-dialog
      v-model="useUserDialogDataStore().userDialogVisibleForInfo"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="详情"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="用户ID">{{ useUserDialogDataStore().userDialogRaw.userId }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ useUserDialogDataStore().userDialogRaw.userName }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ useUserDialogDataStore().userDialogRaw.nickName }}</el-descriptions-item>
      <el-descriptions-item label="电子邮件">{{ useUserDialogDataStore().userDialogRaw.email }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ useUserDialogDataStore().userDialogRaw.phoneNumber }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ useUserDialogDataStore().userDialogRaw.age }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ useUserDialogDataStore().userDialogRaw.sex }}</el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar :size="50" :src="useUserDialogDataStore().userDialogRaw.avatar" />
      </el-descriptions-item>
      <el-descriptions-item label="账号状态">{{ useUserDialogDataStore().userDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="删除标志">{{ useUserDialogDataStore().userDialogRaw.delFlag }}</el-descriptions-item>
      <el-descriptions-item label="登录IP">{{ useUserDialogDataStore().userDialogRaw.loginIp }}</el-descriptions-item>
      <el-descriptions-item label="最后登录日期">{{
          useUserDialogDataStore().userDialogRaw.loginDate
        }}
      </el-descriptions-item>
      <el-descriptions-item label="创建者">{{ useUserDialogDataStore().userDialogRaw.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{
          useUserDialogDataStore().userDialogRaw.createTime
        }}
      </el-descriptions-item>
      <el-descriptions-item label="更新者">{{ useUserDialogDataStore().userDialogRaw.updateBy }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{
          useUserDialogDataStore().userDialogRaw.updateTime
        }}
      </el-descriptions-item>
      <el-descriptions-item label="备注">{{ useUserDialogDataStore().userDialogRaw.remark }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useUserDialogDataStore} from "/src/pinia/module/user/useUserDialogDataStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  ::v-deep(.el-descriptions__body) {
    .el-descriptions__label{
      &.el-descriptions__cell{
        &.is-bordered-label{
          width: 110px;
        }
      }
    }
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
