import request from "/src/axios/request.ts";
import {UserRoleMenu} from "/src/axios/api/type/UserRoleMenu.ts";
import {Navigation} from "/src/axios/api/type/Navigation.ts";

/**
 * @description 添加导航
 * @param userRoleMenuList 用户角色菜单列表
 * @return Promise<string> 返回信息
 */
export const addBatchRequest = (userRoleMenuList: UserRoleMenu[]) => {
    return request<string, string, UserRoleMenu[]>({
        url: '/sysUserRoleMenu/addBatch',
        method: 'post',
        headers: {
            isToken: true
        },
        data: userRoleMenuList
    })
}

/**
 * @description 删除导航
 * @param userRoleMenuList 用户角色菜单
 * @return Promise<string> 返回信息
 */
export const deleteBatchRequest = (userRoleMenuList: UserRoleMenu[]) => {
    return request<string, string, UserRoleMenu[]>({
        url: '/sysUserRoleMenu/deleteBatch',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: userRoleMenuList
    })
}

/**
 * @description 添加用户角色菜单
 * @param userRoleMenuList 用户角色菜单列表
 * @return Promise<string> 返回数据
 */
export const insertOrDeleteUserRoleMenuRequest = (userRoleMenuList: UserRoleMenu[]) => {
    return request<string, string, UserRoleMenu[]>({
        url: '/sysUserRoleMenu/insertOrDeleteUserRoleMenu',
        method: 'post',
        headers: {
            isToken: true
        },
        data: userRoleMenuList
    })
}

/**
 *  @description 获取导航
 *  @param roleId 角色id
 *  @return Promise<Navigation[]> 导航信息列表
 */
export const queryNavigationsRequest = (roleId?: number) => {
    return request<Navigation[], Navigation[]>({
        url: '/sysMenu/queryNavigations',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {roleId}
    })
}

/**
 *  @description 查询数据集合
 *  @param userId 用户id
 *  @param roleId 角色id
 *  @return Promise<UserRoleMenu[]> 数据集合
 */
export const queryByUserIdAndRoleIdRequest = (userId: number, roleId: number) => {
    return request<UserRoleMenu[], UserRoleMenu[]>({
        url: '/sysUserRoleMenu/queryByUserIdAndRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {userId, roleId}
    })
}