<template>
  <div>
  <!-- Mobile Top Navbar -->
  <div class="mobile-affiliate-navbar">
    <i class="bi bi-list" @click="drawerVisible = true"></i>
    <span class="mobile-affiliate-title">Affiliate</span>
    <span class="mobile-affiliate-user">{{ userName }}</span>
  </div>
  <!-- Sidebar as Drawer on Mobile -->
  <el-drawer v-model="drawerVisible" direction="ltr" size="220px" :with-header="false" class="mobile-sidebar-drawer">
      <el-menu :default-active="activeMenu" @select="handleMenuSelect" router>
        <el-menu-item index="dashboard" @click="$router.push('/affiliate/dashboard')">
          <i class="me-3 bi bi-house"></i>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="links" @click="$router.push('/affiliate/links')">
          <i class="me-3 bi bi-link-45deg"></i>
          <span>Links</span>
        </el-menu-item>
        <el-menu-item index="payouts" @click="$router.push('/affiliate/payouts')">
          <i class="me-3 bi bi-cash-stack"></i>
          <span>Payouts</span>
        </el-menu-item>
        <el-menu-item index="register" @click="$router.push('/affiliate/register')">
          <i class="me-3 bi bi-person-plus"></i>
          <span>Register</span>
        </el-menu-item>
        <el-menu-item index="admin" @click="$router.push('/affiliate/admin')">
          <i class="me-3 bi bi-shield-lock"></i>
          <span>Admin Panel</span>
        </el-menu-item>
      </el-menu>
</el-drawer>
  <el-container class="affiliate-dashboard">
    <!-- Desktop Sidebar -->
    <el-aside width="220px" class="dashboard-sidebar">
      <el-menu :default-active="activeMenu" @select="handleMenuSelect" router>
        <el-menu-item index="home" class="d-flex justify-content-between" @click="$router.push('/')">
          <el-avatar size="larg" src="circleUrl.png" />
          <small>User Name</small>
        </el-menu-item>
        <el-menu-item index="dashboard" @click="$router.push('/affiliate/dashboard')">
          <i class="me-3 bi bi-house"></i>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="links" @click="$router.push('/affiliate/links')">
          <i class="me-3 bi bi-link-45deg"></i>
          <span>Links</span>
        </el-menu-item>
        <el-menu-item index="payouts" @click="$router.push('/affiliate/payouts')">
          <i class="me-3 bi bi-cash-stack"></i>
          <span>Payouts</span>
        </el-menu-item>
        <el-menu-item index="register" @click="$router.push('/affiliate/register')">
          <i class="me-3 bi bi-person-plus"></i>
          <span>Register</span>
        </el-menu-item>
        <el-menu-item index="admin" @click="$router.push('/affiliate/admin')">
          <i class="me-3 bi bi-shield-lock"></i>
          <span>Admin Panel</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="dashboard-main">
      <!-- Real-Time Metrics Widgets -->
      <div class="metrics-cards">
        <el-row :gutter="16">
          <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="(metric, key) in metrics" :key="key">
            <el-card class="overview-card simple">
              <div class="label">{{ metric.label }}</div>
              <div class="value">{{ metric.value }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- Simple Grid Overview -->
      <div class="dashboard-grid">
        <div class="dashboard-main-grid">
          <div class="main-left">
            <el-card class="link-generator-card simple">
              <div class="link-generator-header">
                <i class="bi bi-link-45deg"></i>
                <span>Generate Referral Link</span>
              </div>
              <el-form :inline="true" @submit.prevent>
                <el-form-item label="Product ID">
                  <el-input v-model="productId" placeholder="Enter Product ID" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="generateLink">Generate</el-button>
                </el-form-item>
              </el-form>
              <div v-if="referralLink" class="generated-link">
                <el-input :model-value="referralLink" readonly>
                  <template #suffix>
                    <i class="bi bi-clipboard" style="cursor:pointer" @click="copyToClipboard(referralLink)"></i>
                  </template>
                </el-input>
              </div>
            </el-card>
            <el-card class="dashboard-chart-card simple">
              <div class="chart-header">
                <i class="bi bi-bar-chart"></i>
                <span>Clicks vs Sales</span>
              </div>
              <canvas id="affiliateChart" height="120"></canvas>
            </el-card>
          </div>
          <div class="main-right">
            <el-card class="dashboard-table-card simple">
              <div class="table-header">
                <i class="bi bi-people"></i>
                <span>Referrals & Commissions</span>
              </div>
              <el-table :data="referrals" style="width: 100%; min-width: 320px;">
                <el-table-column prop="name" label="Referral" />
                <el-table-column prop="date" label="Date" />
                <el-table-column prop="amount" label="Commission" />
              </el-table>
            </el-card>
            <el-card class="payout-request-card simple">
              <div class="payout-header">
                <i class="bi bi-cash-stack"></i>
                <span>Payout Request</span>
              </div>
              <el-form :inline="true" @submit.prevent>
                <el-form-item label="Amount">
                  <el-input v-model="payoutAmount" placeholder="Enter amount" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="requestPayout">Request</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
      <router-view />
    </el-main>
  </el-container>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import 'bootstrap-icons/font/bootstrap-icons.css';

const activeMenu = ref('dashboard');
const drawerVisible = ref(false);
const productId = ref('');
const referralLink = ref('');
const payoutAmount = ref('');
const referrals = ref([  
  { name: 'John Doe', date: '2024-06-01', amount: '$25.00' },
]);

// Real-time metrics demo
const metrics = ref([
  { label: 'Earnings (Today)', value: '$150.00' },
  { label: 'Clicks', value: '320' },
  { label: 'Orders', value: '12' },
  { label: 'Conversion Rate', value: '3.75%' },
  { label: 'Earnings (Month)', value: '$1,250.00' },
]);

// Simulate user name (replace with real user data if available)
const userName = computed(() => {
  // You can fetch from store or props
  return 'Account';
});

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  drawerVisible.value = false; // Close drawer on mobile after selection
};

