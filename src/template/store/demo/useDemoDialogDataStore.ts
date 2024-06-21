import {defineStore} from 'pinia'
import {Role} from "/src/axios/api/type/Role.ts";

interface DemoDialogDataStore {
    // 案例信息对话框开关
    demoDialogVisibleForInfo: boolean,
    // 案例信息编辑对话框开关
    demoDialogVisibleForEdit: boolean,
    // 案例信息删除对话框开关
    demoDialogVisibleForDelete: boolean,
    // 案例信息添加对话框开关
    demoDialogVisibleForAdd: boolean,
    // 案例信息内容
    demoDialogRaw: Role
    // 添加案例
    demoDialogRawForAdd: Role
}

export const useDemoDialogDataStore = defineStore('demoDialogData', {
    // 其他配置...
    state: (): DemoDialogDataStore => {
        return {
            demoDialogVisibleForInfo: false,
            demoDialogVisibleForEdit: false,
            demoDialogVisibleForDelete: false,
            demoDialogVisibleForAdd: false,
            demoDialogRaw: undefined,
            demoDialogRawForAdd: new Role()
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
