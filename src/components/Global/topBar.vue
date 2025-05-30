<template>
  <div>
    <!-- Top Black Friday Banner -->
    <div class="top-promo-banner">
      Black Friday Sale - 50% OFF!
      <router-link to="/black-friday" class="shop-now-link">Shop Now</router-link>
    </div>

    <!-- Main Navigation -->
    <header class="Kolshy-style-header d-lg-block d-none p-0">
      <!-- Logo and Delivery Info -->
      <div class="header-top d-flex align-items-center">
        <div class="logo-container">
          <router-link to="/">
            <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Logo" class="logo" />
          </router-link>
        </div>

        <div class="delivery-info">
          <svg viewBox="0 0 24 24" class="location-icon">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <div class="delivery-text">
            <span class="delivery-to">Deliver to</span>
            <span class="delivery-location">Cairo</span>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <input type="text" placeholder="What are you looking for?" class="search-input" />
          <v-btn class="search-v-btn">
            <svg viewBox="0 0 24 24" class="search-icon">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </v-btn>
        </div>

        <!-- Account & Lists -->
        <div class="account-dropdown">
          <div class="dropdown-trigger">
            <span class="account-greeting">Hello, {{ userData || "Sign in" }}</span>
            <span class="account-text">Account & Lists</span>
          </div>
          <div class="dropdown-content">
            <div v-if="!userData">
              <router-link to="/login" class="signin-btn">Sign in</router-link>
              <p class="new-customer">New customer? <router-link to="/register">Start here</router-link></p>
            </div>
            <div v-else>
              <router-link v-if="!localStorage.vendor" to="/" class="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                Your Account
              </router-link>
              <router-link v-else to="/" class="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                Your Account
              </router-link>
              <router-link to="/orders" class="dropdown-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                </svg>
                Your Orders
              </router-link>
            </div>
          </div>
        </div>

        <!-- Returns & Orders -->
        <div class="returns-orders">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </div>

        <!-- Cart -->
        <div class="cart-container" @mouseenter="openCart" @mouseleave="closeCart">
          <div class="cart-icon-wrapper">
            <span class="cart-count">{{ items.length }}</span>
            <svg viewBox="0 0 24 24" class="cart-icon">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span class="cart-text">Cart</span>
          </div>

          <!-- Cart Dropdown -->
          <div class="cart-dropdown" v-show="isCartOpen">
            <div v-if="items.length === 0" class="empty-cart">
              <p>Your Kolshy Cart is empty</p>
              <router-link to="/shop" class="shop-btn">Shop today's deals</router-link>
            </div>
            <div v-else>
              <div class="cart-header">
                <h4>Recently added items</h4>
                <span class="cart-price">${{ cartTotal.toFixed(2) }}</span>
              </div>

              <div class="cart-items">
                <div v-for="(item, index) in items.slice(0, 3)" :key="index" class="cart-item">
                  <img :src="item.image || 'https://via.placeholder.com/80'" :alt="item.title" class="item-image" />
                  <div class="item-details">
                    <router-link :to="`/product/${item.id}`" class="item-title">{{ item.title }}</router-link>
                    <div class="item-price">${{ item.price.toFixed(2) }}</div>
                    <div class="item-quantity">Qty: {{ item.quantity || 1 }}</div>
                  </div>
                  <v-btn @click="removeFromCart(item.id)" class="remove-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </v-btn>
                </div>
              </div>

              <router-link to="/cart" class="view-cart-btn">View your cart</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Navigation -->
      <nav class="header-bottom w-100">
        <ul class="nav-menu">
          <li class="nav-item">
            <el-dropdown style="border: none">
              <span class="el-dropdown-link">
                All
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li v-for="(category, index) in categories" :key="index" class="nav-item">
            <router-link :to="`/shop?category=${category.slug}`">{{ category.name }}</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/deals">Today's Deals</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/customer-service">Customer Service</router-link>
          </li>
        </ul>

        <div class="black-friday-banner">
          <span class="sale-text">Black Friday Sale</span>
          <span class="date-range">Nov 20-30</span>
          <span class="discount-text">50% OFF</span>
        </div>
      </nav>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-header">
      <v-btn class="mobile-menu-btn" type="v-btn" data-bs-toggle="dropdown">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </v-btn>
      <div class="dropdown-menu">
        <router-link to="/" class="dropdown-item">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          Home
        </router-link>
        <router-link to="/shop" class="dropdown-item">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
          </svg>
          Your Orders
        </router-link>
        <router-link to="/my-account" class="dropdown-item">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
          </svg>
          My Account
        </router-link>
      </div>
      <router-link to="/" class="mobile-logo">
        <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Logo" />
      </router-link>

      <div class="mobile-cart">
        <span class="cart-badge">{{ items.length }}</span>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStoreApp } from "../../stores/app"; // Adjust the path to your actual Pinia store file
