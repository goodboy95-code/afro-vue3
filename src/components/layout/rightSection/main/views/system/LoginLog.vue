<template>
  <InfoDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24" style="margin-bottom: 20px">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="4" :xs="12">
            <el-input v-model="useLoginLogStore().ipAddress" placeholder="登录IP地址"/>
          </el-col>
          <el-col :span="4" :xs="12">
            <el-input v-model="useLoginLogStore().userName" placeholder="用户名"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-select v-model="useLoginLogStore().statusForSelect" placeholder="操作状态" style="width: 100%">
              <el-option label="正常" value="0"/>
              <el-option label="异常" value="1"/>
            </el-select>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="12" :xs="24">
            <el-date-picker
                v-model="useLoginLogStore().loginTime"
                end-placeholder="结束日期"
                format="YYYY-MM-DD HH:mm:ss"
                range-separator="到"
                start-placeholder="开始日期"
                type="datetimerange"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="useLoginLogStore().loginLogTimeAction"
            />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24" style="text-align: right">
            <el-button type="primary" @click="getLogsByCondition">搜索</el-button>
            <el-button @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-button :disabled="multipleSelection.length===0" plain style="margin-bottom: 10px" type="warning"
                   @click="deleteMultiple">删除
        </el-button>
        <el-button plain style="margin-bottom: 10px" type="warning" @click="deleteAll">清空</el-button>
        <el-button plain style="margin-bottom: 10px" type="info" @click="exportAll">导出</el-button>
        <el-table :data="useLoginLogStore().tableData" style="width: 100%" table-layout="auto"
                  @selection-change="handleSelectionChange">
          <el-table-column fixed="left" label="登录日志ID" prop="loginLogId" width="104"/>
          <el-table-column label="用户账号" prop="userName" width="100"/>
          <el-table-column label="登录IP地址" prop="ipAddress" width="100"/>
          <el-table-column label="登录地点" prop="loginLocation" width="100"/>
          <el-table-column label="浏览器类型" prop="browser" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.browser }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="操作系统" prop="os" width="100"/>
          <el-table-column label="登录状态" prop="status" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.status==='0'" type="success">成功</el-tag>
              <el-tag v-else type="warning">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="提示消息" prop="msg" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.msg }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="访问时间" prop="loginTime" width="100">
            <template #default="scope">
              <el-text truncated>{{ scope.row.loginTime }}</el-text>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="139">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useLoginLogStore().pageNumber+1"
                       :page-count="useLoginLogStore().totalPages"
                       :page-size="useLoginLogStore().pageSize"
                       :pager-count="useLoginLogStore().pagerCount"
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
import {LoginLog, LoginLogCondition} from "/src/axios/api/type/LoginLog.ts";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/loginLog/InfoDialog.vue";
import Utils from "/src/utils/Utils.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {useLoginLogStore} from "/src/pinia/module/loginLog/useLoginLogStore.ts";
import {useLoginLogDialogDataStore} from "/src/pinia/module/loginLog/useLoginLogDialogDataStore.ts";
import {deleteAllRequest, deleteBatchRequest, exportRequest, queryByPageRequest} from "/src/axios/api/loginLogApi.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const multipleSelection = ref<LoginLog[]>([])

queryByPageRequest(
    new LoginLogCondition(0)
).then((res: SpringPage<LoginLog>) => {
  useLoginLogStore().tableData = res.content
  useLoginLogStore().totalPages = res.totalPages
})

const getInfo = (data: LoginLog) => {
  useLoginLogDialogDataStore().loginLogDialogRaw = data
  useLoginLogDialogDataStore().loginLogDialogVisibleForInfo = true
}

const deleteMultiple = (data: LoginLog) => {
  deleteBatchRequest(
      multipleSelection.value.map(item => Number(item.loginLogId))
  ).then((res) => {
    queryByPageRequest(
        new LoginLogCondition(
            useLoginLogStore().pageNumber,
            useLoginLogStore().lastQueryIpAddress,
            useLoginLogStore().lastQueryUserName,
            useLoginLogStore().lastQueryStatusForSelect,
            useLoginLogStore().lastQueryBeginLoginLogTime,
            useLoginLogStore().lastQueryEndLoginLogTime
        )
    ).then(
        (res: SpringPage<LoginLog>) => {
          useLoginLogStore().tableData = res.content
          useLoginLogStore().totalPages = res.totalPages
        }
    )
  })
}

const resetData = () => {
  useLoginLogStore().$reset()
  queryByPageRequest(
      new LoginLogCondition(0)
  ).then((res: SpringPage<LoginLog>) => {
    useLoginLogStore().tableData = res.content
    useLoginLogStore().totalPages = res.totalPages
  })
}

const deleteAll = (data: LoginLog) => {
  ElMessageBox.confirm(
      '确认清空登录日志数据？',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    deleteAllRequest().then((res) => {
      if (res) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        queryByPageRequest(
            new LoginLogCondition(0)
        ).then((res: SpringPage<LoginLog>) => {
          useLoginLogStore().tableData = res.content
          useLoginLogStore().totalPages = res.totalPages
        })
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

const exportAll = (data: LoginLog) => {
  exportRequest()
}

const handleSelectionChange = (data: LoginLog[]) => {
  multipleSelection.value = data
}
//条件获取角色列表
const getLogsByCondition = () => {
  queryByPageRequest(
      new LoginLogCondition(
          0,
          useLoginLogStore().ipAddress,
          useLoginLogStore().userName,
          useLoginLogStore().statusForSelect,
          useLoginLogStore().beginLoginLogTime,
          useLoginLogStore().endLoginLogTime
      )
  ).then(
      (res: SpringPage<LoginLog>) => {
        useLoginLogStore().lastQueryIpAddress = useLoginLogStore().ipAddress
        useLoginLogStore().lastQueryUserName = useLoginLogStore().userName
        useLoginLogStore().lastQueryStatusForSelect = useLoginLogStore().statusForSelect
        useLoginLogStore().lastQueryBeginLoginLogTime = useLoginLogStore().beginLoginLogTime
        useLoginLogStore().lastQueryEndLoginLogTime = useLoginLogStore().endLoginLogTime
        useLoginLogStore().tableData = res.content
        useLoginLogStore().totalPages = res.totalPages
      }
  )
}
const currentChange = (pageNumber: number) => {
  if (!Utils.isEmpty(useLoginLogStore().tableData)) {
    queryByPageRequest(
        new LoginLogCondition(
            pageNumber - 1,
            useLoginLogStore().lastQueryIpAddress,
            useLoginLogStore().lastQueryUserName,
            useLoginLogStore().lastQueryStatusForSelect,
            useLoginLogStore().lastQueryBeginLoginLogTime,
            useLoginLogStore().lastQueryEndLoginLogTime
        )
    ).then(
        (res: SpringPage<LoginLog>) => {
          useLoginLogStore().pageNumber = pageNumber - 1
          useLoginLogStore().tableData = res.content
          useLoginLogStore().totalPages = res.totalPages
        }
    )
  }
}
const currentLogStatus = (pageNumber: number) => {
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

      ::v-deep(.el-date-editor) {
        width: 283px;

        .el-range-input {
          width: 90px;
        }
      }
    }
  }
}

.el-table {
  @include table.tableTheme;
}

.el-pagination {
  @include pagination.paginationTheme;
}
</style>