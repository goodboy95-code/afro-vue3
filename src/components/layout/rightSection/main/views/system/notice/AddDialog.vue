<template>
  <el-dialog
      v-model="useNoticeDialogDataStore().noticeDialogVisibleForAdd"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      title="添加通知"
  >
    <el-form ref="addNoticeRef"
             :inline="true"
             :model="useNoticeDialogDataStore().noticeDialogRawForAdd"
             :rules="rulesForNotice"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="标题" prop="noticeTitle" style="width: 100%">
            <el-input v-model="useNoticeDialogDataStore().noticeDialogRawForAdd.noticeTitle" clearable
                      placeholder="标题"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="通知类型" prop="noticeType">
            <el-radio-group v-model="useNoticeDialogDataStore().noticeDialogRawForAdd.noticeType" class="ml-4">
              <el-radio label="0" size="large" value="0"> 通知</el-radio>
              <el-radio label="1" size="large" value="1"> 公告</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:24">
          <el-form-item label="通知内容" prop="noticeContent" style="width: 100%">
            <el-input v-model="useNoticeDialogDataStore().noticeDialogRawForAdd.noticeContent"
                      clearable placeholder="通知内容" type="textarea"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="useNoticeDialogDataStore().noticeDialogRawForAdd.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useNoticeDialogDataStore().noticeDialogRawForAdd.remark"
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
        <el-button @click="useNoticeDialogDataStore().noticeDialogVisibleForAdd = false">取消</el-button>
        <el-button type="primary" @click="addNoticeForm(addNoticeRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {addRequest, queryByPageRequest} from "/src/axios/api/noticeApi.ts";
import {Notice, NoticeCondition} from "/src/axios/api/type/Notice.ts";
import {isEmpty, isEqual} from "lodash-es";
import {useNoticeDialogDataStore} from "/src/pinia/module/notice/useNoticeDialogDataStore.ts";
import {rulesForNotice} from "/src/components/layout/rightSection/main/views/system/notice/noticeData.ts";
import {useNoticeStore} from "/src/pinia/module/notice/useNoticeStore.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";

const handleClose = (done: () => void) => {
  done()
}

const addNoticeRef = ref<FormInstance>()

const addNoticeForm = (formEl: FormInstance | undefined) => {
  formEl.validate(async (valid) => {
    if (valid) {
      await addRequest(useNoticeDialogDataStore().noticeDialogRawForAdd).then((res: number) => {
        if (isEqual(res, 1)) {
          ElMessage({
            message: '添加用户通知成功',
            type: 'success',
          })
          useNoticeDialogDataStore().noticeDialogVisibleForAdd = false
        }
      })
      await queryByPageRequest(
          new NoticeCondition(
              useNoticeStore().pageNumber,
              useNoticeStore().lastQueryNoticeTitle,
              useNoticeStore().lastQueryStatusForSelect,
          )
      ).then(
          (res: SpringPage<Notice>) => {
            useNoticeStore().tableData = res.content
            useNoticeStore().totalPages = res.totalPages
          }
      )
    }
  })
}
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
