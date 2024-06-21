import {defineStore} from 'pinia'
import NormalForm from "/src/components/login/form/NormalForm.vue";
import {markRaw} from "vue";


export const useLoginStore = defineStore('login', {
    // 其他配置...
    state: () => {
        return {
            currentComponent: markRaw(NormalForm)
        }
    },
    getters: {},
    actions: {
    }
})
