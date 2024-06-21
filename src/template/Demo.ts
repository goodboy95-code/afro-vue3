import {useDemoStore} from "/src/template/store/demo/useDemoStore.ts";

export class Demo {
    //java类属性
}

export class DemoCondition {
    //查询条件

    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number) {
        //查询条件


        this.pageSize = useDemoStore().pageSize
        useDemoStore().pageNumber = pageNumber
    }
}