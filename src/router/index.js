import { createRouter, createWebHistory } from 'vue-router';

// Lazy-loaded route components
const HomeView = () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue');
const ForgetPass = () => import(/* webpackChunkName: "forget-pass" */ '../views/Global/ForgetPass.vue');
const SigninView = () => import(/* webpackChunkName: "login" */ '../views/User/auth/LoginView.vue');
const RegisterView = () => import(/* webpackChunkName: "register" */ '../views/User/auth/RegisterView.vue');
const CustomerSetting = () => import(/* webpackChunkName: "customer-setting" */ '../views/User/setting/BasiceSetting.vue');
const CustomerAddressList = () => import(/* webpackChunkName: "customer-address" */ '../components/User/setting/addAddress.vue');
const ProfileCustomer = () => import(/* webpackChunkName: "customer-profile" */ '../components/User/setting/profile.vue');
const LoginSecurityCus = () => import(/* webpackChunkName: "customer-security" */ '../components/User/setting/login&security.vue');
const YourOrders = () => import(/* webpackChunkName: "customer-orders" */ '../components/User/setting/OrdersCustomer.vue');
const YourPayments = () => import(/* webpackChunkName: "customer-payments" */ '../components/User/setting/MyPayments.vue');
const YourMessages = () => import(/* webpackChunkName: "customer-messages" */ '../components/User/setting/MyMessages.vue');

// Vendor routes
const RegisterSeller = () => import(/* webpackChunkName: "register-seller" */ '../components/Vendor/auth/registerSeller.vue');
const SettingAccount = () => import(/* webpackChunkName: "vendor-setting" */ '../views/Vendor/setting/SettingProfile.vue');
const LoginSecurity = () => import(/* webpackChunkName: "vendor-security" */ '../components/Vendor/setting/profile/login_profile.vue');
const DashboardVendor = () => import(/* webpackChunkName: "vendor-dashboard" */ '../components/Vendor/setting/profile/dashboard.vue');
const OrdersVendor = () => import(/* webpackChunkName: "vendor-orders" */ '../components/Vendor/setting/profile/orders.vue');
const PaymentsVendor = () => import(/* webpackChunkName: "vendor-payments" */ '../components/Vendor/setting/profile/payments.vue');
const SettingBuss = () => import(/* webpackChunkName: "vendor-business" */ '../components/Vendor/setting/profile/setting_buss.vue');
const ProductVendor = () => import(/* webpackChunkName: "vendor-products" */ '../components/Vendor/setting/profile/products.vue');
const AddProductVendor = () => import(/* webpackChunkName: "vendor-add-product" */ '../components/Vendor/setting/profile/add_products.vue');
const AddPaymentMethod = () => import(/* webpackChunkName: "vendor-add-payment" */ '../components/Vendor/setting/profile/add_payment_method.vue');

// Affiliate routes
const AffiliateDashboard = () => import(/* webpackChunkName: "affiliate-dashboard" */ '../components/Marketing/AffiliateDashboard.vue');
const AffiliateStats = () => import(/* webpackChunkName: "affiliate-stats" */ '../components/Marketing/AffiliateStats.vue');
const AffiliateLinks = () => import(/* webpackChunkName: "affiliate-links" */ '../components/Marketing/AffiliateLinks.vue');
const AffiliateSettings = () => import(/* webpackChunkName: "affiliate-settings" */ '../components/Marketing/AffiliateSettings.vue');
const AffiliateNotifications = () => import(/* webpackChunkName: "affiliate-notifications" */ '../components/Marketing/AffiliateNotifications.vue');
const AffiliatePayouts = () => import(/* webpackChunkName: "affiliate-payouts" */ '../components/Marketing/AffiliatePayouts.vue');
const AffiliateAdmin = () => import(/* webpackChunkName: "affiliate-admin" */ '../components/Marketing/AffiliateAdmin.vue');
const AffiliateRegister = () => import(/* webpackChunkName: "affiliate-register" */ '../components/Marketing/AffiliateRegister.vue');
const AffiliateLogin = () => import(/* webpackChunkName: "affiliate-login" */ '../components/Marketing/AffiliateLogin.vue');
const AffiliateForgotPassword = () => import(/* webpackChunkName: "affiliate-forgot" */ '../components/Marketing/AffiliateForgotPassword.vue');

