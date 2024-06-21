import {RoleDepartment} from "/src/axios/api/type/RoleDepartment.ts";
import request from "/src/axios/request.ts";

/**
 * @description 添加角色部门关联
 * @param roleDepartmentList 角色部门
 * @return Promise<string> 添加角色部门关联返回数据
 */
export const insertOrDeleteRoleDepartmentRequest = (roleDepartmentList: RoleDepartment[]) => {
    return request<string, string>({
        url: '/sysRoleDepartment/insertOrDeleteRoleDepartment',
        method: 'post',
        headers: {
            isToken: true
        },
        data: roleDepartmentList
    })
}

/**
 *  @description 查询数据集合
 *  @param roleId 角色id
 *  @return Promise<RoleDepartment[]> 数据集合
 */
export const queryByRoleIdRequest = (roleId: number) => {
    return request<RoleDepartment[], RoleDepartment[]>({
        url: '/sysRoleDepartment/queryByRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {roleId}
    })
}