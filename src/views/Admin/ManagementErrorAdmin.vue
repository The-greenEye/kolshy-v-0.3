<template>
  <el-container class="error-admin-container">
    <el-header>
      <h2>Error Management</h2>
      <el-button type="danger" @click="clearAll">Clear Errors</el-button>
    </el-header>
    <el-main>
      <el-table :data="errors" style="width: 100%">
        <el-table-column prop="time" label="Time" width="180" />
        <el-table-column prop="message" label="Message" />
        <el-table-column prop="info" label="Context" width="200" />
        <el-table-column prop="stack" label="Stack" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { useErrorStore } from '@/stores/error.js';
export default {
  name: 'ManagementErrorAdmin',
  setup() {
    const { errors, clearErrors } = useErrorStore();
    const clearAll = () => clearErrors();
    return { errors, clearAll };
  }
};
</script>

<style scoped>
.error-admin-container {
  padding: 16px;
  background: #f9f9f9;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.el-main {
  background: #fff;
  padding: 16px;
}
</style>
