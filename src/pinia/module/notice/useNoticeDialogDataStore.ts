import {defineStore} from 'pinia'
import {Notice} from "/src/axios/api/type/Notice.ts";

interface NoticeDialogDataStore {
    // 案例信息对话框开关
    noticeDialogVisibleForInfo: boolean,
    // 案例信息编辑对话框开关
    noticeDialogVisibleForEdit: boolean,
    // 案例信息删除对话框开关
    noticeDialogVisibleForDelete: boolean,
    // 案例信息添加对话框开关
    noticeDialogVisibleForAdd: boolean,
    // 案例信息内容
    noticeDialogRaw: Notice
    // 添加案例
    noticeDialogRawForAdd: Notice
}

export const useNoticeDialogDataStore = defineStore('noticeDialogData', {
    // 其他配置...
    state: (): NoticeDialogDataStore => {
        return {
            noticeDialogVisibleForInfo: false,
            noticeDialogVisibleForEdit: false,
            noticeDialogVisibleForDelete: false,
            noticeDialogVisibleForAdd: false,
            noticeDialogRaw: undefined,
            noticeDialogRawForAdd: new Notice()
        }
    },
    getters: {},
    actions: {
        // 生成路由
    }
})
