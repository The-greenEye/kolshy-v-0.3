<template>
  <el-container class="admin-dashboard-container">
    <!-- Sidebar for desktop/tablet -->
    <el-aside
      v-show="!isMobile"
      width="220px"
      class="admin-sidebar"
    >
      <div class="p-3">
        <a class="navbar-brand d-flex align-items-center mb-4" href="#">
          <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Logo" class="img-fluid me-2" style="height: 36px;">
          <span class="badge bg-danger">SELLER</span>
        </a>
        <el-menu
          :default-active="activeView"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
        >
          <el-menu-item
            v-for="(item, index) in menuItems"
            :key="index"
            :index="item.text"
          >
            <i :class="item.icon + ' me-2'"></i>
            <span>{{ item.text }}</span>
          </el-menu-item>
        </el-menu>
        <div class="mt-4">
          <el-menu
            :default-active="activeAdmin"
            class="el-menu-vertical-demo"
            @select="handleAdminSelect"
          >
            <el-menu-item
              v-for="(item, index) in menuItemsAdmin"
              :key="index"
              :index="item.text"
            >
              <i :class="item.icon + ' me-2'"></i>
              <span>{{ item.text }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </el-aside>

    <!-- Main content area -->
    <el-container>
      <!-- Header -->
      <el-header class="admin-header d-flex align-items-center justify-content-between px-3 py-2">
        <form class="d-flex align-items-center border rounded-3 flex-grow-1 justify-content-center bg-white" style="max-width: 800px;padding: 0 20px">
          <i class="bi bi-search me-2" style="color: #e51748"></i>
          <input list="system" class="form-control border-0 rounded-pill outline-0" type="search" placeholder="Search ⊞₭">
          <datalist id="system">
            <option value="User">Users status and management</option>
            <option value="Products">Add or delete or update or accept a products</option>
            <option value="Orders">Management orders status accept or reject it</option>
            <option value="Finance">Charts</option>
          </datalist>
        </form>
        <div class="d-flex align-items-center ms-3">
          <div class="me-3">🇪🇬 EN</div>
          <el-avatar class="me-3 cursor" :src="avatarUrl" size="40"></el-avatar>
          <i class="bi bi-bell-fill fs-5" style="color: #000336"></i>
        </div>
      </el-header>

      <!-- Main Content -->
      <el-main class="admin-main-content">
        <BasicHome v-show="activeView === 'Dashboard'" />
        <KolshyProduct v-show="activeView === 'Products'" class="mt-4" />
        <contentManagement v-show="activeView === 'Content Management'" />
        <!-- Add more components and v-show conditions as needed -->
      </el-main>

      <!-- Bottom Nav for mobile -->
      <el-footer v-if="isMobile" height="60px" class="admin-bottom-nav">
        <el-row justify="space-around" align="middle" class="h-100">
          <el-col
            v-for="(item, index) in menuItems"
            :key="index"
            :span="4"
            class="text-center"
          >
            <button
              class="btn btn-link p-0 d-flex flex-column align-items-center"
              :class="{ 'text-danger': activeView === item.text }"
              @click="handleMenuSelect(item.text)"
              style="font-size: 1.3rem;"
            >
              <i :class="item.icon"></i>
              <span style="font-size: 0.7rem;">{{ item.textShort || item.text.split(' ')[0] }}</span>
            </button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BasicHome from "./setting/basic_home";
import KolshyProduct from "./setting/products_manage";
import contentManagement from "./setting/content_management";

export default {
  name: 'AdminDashboard',
  components: {
    BasicHome,
    KolshyProduct,
    contentManagement,
  },
  setup() {
    const activeView = ref('Dashboard');
    const activeAdmin = ref('');
    const isMobile = ref(window.innerWidth < 768);
    const avatarUrl = "http://gcraftupvc.in/assets/images/about/about-shape.png";

    const menuItems = [
      { icon: 'bi bi-grid-fill', text: 'Dashboard', textShort: 'Home' },
      { icon: 'bi bi-people-fill', text: 'User', textShort: 'User' },
      { icon: 'bi bi-bag-fill', text: 'Products', textShort: 'Prod' },
      { icon: 'bi bi-cart-fill', text: 'Orders Management', textShort: 'Orders' },
      { icon: 'bi bi-file-earmark-text-fill', text: 'Content Management', textShort: 'Content' },
      { icon: 'bi bi-graph-up', text: 'Finance', textShort: 'Finance' },
      { icon: 'bi bi-bar-chart-fill', text: 'Insights', textShort: 'Stats' },
      { icon: 'bi bi-headset', text: 'Support & Complaints', textShort: 'Help' },
    ];
    const menuItemsAdmin = [
      { icon: "bi bi-bell-fill fs-5", text: "Notifications" },
      { icon: "bi bi-gear fs-5", text: "Setting" },
      { icon: "bi bi-door-closed-fill fs-5", text: "Logout" }
    ];

    const handleMenuSelect = (index) => {
      activeView.value = index;
    };
    const handleAdminSelect = (index) => {
      activeAdmin.value = index;
    };

    // Responsive watcher
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      activeView,
      activeAdmin,
      menuItems,
      menuItemsAdmin,
      handleMenuSelect,
      handleAdminSelect,
      isMobile,
      avatarUrl,
    };
  }
};
</script>

<style scoped>
.admin-dashboard-container {
  min-height: 100vh;
  background: #f8f9fa;
}
.admin-sidebar {
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
  position: sticky;
  top: 0;
  z-index: 10;
  padding-bottom: 2rem;
}
.admin-header {
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}
.admin-main-content {
  padding: 1.5rem 1rem 1rem 1rem;
  min-height: 80vh;
}
.admin-bottom-nav {
  background: #fff;
  border-top: 1px solid #eee;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 100;
  height: 60px;
  padding: 0;
}
@media (max-width: 767px) {
  .admin-sidebar {
    display: none !important;
  }
  .admin-main-content {
    padding-bottom: 70px !important;
  }
}
</style>