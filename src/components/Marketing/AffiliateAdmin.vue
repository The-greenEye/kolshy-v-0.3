<template>
  <el-card class="affiliate-admin-card">
    <div class="admin-header">
      <i class="bi bi-shield-lock"></i>
      <span>Affiliate Admin Panel</span>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Affiliates" name="affiliates">
        <el-table :data="affiliates" style="width: 100%; min-width: 320px;">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="status" label="Status" />
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button size="small" @click="approve(scope.row)">Approve</el-button>
              <el-button size="small" type="danger" @click="ban(scope.row)">Ban</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Commissions" name="commissions">
        <!-- Commission Settings Component -->
        <AffiliateCommissionSettings />
      </el-tab-pane>
      <el-tab-pane label="Payouts" name="payouts">
        <el-table :data="payouts" style="width: 100%; min-width: 320px;">
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="amount" label="Amount" />
          <el-table-column prop="method" label="Method" />
          <el-table-column prop="status" label="Status" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const activeTab = ref('affiliates');
const affiliates = ref([
  { name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Approved' },
]);
const payouts = ref([
  { date: '2024-06-01', amount: '$100.00', method: 'PayPal', status: 'Paid' },
  { date: '2024-05-20', amount: '$50.00', method: 'Bank', status: 'Pending' },
]);
const globalCommission = ref(5);

function approve(row) {
  row.status = 'Approved';
}
function ban(row) {
  row.status = 'Banned';
}
</script>

<style scoped>
.affiliate-admin-card {
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 4px 24px #e5174222;
  border-radius: 18px;
  background: #fff;
  animation: fadeIn 0.7s;
}
.admin-header {
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
