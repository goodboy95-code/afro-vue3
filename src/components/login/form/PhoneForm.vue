<template>
  <el-form ref="ruleFormRef_P" :model="phoneFormData" :rules="loginRules" id="login-phone-form">
    <h3>手机登录</h3>
    <el-form-item prop="phoneNumber">
      <el-input v-model="phoneFormData.phoneNumber" clearable placeholder="手机号"
                prefix-icon="User" type="text">
      </el-input>
    </el-form-item>
    <el-form-item class="code-flex-style" prop="SMSVerificationCode">
      <el-input v-model="phoneFormData.SMSVerificationCode" class="input-short" clearable placeholder="短信验证码"
                prefix-icon="Lock" show-password type="text">
      </el-input>
      <el-button :disabled="countdown > 0" @click="startCountdown">
        {{ countdown > 0 ? `${countdown} 秒后重新获取` : '获取验证码' }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
          :loading="loading"
          size="default"
          style="width:100%;"
          type="primary"
          @click="submitForm(ruleFormRef_P)"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
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
import {FormInstance, FormRules} from "element-plus";
import {useLoginStore} from "/src/pinia/module/useLoginStore.ts";
import NormalForm from "/src/components/login/form/NormalForm.vue";
import {useResponsiveLayoutStore} from "/src/pinia/module/useResponsiveLayoutStore.ts";

const ruleFormRef_P = ref<FormInstance>()
const loading = ref(false);
const countdown = ref(0);

const phoneFormData = reactive({
  phoneNumber: "胡詩涵",
  SMSVerificationCode: "",
});

const loginRules = reactive<FormRules>({
  phoneNumber: [
    {required: true, trigger: "blur", message: "请输入您的手机号"}
  ],
  SMSVerificationCode: [
    {required: true, trigger: "change", message: "请输入短信验证码"}
  ]
})

const startCountdown = () => {
  if (countdown.value > 0) return;

  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
}

const rebackForm = () => {
  useLoginStore().currentComponent = markRaw(NormalForm)
  useResponsiveLayoutStore().formId = "login-normal-form"
}

</script>

<style lang="scss" scoped>
#login-phone-form {
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
}

</style>