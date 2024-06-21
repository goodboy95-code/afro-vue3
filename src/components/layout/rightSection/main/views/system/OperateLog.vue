<template>
  <InfoDialog/>
  <el-row :gutter="20" style="height: 100%">
    <el-col :span="24" style="margin-bottom: 20px">
      <el-card shadow="never">
        <el-row :gutter="10">
          <el-col :span="4" :xs="12">
            <el-input v-model="useOperateLogStore().ipAddress" placeholder="操作地址"/>
          </el-col>
          <el-col :span="4" :xs="12">
            <el-input v-model="useOperateLogStore().title" placeholder="系统模块"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-input v-model="useOperateLogStore().operator" placeholder="操作人员"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-input v-model="useOperateLogStore().operateType" placeholder="操作类型"/>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="4" :xs="12">
            <el-select v-model="useOperateLogStore().statusForSelect" placeholder="操作状态" style="width: 100%">
              <el-option label="正常" value="0"/>
              <el-option label="异常" value="1"/>
            </el-select>
          </el-col>
          <el-col :class="{'is-mobile':useResponsiveLayoutStore().isMobile}" :span="8" :xs="24"
                  style="margin-top: 10px">
            <el-date-picker
                v-model="useOperateLogStore().operateTime"
                end-placeholder="结束日期"
                format="YYYY-MM-DD HH:mm:ss"
                range-separator="到"
                start-placeholder="开始日期"
                type="datetimerange"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="useOperateLogStore().operateTimeAction"
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
        <el-table :data="useOperateLogStore().tableData" style="width: 100%" table-layout="auto"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column fixed="left" label="日志ID" prop="operateLogId"/>
          <el-table-column label="系统模块" min-width="165" prop="title"/>
          <el-table-column label="操作类型" min-width="100" prop="operateType">
            <template #default="scope">
              <el-tag v-if="scope.row.operateType==='0'" type="success">其它</el-tag>
              <el-tag v-if="scope.row.operateType==='1'" type="success">新增</el-tag>
              <el-tag v-if="scope.row.operateType==='2'" type="success">删除</el-tag>
              <el-tag v-if="scope.row.operateType==='3'" type="success">修改</el-tag>
              <el-tag v-if="scope.row.operateType==='4'" type="success">查询</el-tag>
              <el-tag v-if="scope.row.operateType==='5'" type="success">退出</el-tag>
              <el-tag v-if="scope.row.operateType==='6'" type="success">导出</el-tag>
              <el-tag v-if="scope.row.operateType==='7'" type="success">导入</el-tag>
              <el-tag v-if="scope.row.operateType==='8'" type="success">强退</el-tag>
              <el-tag v-if="scope.row.operateType==='9'" type="success">清空</el-tag>
              <el-tag v-if="scope.row.operateType==='10'" type="success">生成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作人员" min-width="100" prop="operator"/>
          <el-table-column label="操作地址" min-width="100" prop="ipAddress"/>
          <el-table-column label="操作地点" min-width="100" prop="operateLocation"/>
          <el-table-column label="操作状态" min-width="100" prop="status">
            <template #default="scope">
              <el-tag v-if="scope.row.status==='0'" type="success">正常</el-tag>
              <el-tag v-else type="danger">异常</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作日期" min-width="100" prop="operateTime"/>
          <el-table-column label="消耗时间" min-width="100" prop="costTime"/>
          <el-table-column fixed="right" label="操作" min-width="139">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="getInfo(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="useOperateLogStore().pageNumber+1"
                       :page-count="useOperateLogStore().totalPages"
                       :page-size="useOperateLogStore().pageSize"
                       :pager-count="useOperateLogStore().pagerCount"
                       background
                       layout="prev, pager, next"
                       @current-change="currentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {deleteAllRequest, deleteBatchRequest, exportRequest, queryByPageRequest} from "/src/axios/api/operateLogApi.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {OperateLog, OperateLogCondition} from "/src/axios/api/type/OperateLog.ts";
import {useOperateLogDialogDataStore} from "/src/pinia/module/operatelog/useOperateLogDialogDataStore.ts";
import InfoDialog from "/src/components/layout/rightSection/main/views/system/operateLog/InfoDialog.vue";
import {useOperateLogStore} from "/src/pinia/module/operatelog/useOperateLogStore.ts";
import Utils from "/src/utils/Utils.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const multipleSelection = ref<OperateLog[]>([])

