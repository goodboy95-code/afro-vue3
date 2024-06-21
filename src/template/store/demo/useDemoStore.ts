import {defineStore} from 'pinia'
import {Notice} from "/src/axios/api/type/Notice.ts";

interface UseDemoStore {
    // 查询条件

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

export const useDemoStore = defineStore('demo', {
    // 其他配置...
    state: (): UseDemoStore => {
        return {

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
