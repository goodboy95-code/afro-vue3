import request from "/src/axios/request.ts";
import {Menu, MenuCondition, MenuForRoute} from "/src/axios/api/type/Menu.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import Utils from "/src/utils/Utils.ts";

/**
 * @description 添加菜单
 * @param menu 菜单信息
 * @return Menu 添加的Menu
 */
export const addRequest = (menu: Menu) => {
    return request<number, number>({
        url: '/sysMenu/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: menu
    })
}

/**
 * @description 删除菜单（不可恢复）
 * @param menuId 菜单ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (menuId: number) => {
    return request<number, number>({
        url: '/sysMenu/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {menuId}
    })
}

/**
 * @description 修改菜单
 * @param menu 菜单信息
 * @return Promise<number> 修改的条数
 */
export const editRequest = (menu: Menu) => {
    return request<number, number>({
        url: '/sysMenu/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: menu
    })
}

/**
 * @description 获取菜单列表
 * @return Promise<Menu[]> 菜单列表
 */
export const queryMenuTreeRequest = () => {
    return request<Menu[], Menu[]>({
        url: '/sysMenu/queryMenuTree',
        method: 'get',
        headers: {
            isToken: true
        }
    })
}

/**
 * @description 获取菜单权限列表
 * @return Promise<Menu[]> 菜单权限列表
 */
export const queryMenuTreeBDMRequest = () => {
    return request<Menu, Menu>({
        url: '/sysMenu/queryMenuTreeBDM',
        method: 'get',
        headers: {
            isToken: true
        }
    })
}

/**
 * @description 通过角色id获取菜单（路由需要的属性）
 * @param roleId 角色id
 * @return Promise<MenuForRoute[]>  路由列表
 */
export const queryRoutesByRoleIdRequest = (roleId: number) => {
    return request<MenuForRoute[], MenuForRoute[]>({
        url: '/sysMenu/queryRoutesByRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {
            roleId
        }
    })
}

/**
 * @description 通过角色id获取菜单（路由需要的属性）
 * @param roleId 角色id
 * @return Promise<MenuForRoute[]>  路由列表
 */
export const queryMenuTreeBDMByRoleIdRequest = (roleId: number) => {
    return request<Menu, Menu>({
        url: '/sysMenu/queryMenuTreeBDMByRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {
            roleId
        }
    })
}

/**
 * @description条件获取菜单列表
 * @param menusCondition 查询条件
 * @return Promise<Page<Menu[]>> 菜单列表
 */
export const queryByPageRequest = (menusCondition: MenuCondition) => {
    const params: MenuCondition = {
        pageNumber: menusCondition.pageNumber,
        pageSize: menusCondition.pageSize,
    };
    if (!Utils.isEmpty(menusCondition.menuName)) {
        params.menuName = menusCondition.menuName;
    }
    if (!Utils.isEmpty(menusCondition.status)) {
        params.status = menusCondition.status;
    }

    return request<SpringPage<Menu>, SpringPage<Menu>>({
        url: '/sysMenu/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}

