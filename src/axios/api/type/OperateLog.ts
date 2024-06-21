import {useOperateLogStore} from "/src/pinia/module/operatelog/useOperateLogStore.ts";

export class OperateLog {
    /**
     * 日志主键
     */
    operateLogId: number;
    /**
     * 系统模块
     */
    title: string;
    /**
     * 操作类型（0其它 1新增 2修改 3删除）
     */
    operateType: string;
    /**
     * 方法名称
     */
    methodName: string;
    /**
     * 请求方式
     */
    requestMethod: string;
    /**
     * 操作类别（0 其它 1 后台用户 2 手机端用户）
     */
    operatorType: string;
    /**
     * 操作人员
     */
    operator: string;
    /**
     * 请求URL
     */
    requestUrl: string;
    /**
     * 主机地址
     */
    ipAddress: string;
    /**
     * 操作地点
     */
    operateLocation: string;
    /**
     * 请求参数
     */
    requestParam: string;
    /**
     * 返回参数
     */
    jsonResult: string;
    /**
     * 操作状态（0正常 1异常）
     */
    status: string;
    /**
     * 错误消息
     */
    errorMsg: string;
    /**
     * 操作时间
     */
    operateTime: Date;
    /**
     * 花费时间
     */
    costTime: number;
}

export class OperateLogCondition {
    ipAddress?: string;
    title?: string;
    operator?: string;
    operateType?: string;
    status?: string;
    pageNumber: number;
    pageSize: number;
    beginOperateTime?: String;
    endOperateTime?: String;

    constructor(pageNumber: number, ipAddress?: string, title?: string, operator?: string, operateType?: string, status?: string, beginOperateTime?: String, endOperateTime?: String) {
        this.ipAddress = ipAddress;
        this.title = title;
        this.operator = operator;
        this.operateType = operateType;
        this.status = status;
        this.beginOperateTime = beginOperateTime;
        this.endOperateTime = endOperateTime;

        // 设置默认的pageSize
        this.pageNumber = pageNumber;
        this.pageSize = useOperateLogStore().pageSize
        useOperateLogStore().pageNumber = pageNumber
    }
}