import {RoleMenu} from "/src/axios/api/type/RoleMenu.ts";
import request from "/src/axios/request.ts";

/**
 * @description 添加角色菜单
 * @param sysRoleMenuList 角色菜单列表
 * @return Promise<string> 返回数据
 */
export const insertOrDeleteRoleMenuRequest = (sysRoleMenuList: RoleMenu[]) => {
    return request<string, string, RoleMenu[]>({
        url: '/sysRoleMenu/insertOrDeleteRoleMenu',
        method: 'post',
        headers: {
            isToken: true
        },
        data: sysRoleMenuList
    })
}

/**
 *  @description 查询数据集合
 *  @param roleId 角色id
 *  @return Promise<RoleMenu[]> 数据集合
 */
export const queryByRoleIdRequest = (roleId: number) => {
    return request<RoleMenu[], RoleMenu[]>({
        url: '/sysRoleMenu/queryByRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {roleId}
    })
}