<template>
  <el-card class="affiliate-auth-card">
    <div class="auth-header">
      <i class="bi bi-person"></i>
      <span>Affiliate Registration</span>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" @submit.prevent="onSubmit">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"  />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"  />
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone"  />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" show-password  />
      </el-form-item>
      <el-form-item label="Payment Info" prop="payment">
        <el-input v-model="form.payment" placeholder="e.g. PayPal or Bank details">
  <template #prefix>
    <i class="bi bi-credit-card"></i>
  </template>
</el-input>
      </el-form-item>
      <el-form-item label="Website/Channel URLs" prop="channels">
        <el-input v-model="form.channels" placeholder="e.g. https://youtube.com/yourchannel, https://yourblog.com" />
      </el-form-item>
      <el-form-item label="Tax Info" prop="taxInfo">
        <el-input v-model="form.taxInfo" placeholder="e.g. VAT, EIN, or N/A" />
      </el-form-item>
      <el-form-item prop="terms">
        <el-checkbox v-model="form.terms">
          I agree to the <a href="#" target="_blank">Affiliate Terms & Compliance</a>
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Register</el-button>
        <el-button type="text" @click="$router.push('/affiliate/login')">Already have an account?</el-button>
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
  name: '',
  email: '',
  phone: '',
  password: '',
  payment: '',
  channels: '',
  taxInfo: '',
  terms: false,
});
const rules = {
  name: [ { required: true, message: 'Name is required', trigger: 'blur' } ],
  email: [ { required: true, message: 'Email is required', trigger: 'blur' }, { type: 'email', message: 'Invalid email', trigger: 'blur' } ],
  phone: [ { required: true, message: 'Phone is required', trigger: 'blur' } ],
  password: [ { required: true, message: 'Password is required', trigger: 'blur' }, { min: 6, message: 'Min 6 characters', trigger: 'blur' } ],
  payment: [ { required: true, message: 'Payment info is required', trigger: 'blur' } ],
  channels: [ { required: true, message: 'Website/Channel URLs required', trigger: 'blur' } ],
  taxInfo: [ { required: true, message: 'Tax Info required', trigger: 'blur' } ],
  terms: [ { required: true, type: 'boolean', validator: (rule, value) => value === true, message: 'You must agree to the terms', trigger: 'change' } ],
};

function onSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Registration successful! (Demo)');
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
