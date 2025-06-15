<template>
  <el-card class="affiliate-settings-card">
    <div class="card-header">
      <i class="bi bi-gear"></i>
      <span>Settings</span>
    </div>
    <el-form :model="settings" label-width="120px" class="settings-form">
      <el-form-item label="Email Notifications">
        <el-switch v-model="settings.emailNotifications" />
      </el-form-item>
      <el-form-item label="Notification Email">
        <el-input v-model="settings.email" placeholder="Enter your email" />
      </el-form-item>
      <el-form-item label="Commission Threshold">
        <el-input-number v-model="settings.threshold" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSettings">Save</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'bootstrap-icons/font/bootstrap-icons.css';

const settings = ref({
  emailNotifications: true,
  email: 'user@example.com',
  threshold: 100,
});

function saveSettings() {
  ElMessage.success('Settings saved!');
}
</script>

<style scoped>
.affiliate-settings-card {
  box-shadow: 0 4px 24px 0 #e5174222;
  border-radius: 18px;
  background: #fff;
  animation: fadeIn 0.7s;
}
.card-header {
  color: #e51742;
  font-weight: bold;
  font-size: 1.4rem;
  letter-spacing: 1px;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.settings-form {
  margin-top: 1rem;
}
.el-form-item {
  margin-bottom: 1.2rem;
}
.el-button {
  background: linear-gradient(90deg, #e51742 60%, #ff5e62 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: transform 0.1s;
}
.el-button:active {
  transform: scale(0.96);
}
.el-input {
  border-radius: 8px;
  box-shadow: 0 1px 4px #e5174211;
  transition: box-shadow 0.2s;
}
.el-input:focus-within {
  box-shadow: 0 2px 8px #e5174222;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.affiliate-settings-card {
  max-width: 600px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
}
.settings-form {
  margin-top: 1rem;
}
@media (max-width: 600px) {
  .affiliate-settings-card {
    padding: 0.5rem;
  }
  .card-header {
    font-size: 1rem;
  }
}
</style>
