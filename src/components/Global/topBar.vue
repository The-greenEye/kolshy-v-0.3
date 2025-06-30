<template>
  <div>
    <div class="top-promo-banner">
      Black Friday Sale - 50% OFF!
      <router-link to="/black-friday" class="shop-now-link">Shop Now</router-link>
    </div>

    <header class="Kolshy-style-header d-none d-lg-flex flex-column p-0">
      <div class="header-top w-100 p-2 bg-light text-dark">
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

        <div class="search-container">
          <!-- Personal route link for user -->
          <div v-if="userType" class="my-route-link d-none d-lg-block">
            <router-link :to="myRoute" class="nav-item-link">{{ myRoute }}</router-link>
          </div>
          <input type="text" placeholder="What are you looking for?" class="search-input" />
          <v-btn class="search-v-btn p-0">
            <svg viewBox="0 0 24 24" class="search-icon">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </v-btn>
        </div>

        <div class="account-dropdown">
          <div class="dropdown-trigger">
            <span class="account-greeting">Hello, {{ userData.name || "Sign in" }}</span>
            <span class="account-text">Account & Lists</span>
          </div>
          <div class="dropdown-content">
            <div v-if="!userData.name">
              <router-link to="/login" class="signin-btn">Sign in</router-link>
              <p class="new-customer">New customer? <router-link to="/register">Start here</router-link></p>
            </div>
            <div v-else>
              <router-link v-if="userType === 'vendor'" to="/vendor_dashboard" class="dropdown-item">
                <i class="bi bi-shop me-2"></i> Your Seller Account
              </router-link>
              <router-link v-else to="/setting" class="dropdown-item">
                <i class="bi bi-person-circle me-2"></i> Your Account
              </router-link>
              <router-link v-if="userType === 'vendor'" to="/vendor_product" class="dropdown-item">
                <i class="bi bi-box-seam me-2"></i> Manage Products
              </router-link>
              <router-link v-if="userType === 'vendor'" to="/vendor_orders" class="dropdown-item">
                <i class="bi bi-bag-check-fill me-2"></i> Orders
              </router-link>
              <router-link v-if="userType === 'vendor'" to="/vendor_payment" class="dropdown-item">
                <i class="bi bi-cash-stack me-2"></i> Payments
              </router-link>
              <router-link v-if="userType === 'vendor'" to="/setting_buss" class="dropdown-item">
                <i class="bi bi-gear me-2"></i> Business Settings
              </router-link>
              <router-link v-if="userType === 'vendor'" to="/add_product" class="dropdown-item">
                <i class="bi bi-plus-circle-fill me-2"></i> Add Product
              </router-link>
              <router-link v-if="userType === 'customer'" to="/orders" class="dropdown-item">
                <i class="bi bi-receipt-cutoff me-2"></i> Your Orders
              </router-link>
            </div>
          </div>
        </div>

        <div class="returns-orders">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </div>

        <div class="cart-container" @mouseenter="openCart" @mouseleave="closeCart">
          <div class="cart-icon-wrapper">
            <span class="cart-count">{{ items.length }}</span>
            <svg viewBox="0 0 24 24" class="cart-icon">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span class="cart-text">Cart</span>
          </div>

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

      <nav class="header-bottom w-100">
        <ul class="nav-menu">
          <li class="nav-item">
            <el-dropdown trigger="hover" popper-class="amazon-dropdown-menu">
              <span class="el-dropdown-link">
                All
                <el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Electronics</el-dropdown-item>
                  <el-dropdown-item>Books</el-dropdown-item>
                  <el-dropdown-item>Fashion</el-dropdown-item>
                  <el-dropdown-item>Home & Kitchen</el-dropdown-item>
                  <el-dropdown-item divided>View All Categories</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li v-if="loadingCategories" class="nav-item"><el-spin size="small" /> Loading...</li>
            <li v-for="(category, index) in categories" :key="index" class="nav-item">
            <router-link :to="`/shop?category=${category}`">{{ category }}</router-link>
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

    <div class="mobile-header">
      <div class="d-flex align-items-center">
        <i @click="visible = true" class="bi bi-list fs-3"></i>
        <router-link to="/" class="mobile-logo">
          <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" alt="Logo" />
        </router-link>
      </div>
      <div class="d-flex">
        <div v-if="userType && userType === 'vendor'">
          <router-link to="/vendor_dashboard" class="text-dark">Vendor Dashboard</router-link>
        </div>
        <div v-else-if="userType && userType === 'customer'">
          <router-link to="/setting" class="text-dark">Customer Dashboard</router-link>
        </div>
        <div v-else>
          <router-link to="/login" class="text-dark">Sign in ▶ <i class="bi bi-person fs-3"></i></router-link>
        </div>
        <div class="mobile-cart">
          <span class="cart-badge">{{ items.length }}</span>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </div>
      <el-drawer size="80%" direction="ltr" v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">{{ userData.name || "Hello, Sign in" }}</h4>
          <el-button type="danger" @click="close">
            <el-icon><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </template>
        <div class="drawer-content">
          <div v-if="!userData.name" class="drawer-signin-section">
            <p>Welcome to Kolshy</p>
            <router-link to="/login" class="drawer-signin-btn">Sign in</router-link>
            <p class="drawer-new-customer">New customer? <router-link to="/register">Start here</router-link></p>
          </div>
          <div v-else class="drawer-user-menu">
            <router-link v-if="userType === 'vendor'" to="/vendor_dashboard" class="dropdown-item" @click="visible = false">
              <i class="bi bi-shop me-2"></i> Your Seller Account
            </router-link>
            <router-link v-else to="/setting" class="dropdown-item" @click="visible = false">
              <i class="bi bi-person-circle me-2"></i> Your Account
            </router-link>
            <router-link v-if="userType === 'customer'" to="/orders" class="dropdown-item" @click="visible = false">
              <i class="bi bi-box-seam me-2"></i> Your Orders
            </router-link>
             <router-link v-if="userType === 'customer'" to="/setting/addresses" class="dropdown-item" @click="visible = false">
              <i class="bi bi-house-door me-2"></i> Your Addresses
            </router-link>
            <div class="drawer-section-title">Shop by Category</div>
            <router-link v-for="category in categories" :key="category" :to="`/shop?category=${category}`" class="dropdown-item" @click="visible = false">
              <i class="bi bi-tag me-2"></i> {{ category }}
            </router-link>
            <router-link to="/customer-service" class="dropdown-item" @click="visible = false">
              <i class="bi bi-headset me-2"></i> Customer Service
            </router-link>
            <router-link to="/deals" class="dropdown-item" @click="visible = false">
              <i class="bi bi-fire me-2"></i> Today's Deals
            </router-link>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { ArrowDown, CircleCloseFilled } from '@element-plus/icons-vue';
