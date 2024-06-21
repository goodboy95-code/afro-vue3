import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Role, RoleCondition} from "/src/axios/api/type/Role.ts";
import Utils from "/src/utils/Utils.ts";

/**
 * @description 添加角色信息
 * @param role 角色信息
 * @return Role 添加成功的Promise<Role>
 */
export const addRequest = (role: Role) => {
    return request<number, number>({
        url: '/sysRole/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: role
    })
}

/**
 * @description 删除用户（不可恢复）
 * @param roleId 角色ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (roleId: number) => {
    return request<number, number>({
        url: '/sysRole/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {roleId}
    })
}

/**
 * @description 修改角色信息
 * @param role 角色信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (role: Role) => {
    return request<Role, Role>({
        url: '/sysRole/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: role
    })
}
/**
 * @description 通过用户Id获取该用户所有角色
 * @return Promise<Role[]> 角色列表
 */
export const queryByUserIdRequest = (userId: number) => {
    return request<Role[], Role[]>({
        url: '/sysRole/queryByUserId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {userId}
    })
}
/**
 * @description 获取所有角色
 * @return Promise<Role[]> 角色列表
 */
export const queryAllRequest = () => {
    return request<Role[], Role[]>({
        url: '/sysRole/queryAll',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}
/**
 * @description条件获取角色列表
 * @param rolesCondition 查询条件
 * @return Promise<Page<Role[]>> 角色列表
 */
export const queryByPageRequest = (rolesCondition: RoleCondition) => {
    const params: RoleCondition = {
        pageNumber: rolesCondition.pageNumber,
        pageSize: rolesCondition.pageSize,
    };
    if (!Utils.isEmpty(rolesCondition.roleName)) {
        params.roleName = rolesCondition.roleName;
    }
    if (!Utils.isEmpty(rolesCondition.status)) {
        params.status = rolesCondition.status;
    }

    return request<SpringPage<Role>, SpringPage<Role>>({
        url: '/sysRole/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}

