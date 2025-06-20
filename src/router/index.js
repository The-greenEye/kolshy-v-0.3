import { createRouter, createWebHistory } from "vue-router";

// =====================
// User routes
// =====================
import HomeView from "../views/HomeView.vue";
import ForgetPass from "../views/Global/ForgetPass.vue";
import SigninView from "../views/User/auth/LoginView.vue";
import Register from "../views/User/auth/RegisterView.vue";
import CustomerSetting from "../views/User/setting/BasiceSetting.vue";
import CustomerAddressList from "../components/User/setting/addAddress.vue";
import ProfileCustomer from "../components/User/setting/profile.vue";
import LoginSecurityCus from "../components/User/setting/login&security.vue";
import YourOrders from "../components/User/setting/OrdersCustomer.vue";
import YourPayments from "../components/User/setting/MyPayments.vue";

// =====================
// Vendor routes
// =====================
import RegisterSeller from "../components/Vendor/auth/registerSeller.vue";
import SettingAccount from "../views/Vendor/setting/SettingProfile.vue";
import LoginSecurity from "../components/Vendor/setting/profile/login_profile.vue";
import DashboardVendor from "../components/Vendor/setting/profile/dashboard.vue";
import OrdersVendor from "../components/Vendor/setting/profile/orders.vue";
import PaymentsVendor from "../components/Vendor/setting/profile/payments.vue";
import SettingBuss from "../components/Vendor/setting/profile/setting_buss.vue";
import productVendor from "../components/Vendor/setting/profile/products.vue";
import AddProductVendor from "../components/Vendor/setting/profile/add_products.vue";
// TODO: Add more vendor features/components imports here as needed (e.g., Coupons, Analytics, Support, etc.)

// Admin routes
import AdminLog from "../views/Admin/auth/LoginAdmin.vue";
import HomeAdmin from "../views/Admin/HomeAdmin.vue";
import categoriesAdmin from "../components/Admin/setting/addCategories.vue";
import collectionsAdmin from "../components/Admin/setting/collections.vue";

// Affiliate system
import AffiliateDashboard from "../components/Marketing/AffiliateDashboard.vue";
import AffiliateLinks from "../components/Marketing/AffiliateLinks.vue";
import AffiliateStats from "../components/Marketing/AffiliateStats.vue";
import AffiliateSettings from "../components/Marketing/AffiliateSettings.vue";
import AffiliateNotifications from "../components/Marketing/AffiliateNotifications.vue";

// Affiliate Auth
const AffiliateRegister = () => import("../components/Marketing/AffiliateRegister.vue");
const AffiliateLogin = () => import("../components/Marketing/AffiliateLogin.vue");
const AffiliateForgotPassword = () => import("../components/Marketing/AffiliateForgotPassword.vue");
import AffiliatePayouts from "../components/Marketing/AffiliatePayouts.vue";
import AffiliateAdmin from "../components/Marketing/AffiliateAdmin.vue";

//Shop Page
import ShopView from "../views/shop/ShopView.vue"

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
  {
    path: "/setting",
    name: "setting",
    component: CustomerSetting,
  },
  {
    path: "/setting/addresses",
    name: "Address List",
    component: CustomerAddressList,
  },
  {
    path: "/setting/profile",
    name: "My Profile",
    component: ProfileCustomer,
  },
  {
    path: "/setting/login&security",
    name: "My Login & Security",
    component: LoginSecurityCus,
  },
  {
    path: "/setting/orders",
    name: "My Order",
    component: YourOrders,
  },
  {
    path: "/setting/mypayments",
    name: "My Payments",
    component: YourPayments,
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

  // Affiliate
  {
    path: "/affiliate",
    component: AffiliateDashboard,
  },
  {
    path: "/affiliate/dashboard",
    name: "AffiliateOverview",
    component: AffiliateStats,
  },
  {
    path: "/affiliate/links",
    name: "AffiliateLinks",
    component: AffiliateLinks,
  },
  {
    path: "/affiliate/stats",
    name: "AffiliateStats",
    component: AffiliateStats,
  },
  {
    path: "/affiliate/settings",
    name: "AffiliateSettings",
    component: AffiliateSettings,
  },
  {
    path: "/affiliate/notifications",
    name: "AffiliateNotifications",
    component: AffiliateNotifications,
  },
  {
    path: "/affiliate/register",
    name: "AffiliateRegister",
    component: AffiliateRegister,
  },
  {
    path: "/affiliate/login",
    name: "AffiliateLogin",
    component: AffiliateLogin,
  },
  {
    path: "/affiliate/forgot-password",
    name: "AffiliateForgotPassword",
    component: AffiliateForgotPassword,
  },
  {
    path: "/affiliate/payouts",
    name: "AffiliatePayouts",
    component: AffiliatePayouts,
  },
  {
    path: "/affiliate/admin",
    name: "AffiliateAdmin",
    component: AffiliateAdmin,
  },
  //Admin
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
  {
    path: "/admin/categories",
    name: "Add Categories",
    component: categoriesAdmin,
  },
  {
    path: "/admin/collections",
    name: "Add Collections",
    component: collectionsAdmin,
  },

  //Shop
  {
    path: "/shop",
    name: "Shop",
    component: ShopView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Affiliate tracking: parse ref and channel from URL and save to localStorage
router.beforeEach((to, from, next) => {
  const refId = to.query.ref || to.query.tag;
  const channel = to.query.channel;
  if (refId) {
    // Save affiliate ID
    localStorage.setItem('affiliate_ref', refId);
  }
  if (channel) {
    // Save channel/source
    localStorage.setItem('affiliate_channel', channel);
  }
  next();
});

export default router;