import { useStoreCustomer, useStoreVendor } from "../../stores/app";
import axios from 'axios';

export default {
  name: "KolshyStyleHeader",
  components: {
    ArrowDown,
    CircleCloseFilled
  },
  data() {
    return {      
      customer: useStoreCustomer(),
      vendor: useStoreVendor(),
      isCartOpen: false, // تأكد من وجود هذه الخاصية هنا ومفتاحها false في البداية
      items: [],
      categories: ['Electronics', 'Books', 'Fashion', 'Home & Kitchen'],
      loadingCategories: false, // يمكنك تحديث هذه القائمة من API
      userData: [],
      userType: localStorage.typeIs || "",
      visible: false,
    };
  },
  computed: {
    /**
     * Compute personal route based on user type.
     */
    myRoute() {
      if (this.userType === 'vendor') return '/vendor_dashboard';
      if (this.userType === 'customer') return '/setting';
      return '/login';
    },
    cartTotal() {
      return this.items.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);
    },
  },
  methods: {
    getData() {
      if(localStorage.typeIs === "customer"){
        this.userData = this.customer.data
        this.userType = "customer"
      }else if (localStorage.typeIs === "vendor"){
        this.userData = this.vendor.data
        this.userType = "vendor"
      }else {
        this.userData = []
        this.userType = ""
      }
    },

    /**
     * Fetch categories from the API and update the categories list.
     */
    async getCategory() {
      this.loadingCategories = true;
      try {
        const resCategories = await axios.get("https://fakestoreapi.com/products");
        if ([200,201].includes(resCategories.status)) {
          // قم بتغيير .categroy إلى .category إذا كان اسم الخاصية في الـ API هو category
          const  category = resCategories.data.map((p) => p.category) 
          this.categories = [...new Set(category)]
        }
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching categories:", err);
        }
      } finally {
        this.loadingCategories = false;
      }
    },

    openCart() {
      this.isCartOpen = true;
      this.getCartItems();
    },

    closeCart() {
      this.isCartOpen = false;
    },

    /**
     * Load cart items from localStorage.
     */
    getCartItems() {
      this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
    },

    /**
     * Remove an item from the cart by its ID.
     * @param {number|string} itemId
     */
    removeFromCart(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(this.items));
      // تأكد أن this.alert موجودة أو قم بإزالتها
      // this.alert.showAlert("Item removed from cart", "success");
  }
  },
  mounted() {
    this.getCartItems();
    this.getCategory();
    this.getData();
  },
};
</script>

