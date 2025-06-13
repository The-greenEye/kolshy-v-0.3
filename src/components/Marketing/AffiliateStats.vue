<template>
  <el-card class="affiliate-stats-card">
    <div class="card-header">
      <i class="bi bi-bar-chart"></i>
      <span>Statistics</span>
    </div>
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="Clicks" :value="stats.clicks" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="Signups" :value="stats.signups" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="Sales" :value="stats.sales" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-statistic title="Commission" :value="stats.commission" prefix="$" />
      </el-col>
    </el-row>
    <el-divider />
    <el-table :data="history" style="width: 100%">
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="event" label="Event" />
      <el-table-column prop="amount" label="Amount" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const stats = ref({
  clicks: 1200,
  signups: 80,
  sales: 25,
  commission: 350.75,
});
const history = ref([
  { date: '2024-06-01', event: 'Sale', amount: '$50.00' },
  { date: '2024-05-28', event: 'Signup', amount: '$0.00' },
  { date: '2024-05-25', event: 'Sale', amount: '$30.00' },
]);
</script>

<style scoped>
.affiliate-stats-card {
  max-width: 900px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
}
.stats-row {
  margin-bottom: 2rem;
}
@media (max-width: 600px) {
  .affiliate-stats-card {
    padding: 0.5rem;
  }
  .card-header {
    font-size: 1rem;
  }
}
</style>
