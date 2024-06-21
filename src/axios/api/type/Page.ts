export class Page<T> {
    records: T;
    total: number;
    pageSize: number;
    pageNumber: number;
    orders: [];
    optimizeCountSql: boolean;
    searchCount: boolean;
    maxLimit: number;
    countId: number;
    pages: number;
}

export class SpringPage<T> {
    //实际的数据内容，它是一个数组
    content: T[];
    //这是分页信息，包含了页码(pageNumber)，每页的大小(pageSize)，排序信息(sort)等
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            unsorted: boolean;
            sorted: boolean
        };
        //从第几条记录开始返回结果。默认值为0
        offset: number;
        //是否为未分页的数据。如果是未分页的数据，那么将返回所有满足条件的记录
        unpaged: boolean;
        //是否为分页数据。如果是分页数据，那么将返回指定数量的记录
        paged: boolean
    };
    //总页数
    totalPages: number;
    //总元素数
    totalElements: number;
    //是否是最后一页
    last: boolean;
    //每页的大小
    size: number;
    //当前页码
    number: number;
    //排序信息
    sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean
    };
    //当前页的元素数量
    numberOfElements: number;
    //是否是第一页
    first: boolean;
    //当前页是否为空
    empty: boolean
}