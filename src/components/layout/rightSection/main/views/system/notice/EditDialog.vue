<template>
  <el-dialog
      v-model="useNoticeDialogDataStore().noticeDialogVisibleForEdit"
      :before-close="handleClose"
      :width="useResponsiveLayoutStore().isMobile?'90%':'60%'"
      class="dialog-edit"
      title="修改通知信息"
  >
    <el-form ref="editNoticeRef"
             :inline="true"
             :model="useNoticeDialogDataStore().noticeDialogRaw"
             :rules="rulesForNotice"
             label-width="100px">
      <el-row>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="标题" prop="noticeTitle" style="width: 100%">
            <el-input v-model="useNoticeDialogDataStore().noticeDialogRaw.noticeTitle" clearable placeholder="标题"/>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="通知类型" prop="noticeType">
            <el-radio-group v-model="useNoticeDialogDataStore().noticeDialogRaw.noticeType" class="ml-4">
              <el-radio label="0" size="large"> 通知</el-radio>
              <el-radio label="1" size="large"> 公告</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="useNoticeDialogDataStore().noticeDialogRaw.status" class="ml-4">
              <el-radio label="0" size="large"> 正常</el-radio>
              <el-radio label="1" size="large"> 停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="useResponsiveLayoutStore().isMobile?24:24">
          <el-form-item label="通知内容" prop="noticeContent" style="width: 100%">
            <el-input v-model="useNoticeDialogDataStore().noticeDialogRaw.noticeContent"
                      clearable placeholder="通知内容" type="textarea"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark" style="width: 100%">
            <el-input
                v-model="useNoticeDialogDataStore().noticeDialogRaw.remark"
                :rows="3"
                placeholder="Please input"
                type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useNoticeDialogDataStore().noticeDialogVisibleForEdit = false">取消</el-button>
        <el-button type="primary" @click="editNoticeForm(editNoticeRef)">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useNoticeDialogDataStore} from "/src/pinia/module/notice/useNoticeDialogDataStore.ts";
import {editRequest, queryByPageRequest} from "/src/axios/api/noticeApi.ts";
import {ElMessage, FormInstance} from "element-plus";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Notice, NoticeCondition} from "/src/axios/api/type/Notice.ts";
import {useNoticeStore} from "/src/pinia/module/notice/useNoticeStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {rulesForNotice} from "/src/components/layout/rightSection/main/views/system/notice/noticeData.ts";
import {ref} from "vue";

const handleClose = (done: () => void) => {
  done()
}

const editNoticeRef = ref<FormInstance>()

const editNoticeForm = (formEl: FormInstance | undefined) => {
  formEl.validate(async (valid) => {
    if (valid) {
      await editRequest(useNoticeDialogDataStore().noticeDialogRaw).then(
          () => {
            ElMessage({
              message: '修改通知信息成功',
              type: 'success',
            })
          },
      )
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
      useNoticeDialogDataStore().noticeDialogVisibleForEdit = false
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
