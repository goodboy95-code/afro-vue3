import {useLoginLogStore} from "/src/pinia/module/loginLog/useLoginLogStore.ts";

export class LoginLog {
    /**
     * 访问ID
     */
    loginLogId: number;
    /**
     * 用户账号
     */
    userName: string;
    /**
     * 登录IP地址
     */
    ipAddress: string;
    /**
     * 登录地点
     */
    loginLocation: string;
    /**
     * 浏览器类型
     */
    browser: string;
    /**
     * 操作系统
     */
    os: string;
    /**
     * 登录状态（0成功 1失败）
     */
    status: string;
    /**
     * 提示消息
     */
    msg: string;
    /**
     * 访问时间
     */
    loginTime: Date;
}

export class LoginLogCondition {
    ipAddress?: string;
    userName?: string;
    status?: string;

    beginLoginLogTime?: String;
    endLoginLogTime?: String;

    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number, ipAddress?: string, userName?: string, status?: string, beginLoginLogTime?: String, endLoginLogTime?: String) {
        this.ipAddress = ipAddress
        this.userName = userName
        this.status = status
        this.beginLoginLogTime = beginLoginLogTime
        this.endLoginLogTime = endLoginLogTime

        this.pageNumber = pageNumber;
        this.pageSize = useLoginLogStore().pageSize
        useLoginLogStore().pageNumber = pageNumber
    }
}