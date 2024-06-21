<template>
  <EditDialog/>
  <AddDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-row :gutter="10">
          <el-col :span="9" :xs="12">
            <el-input v-model="useNoticeStore().noticeTitle" placeholder="请输入公告标题"/>
          </el-col>
          <el-col :span="9" :xs="12">
            <el-input v-model="useNoticeStore().createBy" placeholder="请输入创建者"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-select v-model="useNoticeStore().noticeType" clearable placeholder="公告类型">
              <el-option
                  v-for="item in statusForNotice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24" style="text-align: right">
            <el-button type="primary" @click="getNoticesByCondition">搜索</el-button>
            <el-button @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-button style="margin-bottom: 10px" type="primary" @click="addNotice">添加通知或公告</el-button>
        <el-table :data="useNoticeStore().tableData" style="width: 100%" table-layout="auto">
          <el-table-column :width="useResponsiveLayoutStore().isMobile?90:165" fixed="left" label="公告ID"
                           prop="noticeId"/>
          <el-table-column label="公告标题" prop="noticeTitle" width="165"/>
          <el-table-column label="公告类型" prop="noticeType" width="100"/>
          <el-table-column label="公告状态" prop="status" width="159">
            <template #default="prop">
              <el-switch v-model="prop.row.status"
                         active-text="正常" active-value="0"
                         inactive-text="停用"
                         inactive-value="1"
                         @change="currentNoticeStatus"/>
            </template>
          </el-table-column>
          <el-table-column label="创建者" prop="createBy" width="100"/>
          <el-table-column label="创建时间" prop="createTime" width="90">
            <template #default="scope">
              <el-text truncated>{{ scope.row.createTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="更新者" prop="updateBy" width="100"/>
          <el-table-column label="更新时间" prop="updateTime" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.updateTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="139">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="editNotice(scope.row)">编辑</el-button>
              <el-button link size="small" type="primary" @click="deleteNotice(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useNoticeStore().pageNumber+1"
                       :page-count="useNoticeStore().totalPages"
                       :page-size="useNoticeStore().pageSize"
                       :pager-count="useNoticeStore().pagerCount"
                       background
                       layout="prev, pager, next"
                       @current-change="currentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Notice, NoticeCondition} from "/src/axios/api/type/Notice.ts";
import EditDialog from "/src/components/layout/rightSection/main/views/system/notice/EditDialog.vue";
import Utils from "/src/utils/Utils.ts";
import {cloneDeep} from "lodash-es";
import {statusForNotice} from "/src/data/option.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useNoticeStore} from "/src/pinia/module/notice/useNoticeStore.ts";
import {deleteByIdRequest, queryByPageRequest} from "/src/axios/api/noticeApi.ts";
import {useNoticeDialogDataStore} from "/src/pinia/module/notice/useNoticeDialogDataStore.ts";
import AddDialog from "/src/components/layout/rightSection/main/views/system/notice/AddDialog.vue";
import {ElMessage} from "element-plus";

queryByPageRequest(
    new NoticeCondition(
        0
    )
).then((res: SpringPage<Notice>) => {
  useNoticeStore().tableData = res.content
  useNoticeStore().totalPages = res.totalPages
})

const addNotice = () => {
  useNoticeDialogDataStore().noticeDialogVisibleForAdd = true
}

const deleteNotice = (data: Notice) => {
  deleteByIdRequest(data.noticeId).then((res: number) => {
    if (res > 0) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    }
  })
}
const editNotice = (data: Notice) => {
  useNoticeDialogDataStore().noticeDialogRaw = cloneDeep(data)
  useNoticeDialogDataStore().noticeDialogVisibleForEdit = true
}

const resetData = () => {
  useNoticeStore().$reset()
  queryByPageRequest(
      new NoticeCondition(0)
  ).then((res: SpringPage<Notice>) => {
    useNoticeStore().tableData = res.content
    useNoticeStore().totalPages = res.totalPages
  })
}

//条件获取角色列表
const getNoticesByCondition = () => {
  queryByPageRequest(
      new NoticeCondition(
          0,
          useNoticeStore().noticeTitle,
          useNoticeStore().statusForSelect,
          useNoticeStore().createBy,
          useNoticeStore().noticeType
      )
  ).then(
      (res: SpringPage<Notice>) => {
        useNoticeStore().lastQueryNoticeTitle = useNoticeStore().noticeTitle
        useNoticeStore().lastQueryStatusForSelect = useNoticeStore().statusForSelect
        useNoticeStore().lastQueryCreateBy = useNoticeStore().createBy
        useNoticeStore().lastQueryNoticeType = useNoticeStore().noticeType

        useNoticeStore().tableData = res.content
        useNoticeStore().totalPages = res.totalPages
      }
  )
}
const currentChange = (pageNumber: number) => {
  if (!Utils.isEmpty(useNoticeStore().tableData)) {
    queryByPageRequest(
        new NoticeCondition(
            pageNumber - 1,
            useNoticeStore().lastQueryNoticeTitle,
            useNoticeStore().lastQueryStatusForSelect,
            useNoticeStore().lastQueryCreateBy,
            useNoticeStore().lastQueryNoticeType
        )
    ).then(
        (res: SpringPage<Notice>) => {
          useNoticeStore().pageNumber = pageNumber - 1
          useNoticeStore().tableData = res.content
          useNoticeStore().totalPages = res.totalPages
        }
    )
  }
}
const currentNoticeStatus = (pageNumber: number) => {
  console.log(pageNumber)
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/scss/card";
@use "/src/assets/styles/scss/table";
@use "/src/assets/styles/scss/pagination";

.el-card {
  .el-col {
    &.is-mobile {
      margin-top: 5px;
    }
  }

  .el-table {
    @include table.tableTheme;
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>