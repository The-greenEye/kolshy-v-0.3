<template>
  <el-card class="affiliate-auth-card">
    <div class="auth-header">
      <i class="bi bi-unlock"></i>
      <span>Forgot Password</span>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" @submit.prevent="onSubmit">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email">
  <template #prefix>
    <i class="bi bi-envelope"></i>
  </template>
</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Send Reset Link</el-button>
        <el-button type="text" @click="$router.push('/affiliate/login')">Back to login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'bootstrap-icons/font/bootstrap-icons.css';

const formRef = ref();
const form = ref({
  email: '',
});
const rules = {
  email: [ { required: true, message: 'Email is required', trigger: 'blur' }, { type: 'email', message: 'Invalid email', trigger: 'blur' } ],
};

function onSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Reset link sent! (Demo)');
      // TODO: Connect to backend
    }
  });
}
</script>

<style scoped>
.affiliate-auth-card {
  max-width: 420px;
  margin: 2rem auto;
  box-shadow: 0 4px 24px #e5174222;
  border-radius: 18px;
  background: #fff;
  animation: fadeIn 0.7s;
}
.auth-header {
  color: #e51742;
  font-weight: bold;
  font-size: 1.3rem;
  letter-spacing: 1px;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