// Admin routes
const AdminLog = () => import(/* webpackChunkName: "admin-login" */ '../views/Admin/auth/LoginAdmin.vue');
const HomeAdmin = () => import(/* webpackChunkName: "admin-home" */ '../views/Admin/HomeAdmin.vue');
const CategoriesAdmin = () => import(/* webpackChunkName: "admin-categories" */ '../components/Admin/setting/addCategories.vue');
const CollectionsAdmin = () => import(/* webpackChunkName: "admin-collections" */ '../components/Admin/setting/collections.vue');
const ManagementErrorAdmin = () => import(/* webpackChunkName: "admin-errors" */ '../views/Admin/ManagementErrorAdmin.vue');
const AddLanguage = () => import(/* webpackChunkName: "admin-languages" */ '../components/Admin/AddLanguage.vue');
const AddProductAdmin = () => import(/* webpackChunkName: "admin-products" */ '../components/Admin/AddProductAdmin.vue');
const UsersManagement = () => import(/* webpackChunkName: "admin-users" */ '../components/Admin/UsersManagement.vue');

// Shop
const ShopView = () => import(/* webpackChunkName: "shop" */ '../views/shop/ShopView.vue');

const routes = [
  // User
  { path: '/', name: 'home', component: HomeView },
  { path: '/res_pass', name: 'forgetPassword', component: ForgetPass },
  { path: '/login', name: 'login', component: SigninView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/setting', name: 'setting', component: CustomerSetting },
  { path: '/setting/addresses', name: 'AddressList', component: CustomerAddressList },
  { path: '/setting/profile', name: 'MyProfile', component: ProfileCustomer },
  { path: '/setting/login&security', name: 'MySecurity', component: LoginSecurityCus },
  { path: '/setting/orders', name: 'MyOrders', component: YourOrders },
  { path: '/setting/mypayments', name: 'MyPayments', component: YourPayments },
  { path: '/setting/mymessages', name: 'MyMessages', component: YourMessages },

  // Vendor
  { path: '/register_seller', name: 'registerSeller', component: RegisterSeller },
  { path: '/setting_profile', name: 'settingProfile', component: SettingAccount },
  { path: '/security', name: 'loginSecurity', component: LoginSecurity },
  { path: '/vendor_dashboard', name: 'vendorDashboard', component: DashboardVendor },
  { path: '/vendor_orders', name: 'vendorOrders', component: OrdersVendor },
  { path: '/vendor_payment', name: 'vendorPayments', component: PaymentsVendor },
  { path: '/add_payment_method', name: 'addPaymentMethod', component: AddPaymentMethod },
  { path: '/setting_buss', name: 'vendorBusiness', component: SettingBuss },
  { path: '/vendor_product', name: 'vendorProduct', component: ProductVendor },
  { path: '/add_product', name: 'addProduct', component: AddProductVendor },

  // Affiliate
  { path: '/affiliate', component: AffiliateDashboard },
  { path: '/affiliate/dashboard', name: 'AffiliateOverview', component: AffiliateStats },
  { path: '/affiliate/links', name: 'AffiliateLinks', component: AffiliateLinks },
  { path: '/affiliate/stats', name: 'AffiliateStats', component: AffiliateStats },
  { path: '/affiliate/settings', name: 'AffiliateSettings', component: AffiliateSettings },
  { path: '/affiliate/notifications', name: 'AffiliateNotifications', component: AffiliateNotifications },
  { path: '/affiliate/register', name: 'AffiliateRegister', component: AffiliateRegister },
  { path: '/affiliate/login', name: 'AffiliateLogin', component: AffiliateLogin },
  { path: '/affiliate/forgot-password', name: 'AffiliateForgotPassword', component: AffiliateForgotPassword },
  { path: '/affiliate/payouts', name: 'AffiliatePayouts', component: AffiliatePayouts },
  { path: '/affiliate/admin', name: 'AffiliateAdmin', component: AffiliateAdmin },

  // Admin
  { path: '/admin_login', name: 'adminLogin', component: AdminLog },
  { path: '/admin', name: 'adminHome', component: HomeAdmin },
  { path: '/admin/categories', name: 'adminCategories', component: CategoriesAdmin },
  { path: '/admin/collections', name: 'adminCollections', component: CollectionsAdmin },
  { path: '/admin/errors', name: 'adminErrors', component: ManagementErrorAdmin },
  { path: '/admin/languages', name: 'adminLanguages', component: AddLanguage },
  { path: '/admin/products', name: 'adminProducts', component: AddProductAdmin },
  { path: '/admin/users', name: 'adminUsers', component: UsersManagement },

  // Shop
  { path: '/shop', name: 'Shop', component: ShopView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Affiliate tracking: parse and save ref/channel
router.beforeEach((to, from, next) => {
  const refId = to.query.ref || to.query.tag;
  const channel = to.query.channel;
  if (refId) localStorage.setItem('affiliate_ref', refId);
  if (channel) localStorage.setItem('affiliate_channel', channel);
  next();
});

export default router;
