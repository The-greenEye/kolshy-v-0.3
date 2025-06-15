<template>
  <el-card class="affiliate-payouts-card">
    <div class="payouts-header">
      <i class="bi bi-cash-stack"></i>
      <span>Payouts</span>
    </div>
    <el-form :inline="true" @submit.prevent>
      <el-form-item label="Amount">
        <el-input v-model="payoutAmount" placeholder="Enter amount" />
      </el-form-item>
      <el-form-item label="Method">
        <el-select v-model="payoutMethod" placeholder="Select method">
          <el-option label="PayPal" value="paypal" />
          <el-option label="Bank" value="bank" />
          <el-option label="Wise" value="wise" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="requestPayout">Request Withdrawal</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-table :data="payouts" style="width: 100%; min-width: 320px;">
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="amount" label="Amount" />
      <el-table-column prop="method" label="Method" />
      <el-table-column prop="status" label="Status" />
    </el-table>
    <el-button class="export-btn" @click="exportCSV">Export to CSV</el-button>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'bootstrap-icons/font/bootstrap-icons.css';

const payoutAmount = ref('');
const payoutMethod = ref('');
const payouts = ref([
  { date: '2024-06-01', amount: '$100.00', method: 'PayPal', status: 'Paid' },
  { date: '2024-05-20', amount: '$50.00', method: 'Bank', status: 'Pending' },
]);

function requestPayout() {
  if (payoutAmount.value && payoutMethod.value) {
    ElMessage.success('Payout request submitted! (Demo)');
    payoutAmount.value = '';
    payoutMethod.value = '';
  } else {
    ElMessage.warning('Enter amount and select method');
  }
}

function exportCSV() {
  // Simple CSV export for demo
  const rows = [
    ['Date', 'Amount', 'Method', 'Status'],
    ...payouts.value.map(p => [p.date, p.amount, p.method, p.status])
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'payouts.csv';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.affiliate-payouts-card {
  max-width: 700px;
  margin: 2rem auto;
  box-shadow: 0 4px 24px #e5174222;
  border-radius: 18px;
  background: #fff;
  animation: fadeIn 0.7s;
}
.payouts-header {
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
.export-btn {
  margin-top: 1rem;
  float: right;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
