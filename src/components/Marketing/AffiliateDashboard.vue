<template>
  <!-- Mobile Top Navbar -->
  <div class="mobile-affiliate-navbar">
    <i class="bi bi-list" @click="drawerVisible = true"></i>
    <span class="mobile-affiliate-title">Affiliate</span>
    <span class="mobile-affiliate-user">{{ userName }}</span>
  </div>
  <!-- Sidebar as Drawer on Mobile -->
  <el-drawer v-model="drawerVisible" direction="ltr" size="220px" :with-header="false" class="mobile-sidebar-drawer">
    <el-menu :default-active="activeMenu" @select="handleMenuSelect" router>
      <el-menu-item index="dashboard">
        <i class="bi bi-house"></i>
        <span>Overview</span>
      </el-menu-item>
      <el-menu-item index="links">
        <i class="bi bi-link-45deg"></i>
        <span>Referral Links</span>
      </el-menu-item>
      <el-menu-item index="stats">
        <i class="bi bi-bar-chart"></i>
        <span>Statistics</span>
      </el-menu-item>
      <el-menu-item index="notifications">
        <i class="bi bi-bell"></i>
        <span>Notifications</span>
      </el-menu-item>
      <el-menu-item index="settings">
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>
  <el-container class="affiliate-dashboard">
    <!-- Desktop Sidebar -->
    <el-aside width="220px" class="dashboard-sidebar">
      <el-menu :default-active="activeMenu" @select="handleMenuSelect" router>
        <el-menu-item index="dashboard">
          <i class="bi bi-house"></i>
          <span>Overview</span>
        </el-menu-item>
        <el-menu-item index="links">
          <i class="bi bi-link-45deg"></i>
          <span>Referral Links</span>
        </el-menu-item>
        <el-menu-item index="stats">
          <i class="bi bi-bar-chart"></i>
          <span>Statistics</span>
        </el-menu-item>
        <el-menu-item index="notifications">
          <i class="bi bi-bell"></i>
          <span>Notifications</span>
        </el-menu-item>
        <el-menu-item index="settings">
          <i class="bi bi-gear"></i>
          <span>Settings</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="dashboard-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const activeMenu = ref('dashboard');
const drawerVisible = ref(false);

// Simulate user name (replace with real user data if available)
const userName = computed(() => {
  // You can fetch from store or props
  return 'Account';
});

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  drawerVisible.value = false; // Close drawer on mobile after selection
};
</script>

<style scoped>
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
