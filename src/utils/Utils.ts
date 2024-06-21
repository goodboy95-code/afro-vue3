import {flattenDeep, isEmpty, isEqual, isString, startsWith, toLower, uniq, uniqueId} from 'lodash-es'
import {Menu} from "/src/axios/api/type/Menu.ts";

export default {
    isUrl(str: string) {
        return startsWith(str, 'http://') || startsWith(str, 'https://') || startsWith(str, 'www')
    },
    isUrlH(str: string) {
        return startsWith(str, 'http://') || startsWith(str, 'https://')
    },
    isUrlW(str: string) {
        return startsWith(str, 'www')
    },
    /**
     * 判断数据是否为null
     *
     * @example
     * isNull(null); true
     * isNull(undefined); false
     * isNull(0); false
     * isNull(''); false
     * @param object
     */
    /*isNull(object: Object) {
        return isNull(object)
    },*/
    /**
     * 判断数据是否为空
     *
     * @example
     * isEmpty('')  true
     * isEmpty([]);  true
     * isEmpty([ ]) true
     * isEmpty({});  true
     * isEmpty(null) true
     * isEmpty({ name: 'John' });  false
     * isEmpty(' ') false
     * isEmpty(' '.trim()) true
     * isEmpty(['']) false
     *
     * @param object
     */
    isEmpty(object: Object) {
        return isEmpty(object)
    },

    /**
     * 判断两个字符串内容是否相同（忽略大小写）
     *
     * @param str1 string类型
     * @param str2 string类型
     */
    isEqualIgnoreCase(str1: string, str2: string) {
        return isEqual(toLower(str1), toLower(str2));
    },
    /**
     * 生成一个唯一ID
     */
    uniqueId() {
        return uniqueId()
    },

    /**
     * 将树形结构MenuId数据扁平化为一维数组
     * @param tree menu树
     * @param result 结果数组
     */
    flattenMenuId(tree: Menu, result: number[] = []) {
        const {menuId} = tree;
        result.push(menuId);
        if (tree.children && tree.children.length > 0) {
            tree.children.forEach(child => {
                this.flattenMenuId(child, result);
            });
        }
        return result;
    },

    /**
     * 将二维数组扁平化为一维数组
     * @param arr 二维数组
     */
    handleArray(arr: number[][]) {
        let array = flattenDeep(arr);
        return uniq(array);
    },

    /**
     * 判断是否为手机号
     * @param str 手机号
     */
    isPhoneNumber(str: string) {
        return isString(str) && /^1[3-9]\d{9}$/.test(str);
    }
}