queryByPageRequest(
    new OperateLogCondition(0)
).then((res: SpringPage<OperateLog>) => {
  useOperateLogStore().tableData = res.content
  useOperateLogStore().totalPages = res.totalPages
})

const getInfo = (data: OperateLog) => {
  useOperateLogDialogDataStore().operateLogDialogRaw = data
  useOperateLogDialogDataStore().operateLogDialogVisibleForInfo = true
}

const deleteMultiple = (data: OperateLog) => {
  deleteBatchRequest(
      multipleSelection.value.map(item => Number(item.operateLogId))
  ).then((res) => {
    queryByPageRequest(
        new OperateLogCondition(
            useOperateLogStore().pageNumber,
            useOperateLogStore().lastQueryIpAddress,
            useOperateLogStore().lastQueryTitle,
            useOperateLogStore().lastQueryOperator,
            useOperateLogStore().lastQueryOperateType,
            useOperateLogStore().lastQueryStatusForSelect,
            useOperateLogStore().lastQueryBeginOperateTime,
            useOperateLogStore().lastQueryEndOperateTime
        )
    ).then(
        (res: SpringPage<OperateLog>) => {
          useOperateLogStore().tableData = res.content
          useOperateLogStore().totalPages = res.totalPages
        }
    )
  })
}

const resetData = () => {
  useOperateLogStore().$reset()
  queryByPageRequest(
      new OperateLogCondition(0)
  ).then((res: SpringPage<OperateLog>) => {

    useOperateLogStore().tableData = res.content
    useOperateLogStore().totalPages = res.totalPages
  })
}

const deleteAll = (data: OperateLog) => {
  ElMessageBox.confirm(
      '确认清空操作日志数据？',
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
            new OperateLogCondition(0)
        ).then((res: SpringPage<OperateLog>) => {
          useOperateLogStore().tableData = res.content
          useOperateLogStore().totalPages = res.totalPages
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

const exportAll = (data: OperateLog) => {
  exportRequest()
}

const handleSelectionChange = (data: OperateLog[]) => {
  console.log(data)
  multipleSelection.value = data
  console.log(multipleSelection.value.length)
  console.log(!multipleSelection.value)
}
//条件获取角色列表
const getLogsByCondition = () => {
  queryByPageRequest(
      new OperateLogCondition(
          0,
          useOperateLogStore().ipAddress,
          useOperateLogStore().title,
          useOperateLogStore().operator,
          useOperateLogStore().operateType,
          useOperateLogStore().statusForSelect,
          useOperateLogStore().beginOperateTime,
          useOperateLogStore().endOperateTime
      )
  ).then(
      (res: SpringPage<OperateLog>) => {
        useOperateLogStore().lastQueryIpAddress = useOperateLogStore().ipAddress
        useOperateLogStore().lastQueryTitle = useOperateLogStore().title
        useOperateLogStore().lastQueryOperator = useOperateLogStore().operator
        useOperateLogStore().lastQueryOperateType = useOperateLogStore().operateType
        useOperateLogStore().lastQueryStatusForSelect = useOperateLogStore().statusForSelect
        useOperateLogStore().lastQueryBeginOperateTime = useOperateLogStore().beginOperateTime
        useOperateLogStore().lastQueryEndOperateTime = useOperateLogStore().endOperateTime
        useOperateLogStore().tableData = res.content
        useOperateLogStore().totalPages = res.totalPages
      }
  )
}
const currentChange = (pageNumber: number) => {
  if (!Utils.isEmpty(useOperateLogStore().tableData)) {
    queryByPageRequest(
        new OperateLogCondition(
            pageNumber - 1,
            useOperateLogStore().lastQueryIpAddress,
            useOperateLogStore().lastQueryTitle,
            useOperateLogStore().lastQueryOperator,
            useOperateLogStore().lastQueryOperateType,
            useOperateLogStore().lastQueryStatusForSelect,
            useOperateLogStore().lastQueryBeginOperateTime,
            useOperateLogStore().lastQueryEndOperateTime
        )
    ).then(
        (res: SpringPage<OperateLog>) => {
          useOperateLogStore().pageNumber = pageNumber - 1
          useOperateLogStore().tableData = res.content
          useOperateLogStore().totalPages = res.totalPages
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

  .el-table {
    @include table.tableTheme;
  }

  .el-pagination {
    @include pagination.paginationTheme;
  }
}
</style>