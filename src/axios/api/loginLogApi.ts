import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {LoginLog, LoginLogCondition} from "/src/axios/api/type/LoginLog.ts";
import Utils from "/src/utils/Utils.ts";

/**
 * @description 添加登录信息
 * @param loginLog 登录信息
 * @return LoginLog 添加成功的Promise<LoginLog>
 */
export const addRequest = (loginLog: LoginLog) => {
    return request<number, number>({
        url: '/sysLoginLog/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: loginLog
    })
}

/**
 * @description 删除登录日志（不可恢复）
 * @param loginLogId 登录日志ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (loginLogId: number) => {
    return request<number, number>({
        url: '/sysLoginLog/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {loginLogId}
    })
}

/**
 * @description 删除登录日志（不可恢复）
 * @param loginLogIds 登录日志ID列表
 * @return Promise<number> 删除的条数
 */
export const deleteBatchRequest = (loginLogIds: number[]) => {
    return request<number, number>({
        url: '/sysLoginLog/deleteBatch',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: loginLogIds
    })
}

/**
 * @description 清空登录日志（不可恢复）
 * @return Promise<boolean> 是否清空
 */
export const deleteAllRequest = () => {
    return request<boolean, boolean>({
        url: '/sysLoginLog/deleteAll',
        method: 'delete',
        headers: {
            isToken: true
        },
    })
}

/**
 * @description 修改登录信息
 * @param loginLog 登录信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (loginLog: LoginLog) => {
    return request<LoginLog, LoginLog>({
        url: '/sysLoginLog/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: loginLog
    })
}
/**
 * @description 通过登录日志Id获取该登录日志
 * @return Promise<LoginLog[]> 登录信息列表
 */
export const queryByUserIdRequest = (userId: number) => {
    return request<LoginLog[], LoginLog[]>({
        url: '/sysLoginLog/queryByUserId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {userId}
    })
}
/**
 * @description 获取所有登录信息
 * @return Promise<LoginLog[]> 登录信息列表
 */
export const queryAllRequest = () => {
    return request<LoginLog[], LoginLog[]>({
        url: '/sysLoginLog/queryAll',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}
/**
 * @description条件获取登录信息列表
 * @param loginLogsCondition 查询条件
 * @return Promise<Page<LoginLog[]>> 登录信息列表
 */
export const queryByPageRequest = (loginLogsCondition: LoginLogCondition) => {
    const params: LoginLogCondition = {
        pageNumber: loginLogsCondition.pageNumber,
        pageSize: loginLogsCondition.pageSize,
    };
    //if查询条件
    if (!Utils.isEmpty(loginLogsCondition.ipAddress)) {
        params.ipAddress = loginLogsCondition.ipAddress;
    }
    if (!Utils.isEmpty(loginLogsCondition.userName)) {
        params.userName = loginLogsCondition.userName;
    }
    if (!Utils.isEmpty(loginLogsCondition.status)) {
        params.status = loginLogsCondition.status;
    }
    if (!Utils.isEmpty(loginLogsCondition.beginLoginLogTime) && !Utils.isEmpty(loginLogsCondition.endLoginLogTime)) {
        params.beginLoginLogTime = loginLogsCondition.beginLoginLogTime;
        params.endLoginLogTime = loginLogsCondition.endLoginLogTime;
    }

    return request<SpringPage<LoginLog>, SpringPage<LoginLog>>({
        url: '/sysLoginLog/queryByPage',
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
        url: '/sysLoginLog/export',
        method: 'post',
        headers: {
            isToken: true
        },
    })
}

