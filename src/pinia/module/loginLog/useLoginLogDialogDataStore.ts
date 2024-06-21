import {defineStore} from 'pinia'
import {LoginLog} from "/src/axios/api/type/LoginLog.ts";

interface LoginLogDialogDataStore {
    // 案例信息对话框开关
    loginLogDialogVisibleForInfo: boolean,
    // 案例信息编辑对话框开关
    loginLogDialogVisibleForEdit: boolean,
    // 案例信息删除对话框开关
    loginLogDialogVisibleForDelete: boolean,
    // 案例信息添加对话框开关
    loginLogDialogVisibleForAdd: boolean,
    // 案例信息内容
    loginLogDialogRaw: LoginLog
    // 添加案例
    loginLogDialogRawForAdd: LoginLog
}

export const useLoginLogDialogDataStore = defineStore('loginLogDialogData', {
    // 其他配置...
    state: (): LoginLogDialogDataStore => {
        return {
            loginLogDialogVisibleForInfo: false,
            loginLogDialogVisibleForEdit: false,
            loginLogDialogVisibleForDelete: false,
            loginLogDialogVisibleForAdd: false,
            loginLogDialogRaw: undefined,
            loginLogDialogRawForAdd: new LoginLog()
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
