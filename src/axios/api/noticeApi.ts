import request from "/src/axios/request.ts";
import {SpringPage} from "/src/axios/api/type/Page.ts";
import {Notice, NoticeCondition} from "/src/axios/api/type/Notice.ts";
import Utils from "/src/utils/Utils.ts";

/**
 * @description 添加通知公告信息
 * @param notice 通知公告信息
 * @return Notice 添加成功的Promise<Notice>
 */
export const addRequest = (notice: Notice) => {
    return request<number, number>({
        url: '/sysNotice/add',
        method: 'post',
        headers: {
            isToken: true
        },
        data: notice
    })
}

/**
 * @description 删除通知（不可恢复）
 * @param noticeId 通知ID
 * @return Promise<number> 删除的条数
 */
export const deleteByIdRequest = (noticeId: number) => {
    return request<number, number>({
        url: '/sysNotice/deleteById',
        method: 'delete',
        headers: {
            isToken: true
        },
        params: {noticeId}
    })
}

/**
 * @description 修改通知公告信息
 * @param notice 通知公告信息
 * @return Promise<number> 修改成功的条数
 */
export const editRequest = (notice: Notice) => {
    return request<Notice, Notice>({
        url: '/sysNotice/edit',
        method: 'put',
        headers: {
            isToken: true
        },
        data: notice
    })
}
/**
 * @description 获取所有通知公告
 * @return Promise<Notice[]> 通知公告列表
 */
export const queryAllRequest = () => {
    return request<Notice[], Notice[]>({
        url: '/sysNotice/queryAll',
        method: 'get',
        headers: {
            isToken: true
        },
    })
}
/**
 * @description条件获取通知公告列表
 * @param noticesCondition 查询条件
 * @return Promise<Page<Notice[]>> 通知公告列表
 */
export const queryByPageRequest = (noticesCondition: NoticeCondition) => {
    const params: NoticeCondition = {
        pageNumber: noticesCondition.pageNumber,
        pageSize: noticesCondition.pageSize,
    };
    if (!Utils.isEmpty(noticesCondition.noticeTitle)) {
        params.noticeTitle = noticesCondition.noticeTitle;
    }
    if (!Utils.isEmpty(noticesCondition.noticeType)) {
        params.noticeType = noticesCondition.noticeType;
    }
    if (!Utils.isEmpty(noticesCondition.createBy)) {
        params.createBy = noticesCondition.createBy;
    }
    if (!Utils.isEmpty(noticesCondition.status)) {
        params.status = noticesCondition.status;
    }
    return request<SpringPage<Notice>, SpringPage<Notice>>({
        url: '/sysNotice/queryByPage',
        method: 'get',
        headers: {
            isToken: true
        },
        params: params
    })
}