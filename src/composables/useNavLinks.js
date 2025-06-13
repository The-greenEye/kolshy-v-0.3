// Utility composable to filter and provide navigation links based on user type
import { computed } from 'vue';
import routes from '@/router/index.js';

// Map route names to icons (Bootstrap icons)
const routeIcons = {
  home: 'bi-house-door-fill',
  login: 'bi-box-arrow-in-right',
  register: 'bi-person-plus-fill',
  setting: 'bi-gear-fill',
  'Address List': 'bi-geo-alt-fill',
  registerSeller: 'bi-shop-window',
  settingProfile: 'bi-person-badge-fill',
  loginSecurity: 'bi-shield-lock-fill',
  vendorDashboard: 'bi-speedometer2',
  vendorOrders: 'bi-bag-check-fill',
  vendorPayments: 'bi-cash-stack',
  vendorBuss: 'bi-briefcase-fill',
  vendorProduct: 'bi-box-seam',
  AddProducts: 'bi-plus-circle-fill',
  // Add more as needed
};

// User and Vendor route name sets
const userRouteNames = new Set([
  'home', 'login', 'register', 'setting', 'Address List',
]);
const vendorRouteNames = new Set([
  'registerSeller', 'settingProfile', 'loginSecurity', 'vendorDashboard', 'vendorOrders', 'vendorPayments', 'vendorBuss', 'vendorProduct', 'AddProducts',
]);

export function useNavLinks() {
  // Determine user type (simple localStorage check, adjust as needed)
  const isVendor = () => !!localStorage.getItem('vendor');
  const isUser = () => !isVendor();

  // Filter routes for navigation
  const navLinks = computed(() => {
    return routes.options.routes
      .filter(route => {
        if (route.name === undefined) return false;
        if (route.name === 'adminLogin' || route.name === 'adminHome' || route.name === 'Add Categories' || route.name === 'Add Collections') return false;
        if (isVendor()) return vendorRouteNames.has(route.name);
        return userRouteNames.has(route.name);
      })
      .map(route => ({
        path: route.path,
        name: route.name,
        icon: routeIcons[route.name] || 'bi-dot',
      }));
  });

  return { navLinks, isVendor, isUser };
}
