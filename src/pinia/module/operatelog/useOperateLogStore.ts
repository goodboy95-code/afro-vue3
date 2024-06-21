import {defineStore} from 'pinia'
import {OperateLog} from "/src/axios/api/type/OperateLog.ts";

interface UseOperateLogStore {
    // 定义状态
    ipAddress: string;
    title: string;
    operator: string;
    operateType: string;
    operateTime: string[];
    beginOperateTime: string;
    endOperateTime: string;
    statusForSelect: string;

    lastQueryIpAddress: string;
    lastQueryTitle: string,
    lastQueryOperator: string,
    lastQueryOperateType: string,
    lastQueryBeginOperateTime: string,
    lastQueryEndOperateTime: string,
    lastQueryStatusForSelect: string,

    tableData: OperateLog[];

    //  当前页码
    pageNumber: number,
    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  每一页最大条数
    pageSize: number,
}

export const useOperateLogStore = defineStore('operateLog', {
    // 其他配置...
    state: (): UseOperateLogStore => {
        return {
            ipAddress: '',
            title: '',
            operator: '',
            operateType: '',
            operateTime: [],
            beginOperateTime: '',
            endOperateTime: '',
            statusForSelect: '0',

            lastQueryIpAddress: '',
            lastQueryTitle: '',
            lastQueryOperator: '',
            lastQueryOperateType: '',
            lastQueryBeginOperateTime: '',
            lastQueryEndOperateTime: '',
            lastQueryStatusForSelect: '',

            tableData: undefined,

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,
        }
    },
    getters: {},
    actions: {
        operateTimeAction(value: string[]) {
            this.beginOperateTime = value[0]
            this.endOperateTime = value[1]
        }
    }
})
