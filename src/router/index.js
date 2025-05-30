import { createRouter, createWebHistory } from "vue-router";

// User routes
import HomeView from "../views/HomeView.vue";
import ForgetPass from "../views/Global/ForgetPass.vue";
import SigninView from "../views/User/auth/LoginView.vue";
import Register from "../views/User/auth/RegisterView.vue";

// Vendor routes
import RegisterSeller from "../components/Vendor/auth/registerSeller.vue";
import SettingAccount from "../views/Vendor/setting/SettingProfile.vue";
import LoginSecurity from "../components/Vendor/setting/profile/login_profile.vue";
import DashboardVendor from "../components/Vendor/setting/profile/dashboard.vue";
import OrdersVendor from "../components/Vendor/setting/profile/orders.vue";
import PaymentsVendor from "../components/Vendor/setting/profile/payments.vue";
import SettingBuss from "../components/Vendor/setting/profile/setting_buss.vue";
import productVendor from "../components/Vendor/setting/profile/products.vue";
import AddProductVendor from "../components/Vendor/setting/profile/add_products.vue";

// Admin routes
import AdminLog from "../views/Admin/auth/LoginAdmin.vue";
import HomeAdmin from "../views/Admin/HomeAdmin.vue";

const routes = [
  // User
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/res_pass",
    name: "forgetPassword",
    component: ForgetPass,
  },
  {
    path: "/login",
    name: "login",
    component: SigninView,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },

  // Vendor
  {
    path: "/register_seller",
    name: "registerSeller",
    component: RegisterSeller,
  },
  {
    path: "/setting_profile",
    name: "settingProfile",
    component: SettingAccount,
  },
  {
    path: "/security",
    name: "loginSecurity",
    component: LoginSecurity,
  },
  {
    path: "/vendor_dashboard",
    name: "vendorDashboard",
    component: DashboardVendor,
  },
  {
    path: "/vendor_orders",
    name: "vendorOrders",
    component: OrdersVendor,
  },
  {
    path: "/vendor_payment",
    name: "vendorPayments",
    component: PaymentsVendor,
  },
  {
    path: "/setting_buss",
    name: "vendorBuss",
    component: SettingBuss,
  },
  {
    path: "/vendor_product",
    name: "vendorProduct",
    component: productVendor,
  },
  {
    path: "/add_product",
    name: "AddProducts",
    component: AddProductVendor,
  },

  // Admin
  {
    path: "/admin_login",
    name: "adminLogin",
    component: AdminLog,
  },
  {
    path: "/admin",
    name: "adminHome",
    component: HomeAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
