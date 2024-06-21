import {defineStore} from 'pinia'
import {OperateLog} from "/src/axios/api/type/OperateLog.ts";

interface UseDialogDataStore {
    // 操作日志信息对话框开关
    operateLogDialogVisibleForInfo: boolean,
    // 操作日志信息编辑对话框开关
    operateLogDialogVisibleForEdit: boolean,
    // 操作日志信息删除对话框开关
    operateLogDialogVisibleForDelete: boolean,
    // 操作日志信息添加对话框开关
    operateLogDialogVisibleForAdd: boolean,
    // 操作日志信息内容
    operateLogDialogRaw: OperateLog
    // 添加操作日志
    operateLogDialogRawForAdd: OperateLog
}

export const useOperateLogDialogDataStore = defineStore('operateLogDialogData', {
    // 其他配置...
    state: (): UseDialogDataStore => {
        return {
            operateLogDialogVisibleForInfo: false,
            operateLogDialogVisibleForEdit: false,
            operateLogDialogVisibleForDelete: false,
            operateLogDialogVisibleForAdd: false,
            operateLogDialogRaw: undefined,
            operateLogDialogRawForAdd: new OperateLog()
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