<style>
/* Personal route link styling */
.my-route-link .nav-item-link {
  color: #e51748;
  font-weight: bold;
  margin-left: 1rem;
  text-decoration: none;
}
.my-route-link .nav-item-link:hover {
  color: #ca2e52;
}

@media (max-width: 768px) {
  .my-route-link {
    display: none !important;
  }
}

*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif; /* خط عام نظيف */
}


/* Top Promo Banner (شريط الخصم العلوي) */
.top-promo-banner {
  background-color: #000336; /* لونك الأزرق الداكن */
  color: white; /* نص أبيض */
  text-align: center;
  padding: 8px 0;
  font-size: 13px; /* أصغر قليلاً مثل أمازون */
  font-weight: 500;
}
.shop-now-link {
  color: #e51748; /* لونك الأحمر المميز */
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
  transition: color 0.2s ease;
}
.shop-now-link:hover {
  color: #ca2e52; /* يتغير إلى لونك البرتقالي/الأحمر الغامق عند التمرير */
}

/* Main Header (الرأس الرئيسي لـ Kolshy - لسطح المكتب) */
.Kolshy-style-header {
  background-color: transparent; /* لونك الأزرق الداكن للخلفية الرئيسية للهيدر */
  color: #131313; /* لون النص الافتراضي للهيدر */
  padding: 0 15px; /* حشوة جانبية */
  box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* ظل خفيف */
  min-height: 60px; /* ارتفاع أدنى للهيدر */
  display: flex; /* تأكيد استخدام Flexbox هنا */
  align-items: center; /* محاذاة عمودية */
}

.header-top {
  display: flex; /* استخدام Flexbox للتخطيط */
  align-items: flex-end; /* محاذاة العناصر عموديًا نحو الأسفل (مثل أمازون) */
  max-width: 1500px; /* عرض أقصى للمحتوى */
  margin: 0 auto; /* توسيط المحتوى */
  padding: 5px 0; /* حشوة علوية وسفلية أقل لتضييق المساحة */
  flex-grow: 1; /* للسماح له بالنمو داخل الـ Kolshy-style-header */
}

/* العناصر الفردية في الهيدر (مثل شعار، توصيل، حساب، سلة) */
.header-top > div {
  padding: 8px 10px; /* حشوة موحدة للعناصر القابلة للتفاعل */
  border: 1px solid transparent; /* حدود شفافة لسهولة إضافة الـ hover effect */
  border-radius: 3px;
  transition: border-color 0.2s ease;
  cursor: pointer;
  box-sizing: border-box; /* لضمان أن الحشوة لا تزيد من عرض العنصر */
}
.header-top > div:hover {
  border-color: #fff; /* حدود بيضاء عند التمرير */
}


/* Logo */
.logo-container {
  margin-right: 10px; /* مسافة أقل للشعار */
  padding: 0;
  display: flex;
  align-items: center;
  height: 40px; /* ارتفاع حاوية الشعار */
}
.logo {
  height: 35px; /* ارتفاع أكبر للشعار */
  object-fit: contain;
  /* لا تغيير في الفلتر للحفاظ على ألوان شعارك */
}

/* Delivery Info (معلومات التوصيل) */
.delivery-info {
  display: flex;
  align-items: flex-end; /* لمحاذاة النص العلوي مع الأيقونة */
  margin-right: 15px;
}
.location-icon {
  width: 18px; /* حجم أصغر للأيقونة */
  height: 18px;
  fill: #000000; /* لون أبيض */
  margin-right: 4px;
  position: relative;
  top: -2px; /* تعديل دقيق للمحاذاة البصرية */
}
.delivery-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.delivery-to {
  font-size: 11px;
  color: #ccc;
}
.delivery-location {
  font-size: 13px;
  font-weight: bold;
  color: #050505;
}

