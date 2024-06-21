import {defineStore} from 'pinia'
import {LoginLog} from "/src/axios/api/type/LoginLog.ts";

interface UseLoginLogStore {
    // 查询条件
    ipAddress: string;
    userName: string;
    statusForSelect: string;
    beginLoginLogTime: string;
    endLoginLogTime: string;
    loginTime: string[];


    lastQueryIpAddress: string;
    lastQueryUserName: string;
    lastQueryStatusForSelect: string;
    lastQueryBeginLoginLogTime: string;
    lastQueryEndLoginLogTime: string;

    //  表格数据
    tableData: LoginLog[],

    //  总页数
    totalPages: number,
    //  最大页码按钮数
    pagerCount: number,
    //  当前页码
    pageNumber: number,
    //  每一页最大条数
    pageSize: number,
}

export const useLoginLogStore = defineStore('loginLog', {
    // 其他配置...
    state: (): UseLoginLogStore => {
        return {
            ipAddress: '',
            userName: '',
            statusForSelect: '',
            beginLoginLogTime: '',
            endLoginLogTime: '',
            loginTime: [],
            lastQueryIpAddress: '',
            lastQueryUserName: '',
            lastQueryStatusForSelect: '',
            lastQueryBeginLoginLogTime: '',
            lastQueryEndLoginLogTime: '',

            tableData: [],

            pageNumber: 1,
            totalPages: 0,
            pagerCount: 5,
            pageSize: 6,
        }
    },
    getters: {},
    actions: {
        loginLogTimeAction(value: string[]) {
            this.beginLoginLogTime = value[0]
            this.endLoginLogTime = value[1]
        }
    }
})
