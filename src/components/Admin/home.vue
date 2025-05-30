<template>
  <div class="d-flex basic_admin bg-light" style="height: 100dvh">
    <!-- Sidebar -->
    <aside class="bg-white border-end vh-100 position-fixed overflow-x-hidden" style="width: 250px;">
      <div class="p-3">
        <a class="navbar-brand d-flex align-items-center mb-4" href="#">
          <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Logo" class="img-fluid me-2" style="height: 40px;">
          <span class="badge bg-danger">SELLER</span>
        </a>
        <small class="text-muted text-uppercase">General</small>
        <ul class="nav flex-column mt-3">
          <li
            class="nav-item nav-link cursor-pointer"
            v-for="(item, index) in menuItems"
            :key="index"
            :id="item.text"
            :class="{ active: activeIndex === index }"
            @click="setActive(index, item.text, 'main')"
          >
            <b class="nav-link d-flex fw-bold align-items-center animate">
              <i :class="item.icon + ' me-2'" style="color: #e51748"></i>
              {{ item.text }}
            </b>
          </li>
        </ul>
        <small>Account</small>
        <ul class="nav flex-column mt-3">
          <li
            class="nav-item nav-link cursor-pointer"
            v-for="(item, index) in menuItemsAdmin"
            :key="index"
            :id="item.text"
            :class="{ active: activeIndex2 === index }"
            @click="setActive(index, item.text, 'admin')"
          >
            <b class="nav-link d-flex fw-bold align-items-center animate">
              <i :class="item.icon + ' me-2'" style="color: #e51748"></i>
              {{ item.text }}
            </b>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex-grow-1 ms-250">
      <!-- Header -->
      <header class="bg-light border-0 d-flex align-items-center justify-content-between px-4 py-2">
        <form class="d-flex align-items-center border rounded-3 flex-grow-1 justify-content-center bg-white" style="max-width: 800px;padding: 0 20px">
          <i class="bi bi-search me-2" style="color: #e51748"></i>
          <input list="system" class="form-control border-0 rounded-pill outline-0" type="search" placeholder="Search ⊞₭">
          <datalist id="system">
            <option value="User">
              Users status and management 
            </option>
            <option value="Products">
              Add or delete or update or accept a products
            </option>
            <option value="Orders">
              Management orders status accept or reject it
            </option>
            <option value="Finance">
              Charts
            </option>
          </datalist>
        </form>
        <div class="d-flex align-items-center ms-3">
          <div class="me-3">🇪🇬 EN</div>
          <v-avatar class="me-3 cursor" image="http://gcraftupvc.in/assets/images/about/about-shape.png" size="40"></v-avatar>
          <i class="bi bi-bell-fill fs-5" style="color: #000336"></i>
        </div>
      </header>

      <!-- Content -->
      <div>
        <BasicHome v-show="activeView === 'Dashboard'" />
        <KolshyProduct v-show="activeView === 'Products'" class="mt-4" />
        <contentManagement v-show="activeView === 'Content Management'" />
        <!-- Add more components and v-show conditions as needed -->
      </div>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      activeIndex: 0,
      activeIndex2: null,
      activeView: 'Dashboard',
      menuItems: [
        { icon: 'bi bi-grid-fill', text: 'Dashboard' },
        { icon: 'bi bi-people-fill', text: 'User' },
        { icon: 'bi bi-bag-fill', text: 'Products' },
        { icon: 'bi bi-cart-fill', text: 'Orders Management' },
        { icon: 'bi bi-file-earmark-text-fill', text: 'Content Management' },
        { icon: 'bi bi-graph-up', text: 'Finance' },
        { icon: 'bi bi-bar-chart-fill', text: 'Insights' },
        { icon: 'bi bi-headset', text: 'Support & Complaints' },
      ],
      menuItemsAdmin: [
        { icon: "bi bi-bell-fill fs-5", text: "Notifications" },
        { icon: "bi bi-gear fs-5", text: "Setting" },
        { icon: "bi bi-door-closed-fill fs-5", text: "Logout" }
      ]
    };
  },
  methods: {
    setActive(index, id, section) {
      if (section === 'main') {
        this.activeIndex = index;
        this.activeView = id;
      } else if (section === 'admin') {
        this.activeIndex2 = index;
      }
    }
  }
};
</script>

<style scoped>
.ms-250 {
  margin-left: 250px;
}

.nav-link:hover {
  color: rgb(19, 19, 19);
  transition: color 0.2s ease;
}

.nav-item {
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-link.active {
  background-color: #ffecf0;
  font-weight: bold;
  border-radius: 8px;
  transform: scale(1.02);
}
</style>
