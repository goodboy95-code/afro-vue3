<template>
  <div class="login">
    <div v-if="useResponsiveLayoutStore().showLoginLeft" id="login-left">
      <h1>Hi！你好！</h1>
      <h1>欢迎进入Afro数据管理平台</h1>
      <div class="login-left-child"></div>
    </div>
    <div id="login-right">
      <h4 v-if="!useResponsiveLayoutStore().showLoginLeft">Afro数据管理平台</h4>
      <transition name="login">
        <component :is="useLoginStore().currentComponent"></component>
      </transition>
      <el-text style="position:absolute; bottom: 10px;">
        Copyright © 2024-present 薛业威
      </el-text>
      <el-link href="https://beian.miit.gov.cn/" style="position:absolute; bottom: 30px;">
        皖ICP备2024051109号-1
      </el-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, reactive, watch} from 'vue';
import {useRoute} from "vue-router";
import {useLoginStore} from "/src/pinia/module/useLoginStore.ts";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {useThemeStore} from "/src/pinia/module/useThemeStore.ts";

const route = useRoute()

const loginData = reactive({
  redirect: ''
});

watch(route, (route) => {
      if (route.query && route.query.redirect && !Array.isArray(route.query.redirect)) {
        loginData.redirect = route.query && route.query.redirect;
      }
    },
    {
      immediate: true
    }
)

watch(() => useResponsiveLayoutStore().formId, async (formId) => {
  await nextTick()
  useResponsiveLayoutStore().updateLayout(formId);
})

onMounted(() => {
  // 初始化时执行一次
  useResponsiveLayoutStore().updateLayout(useResponsiveLayoutStore().formId);
  useThemeStore().toggleToLogin()
  window.addEventListener('resize', () => useResponsiveLayoutStore().updateLayout(useResponsiveLayoutStore().formId));
});
onUnmounted(() => {
  window.removeEventListener('resize', () => useResponsiveLayoutStore().updateLayout(useResponsiveLayoutStore().formId));
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  display: flex;

  #login-left {
    width: 34%;
    height: calc(100% - 20px);
    padding: 10px 8%;
    background-color: var(--el-color-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-family: AlimamaShuHeiTi-Bold, serif;
    color: white;

    .login-left-child {
      width: 400px;
      height: 400px;
      background-size: cover;
      background-image: url("/src/assets/image/book.png");
    }
  }

  #login-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      font-family: AlimamaShuHeiTi-Bold, serif;
      color: #00A896;
      position: absolute;
      left: 25px;
      top: 5px;
    }

    .login-enter-active {
      transition: opacity .4s ease;
    }

    .login-leave-active {
      position: absolute;
      transition: opacity .1s;
    }

    .login-enter-from, .login-leave-to {
      opacity: 0;
    }
  }
}
</style>
