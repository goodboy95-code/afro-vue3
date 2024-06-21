import request from "/src/axios/request.ts";

export const queryAccountRequest = () => {
    return request<string, string>({
        url: '/account/demo',
        method: 'get',
        headers: {
            isToken: true
        }
    })
}