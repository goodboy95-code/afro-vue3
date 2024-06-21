<template>
  <el-form id="register-form" ref="ruleFormRef_R" :model="registerFormData" :rules="loginRules">
    <h3>注册</h3>
    <el-form-item prop="username">
      <el-input v-model="registerFormData.username" clearable placeholder="用户名"
                prefix-icon="User" type="text">
      </el-input>
    </el-form-item>
    <el-form-item prop="phoneNumber">
      <el-input v-model="registerFormData.phoneNumber" clearable placeholder="手机号"
                prefix-icon="User" type="text">
      </el-input>
    </el-form-item>
    <el-form-item class="code-flex-style" prop="smsCode">
      <el-input v-model="registerFormData.smsCode" class="input-short" clearable placeholder="短信验证码"
                prefix-icon="Lock" show-password type="text">
      </el-input>
      <el-button :disabled="countdown > 0" style="width: 100px" @click="startCountdown">
        {{ countdown > 0 ? `${countdown}` : '获取验证码' }}
      </el-button>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerFormData.password" clearable placeholder="密码"
                prefix-icon="Lock" show-password
                type="text"
                @input="passwordStrength">
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input v-model="registerFormData.confirmPassword"
                clearable
                placeholder="确认密码"
                prefix-icon="Lock"
                show-password
                type="password"
      >
      </el-input>
    </el-form-item>
    <el-progress :format="format" :percentage="registerFormData.passwordStrength"></el-progress>
    <el-form-item>
      <el-button
          :loading="loading"
          size="default"
          style="width:100%;"
          type="primary"
          @click="submitForm(ruleFormRef_R)"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
          :loading="loading"
          size="default"
          style="width:100%;"
          @click="rebackForm"
      >
        <span>返 回</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {markRaw, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {useLoginStore} from "/src/pinia/module/useLoginStore.ts";
import NormalForm from "/src/components/login/form/NormalForm.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";
import {registerRequest, sendRequest} from "/src/axios/api/registerApi.ts";
import Utils from "/src/utils/Utils.ts";
import {RegisterCondition} from "/src/axios/api/type/Register.ts";
import {SmsInfo} from "/src/axios/api/type/SmsInfo.ts";
import {includes} from "lodash-es";

const ruleFormRef_R = ref<FormInstance>()
const loading = ref(false);
const countdown = ref(0);

const registerFormData = reactive({
  phoneNumber: "",
  smsCode: "",
  username: "",
  password: "",
  confirmPassword: "",
  passwordStrength: 0,
  uuid: ""
});

const loginRules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 1, max: 6, message: '用户名长度在 1 到 6 个字符', trigger: 'blur'},
    {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
  ],
  phoneNumber: [
    {required: true, message: '请输入电话号码', trigger: 'blur'},
    {pattern: /^\S*$/, message: '不能包含空格', trigger: 'blur'},
    {pattern: /^1[3456789]\d{9}$/, message: '电话号码格式不正确', trigger: 'blur'}
  ],
  smsCode: [
    {required: true, trigger: "change", message: "请输入短信验证码"}
  ],
  password: [
    {required: true, trigger: "change", message: "请输入您的密码"},
    {min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "change"},
    {type: "string", message: "密码只能包含字母和数字", trigger: "change"}],
  confirmPassword: [
    {required: true, trigger: "change", message: "请确认您的密码"},
    {
      validator: (rule, value, callback) => {
        if (value !== registerFormData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
})

const startCountdown = () => {
  if (Utils.isPhoneNumber(registerFormData.phoneNumber)) {
    if (countdown.value > 0) return;
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    if (!Utils.isEmpty(registerFormData.phoneNumber.trim())) {
      sendRequest(registerFormData.phoneNumber).then((res: SmsInfo) => {
        registerFormData.uuid = res.uuid;
        ElMessage.success(res.msg)
      })
    }
  } else {
    ElMessage.warning("请输入正确的手机号");
  }
};

const passwordStrength = (password: string) => {
  let strength = 0;
  if (password.length > 7) {
    strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
  }

  registerFormData.passwordStrength = strength;
  console.log(registerFormData.passwordStrength)
}

const format = (strength: number) => (strength > 80 ?
        "强" : strength > 40 ?
            "中" : strength > 20 ? "弱" : ''
)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(isValid => {
    if (isValid) {
      registerRequest(
          new RegisterCondition(
              registerFormData.username,
              registerFormData.password,
              registerFormData.phoneNumber,
              registerFormData.smsCode,
              registerFormData.uuid
          )).then((res) => {
            if (includes(res, "注册成功")) {
              ElMessage.success(res)
            }else {
              ElMessage.warning(res)
            }
          }
      )
    }
  });
}

const rebackForm = () => {
  useLoginStore().currentComponent = markRaw(NormalForm)
  useResponsiveLayoutStore().formId = "login-normal-form"
}
</script>

<style lang="scss" scoped>
#register-form {
  border-radius: 20px;
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
    width: 65%;
  }

  .code-flex-style {
    ::v-deep(.el-form-item__content) {
      display: flex;
      justify-content: space-between;
    }

    .el-button {
      height: 38px;
    }
  }

  .el-progress {
    margin-bottom: 15px;
    width: 100%;

    ::v-deep(.el-progress__text) {
      height: 14.4px;
    }
  }
}
</style>