/* Search Bar (شريط البحث) */
.search-container {
  display: flex;
  flex-grow: 1;
  margin: 0 15px;
  max-width: 800px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.search-container:focus-within {
  border-color: #ca2e52; /* لون برتقالي/أحمر غامق (hover color) عند التركيز */
  box-shadow: 0 0 0 3px rgba(202, 46, 82, 0.3); /* ظل حول الحدود */
}

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  border: none;
  font-size: 15px;
  outline: none;
  background-color: #fff;
  color: #141414;
}
.search-input::placeholder {
  color: #888;
}

.search-v-btn {
  background-color: #e51748 !important; /* لونك الأحمر المميز للزر */
  border: none;
  border-radius: 0 !important;
  min-width: 45px !important;
  width: 45px !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: none !important; /* لإزالة أي ظل افتراضي من Vuetify */
}
.search-v-btn:hover {
  background-color: #ca2e52 !important; /* لونك البرتقالي/الأحمر الغامق عند التمرير */
}

.search-icon {
  width: 20px;
  height: 20px;
  fill: #fff; /* أيقونة بيضاء */
}

/* Account Dropdown (القائمة المنسدلة للحساب) */
.account-dropdown {
  position: relative;
}
.dropdown-trigger {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.account-greeting {
  font-size: 11px;
  color: #ccc;
}
.account-text {
  font-size: 13px;
  font-weight: bold;
  color: #000000;
  white-space: nowrap;
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 280px;
  background: #fff;
  color: #141414;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  z-index: 1000;
  display: none;
}
.account-dropdown:hover .dropdown-content {
  display: block;
}

.signin-btn {
  display: block;
  background-color: #e51748; /* لونك الأحمر */
  color: #ffffff; /* نص أبيض */
  text-align: center;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.signin-btn:hover {
  background-color: #ca2e52; /* أحمر أغمق عند التمرير */
}

.new-customer {
  font-size: 12px;
  color: #555;
  margin: 0;
  text-align: center;
}
.new-customer a {
  color: #007185; /* أزرق للروابط الفرعية */
  text-decoration: none;
}
.new-customer a:hover {
  text-decoration: underline;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  color: #141414;
  text-decoration: none;
  font-size: 14px;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}
.dropdown-item:hover {
  background-color: #f0f2f5;
}
.dropdown-item svg, .dropdown-item i {
  fill: #555;
  color: #555;
  margin-right: 10px;
  width: 20px;
  height: 20px;
}


/* Returns & Orders (المرتجعات والطلبات) */
.returns-orders {
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}
.returns-text {
  font-size: 11px;
  color: #b3b3b3; /* نص أبيض */
}
.orders-text {
  font-size: 13px;
  font-weight: bold;
  color: #000000; /* نص أبيض */
}

/* Cart (السلة) */
.cart-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 5px;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: flex-end;
}

.cart-count {
  position: absolute;
  top: -5px;
  left: 15px;
  color: #e51748; /* لونك الأحمر لعداد السلة */
  font-size: 16px;
  font-weight: bold;
}

.cart-icon {
  width: 40px;
  height: 30px;
  fill: #0e0d0d; /* أيقونة عربة التسوق بيضاء */
}

.cart-text {
  font-size: 13px;
  font-weight: bold;
  color: #000000;
  white-space: nowrap;
}

.cart-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 320px;
  background: #fff;
  color: #141414;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  z-index: 1000;
  /* v-show في Vue سيتولى إخفاءها وإظهارها */
}