function generateLink() {
  if (productId.value) {
    referralLink.value = `https://kolshy.com/product/${productId.value}?ref=AFF123`;
    ElMessage.success('Referral link generated!');
  } else {
    ElMessage.warning('Enter a product ID');
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  ElMessage.success('Copied to clipboard!');
}

function requestPayout() {
  if (payoutAmount.value && parseFloat(payoutAmount.value) > 0) {
    ElMessage.success('Payout request submitted! (Demo)');
    payoutAmount.value = '';
  } else {
    ElMessage.warning('Enter a valid amount');
  }
}

// Chart demo
onMounted(() => {
  if (window.Chart) {
    const ctx = document.getElementById('affiliateChart');
    if (ctx) {
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            { label: 'Clicks', data: [120, 200, 150, 170, 220, 180, 210], borderColor: '#e51742', fill: false },
            { label: 'Sales', data: [10, 15, 8, 12, 18, 14, 16], borderColor: '#36a2eb', fill: false },
          ],
        },
        options: { responsive: true, plugins: { legend: { display: true } } },
      });
    }
  }
});
</script>

<style scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}
.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin: 1.5rem;
}
.overview-card.simple {
  background: #fff;
  border-radius: 12px;
  margin: 0.8rem;
  box-shadow: 0 2px 8px #e5174211;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
  transition: box-shadow 0.2s, transform 0.2s;
}
.overview-card.simple:hover {
  box-shadow: 0 4px 16px #e5174222;
  transform: translateY(-2px) scale(1.03);
}
.overview-card .label {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}
.overview-card .value {
  color: #e51742;
  font-size: 1.5rem;
  font-weight: bold;
}
.dashboard-main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.main-left, .main-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.link-generator-card.simple,
.dashboard-chart-card.simple,
.dashboard-table-card.simple,
.payout-request-card.simple {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e5174211;
  padding: 1.2rem 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.link-generator-card.simple:hover,
.dashboard-chart-card.simple:hover,
.dashboard-table-card.simple:hover,
.payout-request-card.simple:hover {
  box-shadow: 0 4px 16px #e5174222;
  transform: translateY(-2px) scale(1.01);
}
.link-generator-header, .chart-header, .table-header, .payout-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #e51742;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.generated-link {
  margin-top: 0.7rem;
}
@media (max-width: 900px) {
  .dashboard-main-grid {
    grid-template-columns: 1fr;
  }
  .main-left, .main-right {
    gap: 1.2rem;
  }
}
@media (max-width: 600px) {
  .overview-cards {
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
  }
  .dashboard-main-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.affiliate-dashboard {
  background: linear-gradient(135deg, #f3eeee 0%, #f9f9fb 100%);
  animation: fadeIn 0.7s;
}
.dashboard-sidebar {
  background: linear-gradient(135deg, #fff 60%, #e517421a 100%);
  box-shadow: 2px 0 12px 0 #e5174222;
  transition: box-shadow 0.3s;
}
.dashboard-sidebar .el-menu {
  border: none;
  background: transparent;
}
.dashboard-sidebar .el-menu-item {
  margin: 6px 0;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  font-weight: bold; 
}
.dashboard-sidebar .el-menu-item.is-active {
  background: #e51742;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 8px #e5174233;
}
.dashboard-sidebar .el-menu-item:hover {
  background: #e517421a;
  color: #e51742;
}
.dashboard-main {
  padding: 2rem 1rem;
  animation: slideInUp 0.7s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.affiliate-dashboard {
  min-height: 100vh;
  background: var(--el-bg-color);
}
.dashboard-sidebar {
  background: var(--el-color-primary-light-9);
  min-height: 100vh;
  border-right: 1px solid var(--el-border-color-light);
}
.dashboard-main {
  padding: 2rem 1rem;
}
@media (max-width: 768px) {
  .affiliate-dashboard {
    flex-direction: column;
  }
  .dashboard-sidebar {
    display: none !important;
  }
  .mobile-affiliate-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--el-color-primary-light-9);
    padding: 0.7rem 1rem;
    border-bottom: 1px solid var(--el-border-color-light);
    position: sticky;
    top: 0;
    z-index: 1001;
  }
  .mobile-affiliate-navbar .bi-list {
    font-size: 2rem;
    cursor: pointer;
  }
  .mobile-affiliate-title {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .mobile-affiliate-user {
    font-size: 1rem;
    color: var(--el-color-primary);
    font-weight: 500;
  }
  .mobile-sidebar-drawer {
    z-index: 2000;
  }
}

@media (min-width: 769px) {
  .mobile-affiliate-navbar {
    display: none;
  }
  .mobile-sidebar-drawer {
    display: none;
  }
}
</style>