import { ArrowDown } from "@element-plus/icons-vue";
export default {
  name: "KolshyStyleHeader",
  data() {
    return {
      isCartOpen: false,
      items: [],
      userData: "",
      categories: [],
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },

  computed: {
    cartTotal() {
      return this.items.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);
    },
  },
  methods: {
    async fetchUserProfile() {
      try {
        const store = useStoreApp();
        const token = localStorage.tokenkolshy;
        if (!token) return;

        const response = await axios.get(`${store.baseUrl}${store.endPoint.globel.profile.show_profile}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.data) {
          this.userData = response.data.data.name;
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    },

    async fetchCategories() {
      try {
        const store = useStoreApp();
        const response = await axios.get(`${store.baseUrl}${store.endPoint.admin.categories.get_all}`);

        if (response.data?.data) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    },

    openCart() {
      this.isCartOpen = true;
      this.getCartItems();
    },

    closeCart() {
      this.isCartOpen = false;
    },

    getCartItems() {
      this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
    },

    removeFromCart(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(this.items));
      this.toast.success("Item removed from cart");
    },
  },

  mounted() {
    this.fetchUserProfile();
    this.fetchCategories();
    this.getCartItems();
  },
};
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

/* Main Header */
.Kolshy-style-header d-flex align-items-center {
  background-color: white;
  color: #141414;
  padding: 0 15px;
}

.header-top {
  display: flex;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  padding: 15px 0;
}

/* Logo */
.logo-container {
  margin-right: 20px;
}

.logo {
  height: 30px;
  object-fit: contain;
}

/* Delivery Info */
.delivery-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 8px;
  cursor: pointer;
}

.delivery-info:hover {
  outline: 1px solid #e51742;
  border-radius: 2px;
}

.location-icon {
  width: 20px;
  height: 20px;
  fill: #e51742;
  margin-right: 5px;
}

.delivery-text {
  display: flex;
  flex-direction: column;
}

.delivery-to {
  font-size: 12px;
  color: #cccccc;
}

.delivery-location {
  font-size: 14px;
  font-weight: bold;
}

/* Search Bar */
.search-container {
  display: flex;
  flex-grow: 1;
  margin: 0 20px;
  max-width: 800px;
}

.search-dropdown {
  width: 50px;
  background-color: #f3f3f3;
  border: 0.5px solid #f0eded;
  border-radius: 4px 0 0 4px;
  font-size: 12px;
  color: #010101;
  cursor: pointer;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  font-size: 15px;
  outline: none;
}

.search-v-btn {
  width: 45px;
  background-color: #e51742;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-icon {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* Account Dropdown */
.account-dropdown {
  position: relative;
  margin-right: 20px;
  padding: 8px;
  cursor: pointer;
}

.account-dropdown:hover {
  outline: 1px solid white;
  border-radius: 2px;
}

.dropdown-trigger {
  display: flex;
  flex-direction: column;
}

.account-greeting {
  font-size: 12px;
  color: #cccccc;
}

.account-text {
  font-size: 14px;
  font-weight: bold;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 100;
  display: none;
}

.account-dropdown:hover .dropdown-content {
  display: block;
}

.signin-btn {
  display: block;
  background-color: #e51742;
  color: #111;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  text-decoration: none;
}

.new-customer {
  font-size: 12px;
  color: #555;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: #111;
  text-decoration: none;
  font-size: 14px;
}

.dropdown-item svg {
  margin-right: 10px;
}

/* Returns & Orders */
.returns-orders {
  margin-right: 20px;
  padding: 8px;
  cursor: pointer;
}

.returns-orders:hover {
  outline: 1px solid white;
  border-radius: 2px;
}

.returns-text {
  font-size: 12px;
  color: #cccccc;
}

.orders-text {
  font-size: 14px;
  font-weight: bold;
}

/* Cart */
.cart-container {
  position: relative;
  padding: 8px;
  cursor: pointer;
}

.cart-container:hover {
  outline: 1px solid white;
  border-radius: 2px;
}

.cart-icon-wrapper {
  display: flex;
  align-items: flex-end;
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  left: 15px;
  color: #e51742;
  font-size: 16px;
  font-weight: bold;
}

.cart-icon {
  width: 40px;
  height: 30px;
  fill: #e51742;
}

.cart-text {
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
}

.cart-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  z-index: 100;
}

.empty-cart {
  text-align: center;
  padding: 20px 0;
}

.empty-cart p {
  margin-bottom: 15px;
  font-size: 14px;
}

.shop-btn {
  display: inline-block;
  background-color: #e51742;
  color: #111;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  text-decoration: none;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-header h4 {
  margin: 0;
  font-size: 16px;
}

.cart-price {
  font-weight: bold;
  color: #b12704;
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
}

.item-title {
  font-size: 14px;
  color: #0066c0;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
}

.item-title:hover {
  text-decoration: underline;
  color: #c45500;
}

.item-price {
  font-weight: bold;
  font-size: 14px;
}

.item-quantity {
  font-size: 12px;
  color: #555;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 5px;
  align-self: center;
}

.remove-btn svg {
  fill: #555;
}

.view-cart-btn {
  display: block;
  text-align: center;
  background-color: #ffd814;
  color: #111;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 15px;
  text-decoration: none;
}

/* Secondary Navigation */
.header-bottom {
  background-color: #000336;
  padding: 10px 0;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 1500px;
  margin: 0 auto;
}

.nav-item {
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
}

.nav-item:hover {
  outline: 1px solid white;
  border-radius: 2px;
}

.nav-item a {
  color: white;
  text-decoration: none;
}

.all-menu {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 20px;
  height: 20px;
  fill: #e51742;
  margin-right: 5px;
}

.black-friday-banner {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 15px;
  background-color: #e51742;
  color: #fff;
  font-weight: bold;
  height: 100%;
}

.sale-text {
  margin-right: 10px;
}

.date-range {
  margin-right: 10px;
  font-size: 14px;
}

.discount-text {
  color: #000000;
  font-size: 16px;
}

/* Mobile Header */
.mobile-header {
  display: none;
  background-color: #000336;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu-btn {
  background: none;
  border: none;
  padding: 5px;
}

.mobile-menu-btn svg {
  fill: white;
  width: 24px;
  height: 24px;
}

.mobile-logo img {
  height: 30px;
}

.mobile-cart {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e51742;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .delivery-info,
  .account-dropdown,
  .returns-orders {
    display: none;
  }

  .search-container {
    margin: 0 10px;
  }
}

@media (max-width: 768px) {
  .Kolshy-style-header d-flex align-items-center {
    display: none;
  }

  .mobile-header {
    display: flex;
  }

  .top-promo-banner {
    font-size: 12px;
    padding: 5px 0;
  }
}
</style>
