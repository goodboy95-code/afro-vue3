import {useNoticeStore} from "/src/pinia/module/notice/useNoticeStore.ts";

export class Notice {
    // 公告ID
    noticeId: number;
    // 公告标题
    noticeTitle: string;
    // 公告类型（0 通知 1 公告）
    noticeType: string;
    // 公告内容
    noticeContent: any;
    // 公告状态（0 正常 1 关闭）
    status: string;
    // 创建者
    createBy: string;
    // 创建时间
    createTime: Date;
    // 更新者
    updateBy: string;
    // 更新时间
    updateTime: Date;
    // 备注
    remark: string;
}

export class NoticeCondition {
    noticeTitle?: string;
    noticeType?: string;
    status?: string;
    createBy?: string;
    updateBy?: string;

    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number, noticeTitle?: string, status?: string, createBy?: string, noticeType?: string) {
        this.noticeTitle = noticeTitle;
        this.status = status;
        this.createBy = createBy;
        this.noticeType = noticeType;
        this.pageNumber = pageNumber;
        this.pageSize = useNoticeStore().pageSize
        useNoticeStore().pageNumber = pageNumber
    }
}