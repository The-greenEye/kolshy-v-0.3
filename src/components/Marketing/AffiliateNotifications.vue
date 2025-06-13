<template>
  <el-card class="affiliate-notifications-card">
    <div class="card-header">
      <i class="bi bi-bell"></i>
      <span>Notifications</span>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, idx) in notifications"
        :key="idx"
        :timestamp="item.date"
        :color="item.type === 'success' ? 'green' : item.type === 'warning' ? 'orange' : 'gray'"
      >
        <i :class="item.icon" style="margin-right: 8px;"></i>{{ item.message }}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const notifications = ref([
  { date: '2024-06-01', message: 'You earned a $50 commission!', type: 'success', icon: 'bi bi-cash' },
  { date: '2024-05-28', message: 'New signup from your link.', type: 'info', icon: 'bi bi-person-plus' },
  { date: '2024-05-25', message: 'Commission threshold reached.', type: 'warning', icon: 'bi bi-exclamation-triangle' },
]);
</script>

<style scoped>
.affiliate-notifications-card {
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
@media (max-width: 600px) {
  .affiliate-notifications-card {
    padding: 0.5rem;
  }
  .card-header {
    font-size: 1rem;
  }
}
</style>
