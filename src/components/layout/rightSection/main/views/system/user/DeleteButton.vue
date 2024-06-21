<template>
  <el-button link size="small" type="primary" @click="open">删除</el-button>
</template>

<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'

const open = () => {
  ElMessageBox.confirm(
      '确定删除该账号（可找回）',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '已删除',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}
</script>
