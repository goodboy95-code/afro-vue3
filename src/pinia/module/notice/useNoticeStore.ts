import {defineStore} from 'pinia'
import {Notice} from "/src/axios/api/type/Notice.ts";

interface UseNoticeStore {
    // 通知标题
    noticeTitle: string,
    //通知状态（0 正常）（1 停用）
    statusForSelect: string,
    // 通知类型（0 通知）（1 公告）
    noticeType?: string;
    // 创建者
    createBy?: string;

    // 最后一次查询的通知标题
    lastQueryNoticeTitle: string,
    //  最后一次查询的通知状态
    lastQueryStatusForSelect: string,
    // 最后一次查询的通知类型
    lastQueryNoticeType: string,
    // 最后一次查询的创建者
    lastQueryCreateBy: string,

    //  表格数据
    tableData: Notice[],

    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  当前页码
    pageNumber: number,
    //  每一页最大条数
    pageSize: number,
}

export const useNoticeStore = defineStore('notice', {
    // 其他配置...
    state: (): UseNoticeStore => {
        return {
            noticeTitle: '',
            statusForSelect: '',
            noticeType: '',
            createBy: '',

            lastQueryNoticeTitle: '',
            lastQueryStatusForSelect: '',
            lastQueryNoticeType: '',
            lastQueryCreateBy: '',

            tableData: [],

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,
        }
    },
    getters: {},
    actions: {}
})
