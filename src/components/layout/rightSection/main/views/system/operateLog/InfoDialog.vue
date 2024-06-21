<template>
  <el-dialog
      v-model="useOperateLogDialogDataStore().operateLogDialogVisibleForInfo"
      :before-close="handleClose"
      title="详情"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
  >
    <el-descriptions
        :column="useResponsiveLayoutStore().isMobile?1:3"
        border
    >
      <el-descriptions-item label="日志ID">{{ useOperateLogDialogDataStore().operateLogDialogRaw.operateLogId }}</el-descriptions-item>
      <el-descriptions-item label="系统模块">{{ useOperateLogDialogDataStore().operateLogDialogRaw.title }}</el-descriptions-item>
      <el-descriptions-item label="操作类型">{{ useOperateLogDialogDataStore().operateLogDialogRaw.operateType }}</el-descriptions-item>
      <el-descriptions-item label="操作人员">{{ useOperateLogDialogDataStore().operateLogDialogRaw.operator }}</el-descriptions-item>
      <el-descriptions-item label="操作地址">{{ useOperateLogDialogDataStore().operateLogDialogRaw.ipAddress }}</el-descriptions-item>
      <el-descriptions-item label="操作地点">{{ useOperateLogDialogDataStore().operateLogDialogRaw.operateLocation }}</el-descriptions-item>
      <el-descriptions-item label="操作状态">{{ useOperateLogDialogDataStore().operateLogDialogRaw.status }}</el-descriptions-item>
      <el-descriptions-item label="操作日期">{{ useOperateLogDialogDataStore().operateLogDialogRaw.operateTime }}</el-descriptions-item>
      <el-descriptions-item label="消耗时间">{{ useOperateLogDialogDataStore().operateLogDialogRaw.costTime }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useOperateLogDialogDataStore} from "/src/pinia/module/operatelog/useOperateLogDialogDataStore.ts";

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
