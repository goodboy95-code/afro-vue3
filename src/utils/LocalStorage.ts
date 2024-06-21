export const TokenKey = 'Admin-Token'
export const selectedRole = 'selectedRole'

export interface LocalStorageData<T> {
    value: T
    expiration?: number
}

/**
 * 存储数据到localStorage中
 * @param key localStorage中的键
 * @param value 要存储的值
 */
export function setItem<T>(key: string, value: T) {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * 从localStorage中获取数据
 * @param key localStorage中的键
 * @param isJson 是否将获取到的数据解析为JSON对象
 */
export function getItem<T>(key: string, isJson: boolean = false): T | null {
    let item: string;
    if (isJson) {
        item = JSON.parse(localStorage.getItem(key));
    } else {
        item = localStorage.getItem(key);
    }
    if (!item) {
        return null;
    }
    return item as T;
}

/**
 * 设置带有过期时间的数据到localStorage中
 * @param key localStorage中的键
 * @param value 要存储的值
 * @param expirationMinutes 过期时间（分钟）
 */
export function setItemWithExpiration<T>(key: string, value: T, expirationMinutes: number) {
    const expirationMS = expirationMinutes * 60 * 1000; // 将分钟转换为毫秒
    const item: LocalStorageData<T> = {
        value: value,
        expiration: new Date().getTime() + expirationMS // 计算过期时间戳
    };
    localStorage.setItem(key, JSON.stringify(item));
}

/**
 * 从localStorage中获取带有过期时间的数据
 * @param key localStorage中的键
 */
export function getItemWithExpiration<T>(key: string): LocalStorageData<T> {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) {
        return null;
    }
    if (new Date().getTime() > item.expiration) {
        localStorage.removeItem(key); // 过期了，删除数据
        return null;
    }
    return item;
}

/**
 * 删除localStorage中的数据
 * @param key localStorage中的键
 */
export function deleteItem(key: string) {
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
        localStorage.removeItem(key);
    }
}

