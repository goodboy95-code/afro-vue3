<template>
  <el-dialog
      v-model="useLoginLogDialogDataStore().loginLogDialogVisibleForInfo"
      :before-close="handleClose"
      title="详情"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="登录日志ID">{{ useLoginLogDialogDataStore().loginLogDialogRaw.loginLogId }}</el-descriptions-item>
      <el-descriptions-item label="用户账号">{{ useLoginLogDialogDataStore().loginLogDialogRaw.userName }}</el-descriptions-item>
      <el-descriptions-item label="登录IP">{{ useLoginLogDialogDataStore().loginLogDialogRaw.ipAddress }}</el-descriptions-item>
      <el-descriptions-item label="登录地点">{{ useLoginLogDialogDataStore().loginLogDialogRaw.loginLocation }}</el-descriptions-item>
      <el-descriptions-item label="浏览器类型">{{ useLoginLogDialogDataStore().loginLogDialogRaw.browser }}</el-descriptions-item>
      <el-descriptions-item label="操作系统">{{ useLoginLogDialogDataStore().loginLogDialogRaw.os }}</el-descriptions-item>
      <el-descriptions-item label="登录状态">{{ useLoginLogDialogDataStore().loginLogDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="提示消息">{{ useLoginLogDialogDataStore().loginLogDialogRaw.msg }}</el-descriptions-item>
      <el-descriptions-item label="最后登录时间">{{ useLoginLogDialogDataStore().loginLogDialogRaw.loginTime }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useLoginLogDialogDataStore} from "/src/pinia/module/loginLog/useLoginLogDialogDataStore.ts";

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
