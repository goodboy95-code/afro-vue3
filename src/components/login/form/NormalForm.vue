<template>
  <el-form id="login-normal-form" ref="ruleFormRef_N" :model="normalFormData" :rules="loginRules">
    <h3>登录</h3>
    <el-form-item prop="username">
      <el-input v-model="normalFormData.username" clearable placeholder="账号"
                prefix-icon="User" type="text">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="normalFormData.password" clearable placeholder="密码"
                prefix-icon="Lock" show-password type="text">
      </el-input>
    </el-form-item>
    <el-form-item class="code-flex-style" prop="code">
      <el-input v-model="normalFormData.code" class="input-short" clearable
                placeholder="验证码" prefix-icon="CircleCheck"
                type="text">
      </el-input>
      <el-image :src="codeUrl" @click="getCode()"></el-image>
    </el-form-item>
    <el-form-item class="remember-flex-style">
      <el-checkbox v-model="normalFormData.rememberMe" border label="记住密码"/>
      <el-link type="primary">忘记密码?</el-link>
    </el-form-item>
    <el-form-item>
      <el-button
          :loading="loading"
          size="default"
          style="width:100%;"
          type="primary"
          @click="submitForm(ruleFormRef_N)"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form-item>
    <el-form-item class="remember-flex-style">
      <el-button style="width: 48%" @click="phoneForm">手机登录</el-button>
      <el-button style="width: 48%" @click="register">注册</el-button>
    </el-form-item>
    <el-divider>第三方登录</el-divider>
    <el-form-item class="center-flex-style">
      <icon-wechat :strokeWidth="3" fill="#333" size="24" theme="outline"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {markRaw, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {getCaptchaImageRequest} from "/src/axios/api/captchaImageApi.ts";
import {CaptchaImage} from "/src/axios/api/type/CaptchaImage.ts";
import {deleteItem, getItem, setItem, setItemWithExpiration, TokenKey} from "/src/utils/LocalStorage.ts";
import {loginRequest} from "/src/axios/api/loginApi.ts";
import {Login, LoginCondition} from "/src/axios/api/type/Login.ts";
import {useRouter} from "vue-router";
import {useLoginStore} from "/src/pinia/module/useLoginStore.ts";
import PhoneForm from "/src/components/login/form/PhoneForm.vue";
import Register from "/src/components/login/form/Register.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const router = useRouter()


const ruleFormRef_N = ref<FormInstance>()
const loading = ref(false);
const codeUrl = ref("");
const normalFormData = reactive({
  username: "胡詩涵",
  password: "123456",
  rememberMe: false,
  code: "",
  uuid: "",
  role: '',
  redirect: ''
});
const loginRules = reactive<FormRules>({
  username: [
    {required: true, trigger: "blur", message: "请输入您的账号"}
  ],
  password: [
    {required: true, trigger: "blur", message: "请输入您的密码"}
  ],
  code: [
    {required: true, trigger: "change", message: "请输入验证码"}
  ]
})

const getCode = () => {
  getCaptchaImageRequest().then((res: CaptchaImage) => {
    codeUrl.value = `data:image/gif;base64,${res.captchaImage}`;
    normalFormData.uuid = res.uuid;
  });
}
const getLocalStorage = () => {
  normalFormData.username = getItem<string>("username");
  normalFormData.password = getItem<string>("password");
  normalFormData.rememberMe = getItem<string>("rememberMe") && getItem<string>("rememberMe").trim() === 'true'
}

getCode()
getLocalStorage()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(isValid => {
    if (isValid) {
      loading.value = true;
      if (normalFormData.rememberMe) {
        setItem("username", normalFormData.username)
        setItem("password", normalFormData.password)
        setItem("rememberMe", String(normalFormData.rememberMe));
      } else {
        deleteItem("username");
        deleteItem("password");
        deleteItem('rememberMe');
      }
      loginRequest(new LoginCondition(normalFormData.username, normalFormData.password, normalFormData.code, normalFormData.uuid)).then((res: Login) => {
        if (res && res.token) {
          setItemWithExpiration(TokenKey, res.token, 60)
          router.push({path: normalFormData.redirect || "/workbench/analyse"}).then(() => {
            loading.value = false;
          }).catch(err => {
            ElMessage({
              message: `跳转失败${err}`,
              type: 'error',
            })
          })
        } else {
          loading.value = false;
          ElMessage({
            message: '您的账号密码输入有误或者内部服务器错误',
            type: 'error',
          })
        }
      }).catch(() => {
        loading.value = false;
        getCode();
      })
    } else {
      ElMessage({
        message: '信息没有填完哦',
        type: 'warning',
      })
    }
  })
}

const phoneForm = () => {
  useLoginStore().currentComponent = markRaw(PhoneForm);
  useResponsiveLayoutStore().formId = "login-phone-form"
}

const register = () => {
  useLoginStore().currentComponent = markRaw(Register);
  useResponsiveLayoutStore().formId = "register-form"
}
</script>

<style lang="scss" scoped>
#login-normal-form {
  border-radius: 20px;
  background-color: var(--el-bg-color);
  width: 400px;
  padding: 25px 25px 5px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-form-item {
    width: 100%;

    ::v-deep(input) {
      height: 38px;
    }
  }

  .input-short {
    width: 50%;
  }

  .code-flex-style {
    ::v-deep(.el-form-item__content) {
      display: flex;
      justify-content: flex-start;
    }
  }

  .remember-flex-style {
    ::v-deep(.el-form-item__content) {
      display: flex;
      justify-content: space-between;
    }
  }

  .center-flex-style {
    ::v-deep(.el-form-item__content) {
      display: flex;
      justify-content: center;
    }
  }

  .el-image {
    margin-left: 10%;
    width: 30%;
    height: 38px;
  }
}
</style>