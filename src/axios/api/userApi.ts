import request from "/src/axios/request.ts";
import {User, UsersCondition} from "/src/axios/api/type/User.ts";
import {isNil} from "lodash-es";
import Utils from "/src/utils/Utils.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";

/**
 * @description 添加用户
 * @param user 用户信息
 * @return User 添加的User
 */
export const addRequest = (user: User) => {
    return request<number, number>({
        url: '/sysUser/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: user
    })
}

/**
 * @description 删除用户（不可恢复）
 * @param userId 用户ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (userId: number) => {
    return request<number, number>({
        url: '/sysUser/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: {userId}
    })
}

/**
 * @description 修改用户
 * @param user 用户信息
 * @return Promise<number> 修改的条数
 */
export const editRequest = (user: User) => {
    return request<number, number>({
        url: '/sysUser/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: user
    })
}

/**
 * @description 条件获取用户列表
 *
 * @param usersCondition 查询条件
 * @return Promise<SpringPage<User>> 用户列表
 */
export const queryByDepartmentIdRequest = (usersCondition: UsersCondition) => {
    const params: UsersCondition = {
        pageNumber: usersCondition.pageNumber,
        pageSize: usersCondition.pageSize,
    };
    if (!isNil(usersCondition.departmentId)) {
        params.departmentId = usersCondition.departmentId;
    }
    if (!Utils.isEmpty(usersCondition.userName)) {
        params.userName = usersCondition.userName;
    }
    if (!Utils.isEmpty(usersCondition.status)) {
        params.status = usersCondition.status;
    }
    if (!Utils.isEmpty(usersCondition.phoneNumber)) {
        params.phoneNumber = usersCondition.phoneNumber;
    }

    return request<SpringPage<User>, SpringPage<User>>({
        url: '/sysUser/queryByDepartmentId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}

/**
 * @description 用户头像上传
 * @param data
 */
export const uploadAvatar = (data: FormData) => {
    return request<string, string>({
        url: '/sysUser/uploadAvatar',
        method: 'post',
        data: data,
        headers: {
            isToken: true,
            'Content-Type': 'multipart/form-data'
        }
    })
}