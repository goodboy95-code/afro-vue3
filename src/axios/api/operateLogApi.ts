import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import Utils from "/src/utils/Utils.ts";
import {OperateLog, OperateLogCondition} from "/src/axios/api/type/OperateLog.ts";

/**
 * @description 添加操作日志信息
 * @param operateLog 操作日志信息
 * @return OperateLog 添加成功的Promise<OperateLog>
 */
export const addRequest = (operateLog: OperateLog) => {
    return request<number, number>({
        url: '/sysOperateLog/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: operateLog
    })
}

/**
 * @description 删除日志（不可恢复）
 * @param operateLogId 日志ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (operateLogId: number) => {
    return request<boolean, boolean>({
        url: '/sysOperateLog/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {operateLogId}
    })
}

/**
 * @description 删除日志（不可恢复）
 * @param operateLogIds 日志ID
 * @return Promise<number> 删除的条数
 */
export const deleteBatchRequest = (operateLogIds: number[]) => {
    return request<boolean, boolean>({
        url: '/sysOperateLog/deleteBatch',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: operateLogIds
    })
}

/**
 * @description 删除日志（不可恢复）
 * @return Promise<number> 删除的条数
 */
export const deleteAllRequest = () => {
    return request<boolean, boolean>({
        url: '/sysOperateLog/deleteAll',
        method: 'delete',
        headers: {
            isToken: true
        },
    })
}

/**
 * @description 修改操作日志信息
 * @param operateLog 操作日志信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (operateLog: OperateLog) => {
    return request<OperateLog, OperateLog>({
        url: '/sysOperateLog/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: operateLog
    })
}

/**
 * @description 条件获取操作日志列表
 * @param operateLogsCondition 查询条件
 * @return Promise<Page<OperateLog[]>> 操作日志列表
 */
export const queryByPageRequest = (operateLogsCondition: OperateLogCondition) => {
    const params: OperateLogCondition = {
        pageNumber: operateLogsCondition.pageNumber,
        pageSize: operateLogsCondition.pageSize,
    };
    if (!Utils.isEmpty(operateLogsCondition.status)) {
        params.status = operateLogsCondition.status;
    }
    if (!Utils.isEmpty(operateLogsCondition.ipAddress)) {
        params.ipAddress = operateLogsCondition.ipAddress;
    }
    if (!Utils.isEmpty(operateLogsCondition.title)) {
        params.title = operateLogsCondition.title;
    }
    if (!Utils.isEmpty(operateLogsCondition.operateType)) {
        params.operateType = operateLogsCondition.operateType;
    }
    if (!Utils.isEmpty(operateLogsCondition.operator)) {
        params.operator = operateLogsCondition.operator;
    }
    if (!Utils.isEmpty(operateLogsCondition.beginOperateTime) && !Utils.isEmpty(operateLogsCondition.endOperateTime)) {
        params.beginOperateTime = operateLogsCondition.beginOperateTime;
        params.endOperateTime = operateLogsCondition.endOperateTime;
    }

    return request<SpringPage<OperateLog>, SpringPage<OperateLog>>({
        url: '/sysOperateLog/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}

/**
 *
 * @description 导出操作日志
 * @returns Promise<number>
 */
export const exportRequest = () => {
    return request<void, void>({
        url: '/sysOperateLog/export',
        method: 'post',
        headers: {
            isToken: true
        },
    })
}

