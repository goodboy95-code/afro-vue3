import request from "/src/axios/request.ts";
import {UserRole} from "/src/axios/api/type/UserRole.ts";

/**
 * @description 添加用户角色
 * @param userRoleList 用户角色列表
 * @return Promise<string> 返回信息
 */
export const addBatchRequest = (userRoleList: UserRole[]) => {
    return request<string, string, UserRole[]>({
        url: '/sysUserRole/addBatch',
        method: 'post',
        headers: {
            isToken: true
        },
        data: userRoleList
    })
}
/**
 * @description 删除用户角色
 * @param userRoleList 用户角色列表
 * @return Promise<string> 返回信息
 */
export const deleteBatchRequest = (userRoleList: UserRole[]) => {
    return request<string, string, UserRole[]>({
        url: '/sysUserRole/deleteBatch',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: userRoleList
    })
}

/**
 * @description 更新用户角色关联
 * @param userRoleList 用户角色列表
 * @return Promise<string> 返回信息
 */
export const insertOrDeleteUserRoleRequest = (userRoleList: UserRole[]) => {
    return request<string, string>({
        url: '/sysUserRole/insertOrDeleteUserRole',
        method: 'post',
        headers: {
            isToken: true
        },
        data: userRoleList
    })
}

/**
 *  @description 查询数据集合
 *  @param userId 用户id
 *  @return Promise<UserRole[]> 数据集合
 */
export const queryByUserIdRequest = (userId: number) => {
    return request<UserRole[], UserRole[]>({
        url: '/sysUserRole/queryByUserId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {userId}
    })
}
