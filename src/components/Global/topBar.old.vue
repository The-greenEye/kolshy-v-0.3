<template>
  <header class="kolshy-nav">
    <div class="top-promo-banner">
      Black Friday Sale - 50% OFF!
      <router-link to="/black-friday" class="shop-now-link">Shop Now</router-link>
    </div>

    <!-- Top Row: Search + Logo + Cart -->
    <div class="nav-top bg-light">
      <div class="nav-logo">
        <router-link to="/">
          <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Kolshy Logo" />
        </router-link>
      </div>

      <div class="d-flex align-items-center ml-4">
        <i class="bi bi-geo-alt" style="font-size: 28px"></i>
        <div class="p-0 d-flex flex-column">
          <p class="m-0">Deliver By</p>
          <b class="fw-bold mt-0">Egypt</b>
        </div>
      </div>

      <div class="nav-search">
        <el-input v-model="searchQuery" placeholder="Search...">
          <template #append>
            <el-button icon="el-icon-search" @click="onSearch" />
          </template>
        </el-input>
      </div>

      <div class="pr"></div>

      <div class="d-flex align-items-center">
        <div class="me-4">
          <router-link to="/Order"> Orders </router-link>
        </div>
        |
        <div class="nav-Affiliate me-4 ml-2">
          <router-link class="rounded-pill text-light d-flex" style="background: #e51748; padding: 0 10px 0 10px" to="/affiliate"> <i class="bi bi-coin me-2"></i> Affiliate </router-link>
        </div>
        |
        <div class="ml-2">
          <router-link to="/cart">
            <el-badge :value="0">
              <i class="bi bi-cart3" style="font-size: 30px; color: black"></i>
            </el-badge>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Menu -->
    <div class="nav-bottom">
      <el-menu mode="horizontal" background-color="#000336" text-color="#fff" active-text-color="#e51742" :default-active="$route.path">
        <el-menu-item index="/">
          <router-link to="/" class="menu-link">Home</router-link>
        </el-menu-item>

        <el-menu-item index="/deals">
          <router-link to="/deals" class="menu-link">Today's Deals</router-link>
        </el-menu-item>

        <el-menu-item index="/about">
          <router-link to="/about" class="menu-link">About Us</router-link>
        </el-menu-item>

        <!-- Profile Dropdown -->
        <el-menu-item v-if="in_or_out">
          Account
          <el-sub-menu index="profile" class="ml-auto">
            <template #title>
              <i class="bi bi-person-circle" style="margin-right: 8px"></i>
              {{ userName || "Account" }}
            </template>
            <el-menu-item v-if="userType === 'customer'">
              <router-link to="/customer/settings">Customer Settings</router-link>
            </el-menu-item>
            <el-menu-item v-else>
              <router-link to="/vendor/profile-settings">Vendor Settings</router-link>
            </el-menu-item>
            <el-menu-item @click="logout">Logout</el-menu-item>
          </el-sub-menu>
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const in_or_out = localStorage.getItem("tokenkolshy" || "tokenkolshyvendor");
const router = useRouter();
const searchQuery = ref("");
const userName = ref("");
const userType = ref("");
const cartCount = ref(0);
const collections = ref([]);

const onSearch = () => {
  if (searchQuery.value) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

const logout = () => {
  localStorage.removeItem("tokenkolshy");
  router.push("/login");
};

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("tokenkolshy");
    if (!token) return;
    const res = await axios.get("https://back.kolshy.ae/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    userName.value = res.data.data.name;
    userType.value = res.data.data.usertype; // 'customer' or 'vendor'
  } catch (e) {
    console.error("Profile fetch error:", e);
  }
};

onMounted(() => {
  fetchProfile();
  cartCount.value = JSON.parse(localStorage.getItem("cartItems") || "[]").length;
});
</script>

<style scoped>
/* Top Promo Banner */
.top-promo-banner {
  background-color: #000336;
  color: white;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.shop-now-link {
  color: #e51742;
  text-decoration: underline;
  margin-left: 10px;
  font-weight: bold;
}

.kolshy-nav {
  font-family: Arial, sans-serif;
}
.nav-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #000336;
}
.nav-logo img {
  height: 32px;
}
.nav-search {
  flex-grow: 1;
  margin: 0 20px;
}
.nav-cart {
  position: relative;
  color: white;
  font-size: 20px;
}
.cart-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #e51742;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-bottom {
  background-color: #000336;
}
.menu-link {
  color: inherit;
  text-decoration: none;
}
.ml-auto {
  margin-left: auto;
}
</style>
