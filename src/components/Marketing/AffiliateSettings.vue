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
