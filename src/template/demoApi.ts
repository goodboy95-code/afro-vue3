import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Demo, DemoCondition} from "/src/template/Demo.ts";

/**
 * @description 添加案例信息
 * @param demo 案例信息
 * @return Demo 添加成功的Promise<Demo>
 */
export const addRequest = (demo: Demo) => {
    return request<Demo, Demo>({
        url: '/sysDemo/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: demo
    })
}

/**
 * @description 删除用户（不可恢复）
 * @param id 用户ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (id: number) => {
    return request<number, number>({
        url: '/sysDemo/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: {id}
    })
}

/**
 * @description 修改案例信息
 * @param demo 案例信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (demo: Demo) => {
    return request<Demo, Demo>({
        url: '/sysDemo/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: demo
    })
}
/**
 * @description 通过用户Id获取该用户所有案例
 * @return Promise<Demo[]> 案例列表
 */
export const queryByUserIdRequest = (userId: number) => {
    return request<Demo[], Demo[]>({
        url: '/sysDemo/queryByUserId',
        method: 'get',
        headers: {
            isToken: true
        },
        params: {userId}
    })
}
/**
 * @description 获取所有案例
 * @return Promise<Demo[]> 案例列表
 */
export const queryAllRequest = () => {
    return request<Demo[], Demo[]>({
        url: '/sysDemo/queryAll',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}
/**
 * @description条件获取案例列表
 * @param demosCondition 查询条件
 * @return Promise<Page<Demo[]>> 案例列表
 */
export const queryByPageRequest = (demosCondition: DemoCondition) => {
    const params: DemoCondition = {
        pageNumber: demosCondition.pageNumber,
        pageSize: demosCondition.pageSize,
    };
    //if查询条件
    /*if (!Utils.isEmpty(demosCondition.demoName)) {
        params.demoName = demosCondition.demoName;
    }*/

    return request<SpringPage<Demo>, SpringPage<Demo>>({
        url: '/sysDemo/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}

