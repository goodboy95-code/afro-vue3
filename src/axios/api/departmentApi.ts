import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import Utils from "/src/utils/Utils.ts";
import {Department, DepartmentCondition, DepartmentInfo} from "/src/axios/api/type/Department.ts";

/**
 * @description 添加部门信息
 * @param department 部门信息
 * @return Department 添加成功的Promise<Department>
 */
export const addRequest = (department: Department) => {
    return request<number, number>({
        url: '/sysDepartment/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: department
    })
}

/**
 * @description 删除部门（不可恢复）
 * @param departmentId 部门ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (departmentId: number) => {
    return request<number, number>({
        url: '/sysDepartment/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {departmentId}
    })
}

/**
 * @description 修改部门信息
 * @param department 部门信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (department: Department) => {
    return request<Department, Department>({
        url: '/sysDepartment/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: department
    })
}

/**
 * @description 获取DepartmentInfo
 * @return Promise<DepartmentInfo> 部门信息
 */
export const queryDepartmentTreeRequest = () => {
    return request<DepartmentInfo[], DepartmentInfo[]>({
        url: '/sysDepartment/queryDepartmentTree',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}
/**
 * @description 获取DepartmentInfo
 * @return Promise<DepartmentInfo> 部门信息
 */
export const queryDepartmentTreeByRoleIdRequest = (roleId: number) => {
    return request<DepartmentInfo[], DepartmentInfo[]>({
        url: '/sysDepartment/queryDepartmentTreeByRoleId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {roleId}
    })
}

/**
 * @description条件获取部门列表
 * @param departmentCondition 查询条件
 * @return Promise<Page<Department[]>> 部门列表
 */
export const queryByPageRequest = (departmentCondition: DepartmentCondition) => {
    const params: DepartmentCondition = {
        pageNumber: departmentCondition.pageNumber,
        pageSize: departmentCondition.pageSize,
    };
    if (!Utils.isEmpty(departmentCondition.departmentName)) {
        params.departmentName = departmentCondition.departmentName;
    }
    if (!Utils.isEmpty(departmentCondition.status)) {
        params.status = departmentCondition.status;
    }

    return request<SpringPage<Department>, SpringPage<Department>>({
        url: '/sysDepartment/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}
