import {defineStore} from 'pinia'

import Avatar_Sagittarius from "/src/assets/image/avatar/头像_射手座.png";
import {UserInfo} from "/src/axios/api/type/UserInfo.ts";
import {User} from "/src/axios/api/type/User.ts";

interface UseUserInfoStore {
    // 用户头像
    avatarImage: string,
    //  用户信息
    userInfo: UserInfo,
}

export const useUserInfoStore = defineStore('userInfo', {
        state: (): { userInfo: UserInfo; avatarImage: {} } => {
            return {
                avatarImage: Avatar_Sagittarius,
                userInfo: new UserInfo([],[],new User()),
            }
        },
        getters: {
            getAvatar: (state) => {
                return "data:image/gif;base64," + state.avatarImage
            },
        },
        actions: {
            // 更新用户头像地址
            updateAvatarUrl(newAvatarUrl: string) {
                this.avatar = newAvatarUrl
            }
        }
    }
)