.empty-cart {
  text-align: center;
  padding: 20px 0;
}
.empty-cart p {
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
}
.shop-btn {
  display: inline-block;
  background-color: #e51748; /* لونك الأحمر */
  color: #fff; /* نص أبيض */
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.shop-btn:hover {
  background-color: #ca2e52;
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
  font-weight: bold;
}
.cart-price {
  font-weight: bold;
  color: #b12704; /* أحمر غامق للسعر (هذا لون أمازون، يمكنك تغييره للونك الأحمر إذا أردت) */
  font-size: 16px;
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
}
.cart-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}
.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.item-details {
  flex-grow: 1;
}
.item-title {
  font-size: 14px;
  color: #007185; /* أزرق للروابط داخل السلة */
  text-decoration: none;
  display: block;
  margin-bottom: 3px;
}
.item-title:hover {
  text-decoration: underline;
  color: #c45500;
}
.item-price {
  font-weight: bold;
  font-size: 14px;
  color: #141414;
}
.item-quantity {
  font-size: 12px;
  color: #555;
}
.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  align-self: center;
  color: #999;
}
.remove-btn:hover {
  color: #e51742; /* أحمر عند التمرير */
}
.remove-btn svg {
  fill: currentColor;
  width: 16px;
  height: 16px;
}

.view-cart-btn {
  display: block;
  text-align: center;
  background-color: #e51748; /* لونك الأحمر */
  color: #fff; /* نص أبيض */
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.view-cart-btn:hover {
  background-color: #ca2e52;
}

/* Secondary Navigation */
.header-bottom {
  background-color: #000336; /* لونك الأزرق الداكن */
  padding: 8px 0;
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
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border-color 0.2s ease;
}
.nav-item:hover {
  border-color: #fff;
}
.nav-item a, .el-dropdown-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* For Element Plus Dropdown */
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon--right {
  margin-left: 0 !important;
  color: #fff;
}
.el-dropdown-menu {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 4px;
}
.el-dropdown-menu__item {
  color: #141414;
  font-size: 14px;
  padding: 8px 15px;
}
.el-dropdown-menu__item:hover {
  background-color: #f0f2f5;
  color: #e51742; /* لونك الأحمر عند التمرير */
}

.black-friday-banner {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 15px;
  background-color: #e51748;
  color: #fff;
  font-weight: bold;
  height: auto;
}
.sale-text {
  margin-right: 8px;
  font-size: 14px;
}
.date-range {
  margin-right: 8px;
  font-size: 12px;
  color: #ccc;
}
.discount-text {
  color: #ffffff; /* لونك الأحمر للخصم */
  font-size: 15px;
}

/* Mobile Header */
.mobile-header {
  display: none;
  background-color: #000336;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
}
.mobile-header .d-flex {
  align-items: center;
}
.mobile-header .bi-list {
  color: #fff;
  margin-right: 10px;
}
.mobile-logo img {
  height: 35px;
  /* لا تغيير الفلتر */
}

.mobile-header .text-dark {
  color: #fff !important;
  text-decoration: none;
  font-size: 14px;
  margin-right: 10px;
  white-space: nowrap;
}
.mobile-header .bi-person {
  color: #fff;
  font-size: 24px !important;
}

.mobile-cart {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.mobile-cart .cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e51748; /* لونك الأحمر لعداد العربة في الجوال */
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.mobile-cart svg {
  fill: #fff; /* أيقونة العربة بيضاء في الجوال */
  width: 24px;
  height: 24px;
}

/* El-drawer specific styles */
.el-drawer__header {
  background-color: #000336; /* لونك الأزرق الداكن */
  color: #fff;
  padding: 15px;
  margin-bottom: 0;
}
.el-drawer__title {
  color: #fff;
  font-weight: bold;
}
.el-drawer__close-btn {
  color: #fff;
}
/* تنسيق محتوى الـ drawer */
.el-drawer__body {
  padding: 0;
}
.el-drawer__body .dropdown-item {
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.el-drawer__body .dropdown-item:last-child {
  border-bottom: none;
}
.el-drawer__body .dropdown-item:hover {
  background-color: #f0f2f5;
}


/* Responsive Styles */
@media (max-width: 1024px) {
  .delivery-info,
  .returns-orders {
    display: none;
  }
  .search-container {
    margin: 0 10px;
  }
  .account-dropdown {
    margin-right: 10px;
  }
  .header-top > div {
    padding: 8px 6px;
  }
}

@media (max-width: 768px) {
  .Kolshy-style-header {
    display: none !important;
  }
  .mobile-header {
    display: flex !important;
    background-color: #000336;
  }
  .top-promo-banner {
    font-size: 11px;
    padding: 4px 0;
  }
  .shop-now-link {
    margin-left: 5px;
  }
}

/* Override Vuetify button default styling */
.v-btn.search-v-btn {
  border-radius: 0 !important;
  min-width: 45px !important;
  width: 45px !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.v-btn__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>