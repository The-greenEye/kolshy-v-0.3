<template>
    <div class="customer-orders-page">
      <KolshyStyleHeader />
      <div class="orders-main-container">
        <h2 class="page-title">Your Orders</h2>
  
        <div v-if="loading" class="loading-state">
          <el-spinner size="large"></el-spinner>
          <p>Loading your orders...</p>
        </div>
  
        <div v-else-if="orders.length === 0" class="empty-orders-state">
          <i class="bi bi-box-seam empty-icon"></i>
          <h3>No orders placed yet.</h3>
          <p>It looks like you haven't made any purchases on Kolshy. Start exploring our wide range of products!</p>
          <router-link to="/shop">
            <el-button type="primary" size="default">Start Shopping</el-button>
          </router-link>
        </div>
  
        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-summary">
                <div class="summary-item">
                  <span class="summary-label">ORDER PLACED</span>
                  <span class="summary-value">{{ formatDate(order.order_date) }}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">TOTAL</span>
                  <span class="summary-value">{{ formatCurrency(order.total_amount) }}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">SHIP TO</span>
                  <span class="summary-value">{{ order.shipping_address.full_name }}</span>
                </div>
              </div>
              <div class="order-id">
                ORDER # {{ order.id }}
                <router-link :to="`/orders/${order.id}`" class="order-details-link">View order details</router-link>
              </div>
            </div>
  
            <div class="order-status-section">
              <h4 class="order-status-title">
                {{ order.status_display }}
                <span v-if="order.delivery_date" class="delivery-date"> on {{ formatDate(order.delivery_date) }}</span>
              </h4>
              <div class="order-actions">
                <el-button type="primary" size="small" v-if="order.status === 'processing'">Track Package</el-button>
                <el-button type="success" size="small" v-if="order.status === 'delivered'">Buy It Again</el-button>
                <el-button type="info" size="small" v-if="['delivered', 'shipped'].includes(order.status)">Return Items</el-button>
              </div>
            </div>
  
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <router-link :to="`/product/${item.product_id}`" class="item-img-link">
                  <img :src="item.image_url || 'https://via.placeholder.com/80'" :alt="item.name" class="item-image" />
                </router-link>
                <div class="item-details">
                  <router-link :to="`/product/${item.product_id}`" class="item-name">{{ item.name }}</router-link>
                  <p class="item-vendor">Sold by: {{ item.vendor_name }}</p>
                  <div class="item-price-qty">{{ formatCurrency(item.price) }} x {{ item.quantity }}</div>
                </div>
                <div class="item-actions">
                  <el-button type="primary" size="small">Write a Product Review</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footerC />
    </div>
  </template>
  
  <script>
  import KolshyStyleHeader from '@/components/Global/topBar';
  import footerC from '@/components/Global/footer';
  import { useStoreApp } from '../../../stores/app'; // تأكد من المسار الصحيح لـ useStoreApp
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  
  export default {
    name: 'YourOrders',
    components: { KolshyStyleHeader, footerC },
    data() {
      return {
        api: useStoreApp(),
        orders: [],
        loading: true,
        // بيانات وهمية للطلبات
        mockOrders: [
          {
            id: '123-4567890-1234567',
            order_date: '2024-06-15T10:30:00Z',
            total_amount: 150.75,
            status: 'delivered',
            status_display: 'Delivered',
            delivery_date: '2024-06-18T14:00:00Z',
            shipping_address: { full_name: 'Ahmed Yassine', address: '123 Main St, Cairo, Egypt' },
            items: [
              { id: 101, product_id: 1, name: 'Wireless Headphones X1', image_url: 'https://via.placeholder.com/80/FF5733/FFFFFF?text=HP1', price: 75.00, quantity: 1, vendor_name: 'TechGadget Co.' },
              { id: 102, product_id: 2, name: 'Ergonomic Mouse M2', image_url: 'https://via.placeholder.com/80/33FF57/FFFFFF?text=Mouse', price: 25.75, quantity: 1, vendor_name: 'OfficeSolutions' }
            ]
          },
          {
            id: '987-6543210-9876543',
            order_date: '2024-06-10T11:00:00Z',
            total_amount: 50.00,
            status: 'processing',
            status_display: 'Processing',
            shipping_address: { full_name: 'Ahmed Yassine', address: '123 Main St, Cairo, Egypt' },
            items: [
              { id: 201, product_id: 3, name: 'Smart Home LED Bulb', image_url: 'https://via.placeholder.com/80/3357FF/FFFFFF?text=Bulb', price: 25.00, quantity: 2, vendor_name: 'SmartLiving Ltd.' }
            ]
          },
          {
            id: '111-2223334-4445556',
            order_date: '2024-06-01T09:15:00Z',
            total_amount: 320.00,
            status: 'shipped',
            status_display: 'Shipped',
            delivery_date: '2024-06-05T18:00:00Z', // يمكن أن يكون تاريخ تقديري للشحن
            shipping_address: { full_name: 'Ahmed Yassine', address: '123 Main St, Cairo, Egypt' },
            items: [
              { id: 301, product_id: 4, name: 'Portable Bluetooth Speaker', image_url: 'https://via.placeholder.com/80/FF33CC/FFFFFF?text=Speaker', price: 100.00, quantity: 1, vendor_name: 'AudioPro' },
              { id: 302, product_id: 5, name: 'Fitness Tracker Band', image_url: 'https://via.placeholder.com/80/33CCFF/FFFFFF?text=Fitness', price: 80.00, quantity: 2, vendor_name: 'HealthGadgets' }
            ]
          }
        ]
      };
    },
    methods: {
      async fetchOrders() {
        this.loading = true;
        try {
          const token = localStorage.getItem('tokenkolshy');
          // هنا سيكون استدعاء الـ API الحقيقي لجلب الطلبات
          // const response = await axios.get(this.api.baseUrl + this.api.endPoint.customer.orders.get_all, {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // if (response.data && response.data.data) {
          //   this.orders = response.data.data;
          //   ElMessage.success('Orders loaded successfully!');
          // }
  
          // Mock data loading simulation
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
          this.orders = this.mockOrders;
          ElMessage.success('Orders loaded successfully! (Mock Data)');
  
        } catch (e) {
          console.error('Error fetching orders:', e);
          ElMessage.error('Failed to load orders. Displaying mock data.');
          this.orders = this.mockOrders; // Fallback to mock data
        } finally {
          this.loading = false;
        }
      },
      formatDate(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      formatCurrency(amount) {
        if (typeof amount !== 'number') return 'N/A';
        return `$${amount.toFixed(2)}`; // أو أي صيغة عملة أخرى
      }
    },
    mounted() {
      this.fetchOrders();
    }
  };
  </script>

  <style>
.customer-orders-page {
  background: #eaeded; /* خلفية رمادية فاتحة للصفحة بالكامل */
  min-height: 100vh;
}
.orders-main-container {
  max-width: 1200px; /* عرض أقصى للحاوية الرئيسية */
  margin: 30px auto; /* توسيط مع مسافة علوية وسفلية */
  padding: 0 15px; /* حشوة جانبية */
}

.page-title {
  font-size: 28px; /* حجم عنوان أكبر */
  font-weight: bold; /* خط سميك */
  margin-bottom: 30px; /* مسافة أكبر أسفل العنوان */
  text-align: left; /* محاذاة لليسار */
  color: #141414; /* لون نص داكن */
  border-bottom: 1px solid #eee; /* خط فاصل أسفل العنوان */
  padding-bottom: 15px; /* حشوة تحت النص قبل الخط */
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 50px 0;
  color: #555;
  font-size: 1.1rem;
}
/* Basic spinner animation if not using Element Plus spinner */
/* @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } */
/* .el-spinner { animation: spin 1s linear infinite; } */


/* Empty Orders State */
.empty-orders-state {
  text-align: center;
  padding: 50px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-top: 30px;
}
.empty-orders-state .empty-icon {
  font-size: 4rem;
  color: #bfbfbf;
  margin-bottom: 20px;
}
.empty-orders-state h3 {
  font-size: 1.8rem;
  color: #141414;
  margin-bottom: 15px;
}
.empty-orders-state p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.empty-orders-state .el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  font-weight: bold;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1rem;
}
.empty-orders-state .el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}


/* Orders List */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* مسافة بين بطاقات الطلبات */
}

.order-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #ddd;
  overflow: hidden; /* لضمان أن الحواف المستديرة تعمل بشكل صحيح */
}

.order-header {
  background-color: #f0f2f5; /* خلفية رمادية فاتحة للرأس */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #ddd;
}
.order-summary {
  display: flex;
  gap: 30px; /* مسافة بين عناصر الملخص */
}
.summary-item {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.summary-label {
  font-size: 0.8rem;
  color: #777;
  text-transform: uppercase;
  margin-bottom: 3px;
}
.summary-value {
  font-weight: bold;
  font-size: 0.95rem;
  color: #141414;
}
.order-id {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap; /* يمنع انقسام النص */
}
.order-details-link {
  color: #007185; /* لون أزرق للرابط */
  text-decoration: none;
  font-size: 0.85rem;
  margin-top: 5px;
}
.order-details-link:hover {
  text-decoration: underline;
  color: #c45500;
}

.order-status-section {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.order-status-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #141414;
  margin: 0;
}
.order-status-title .delivery-date {
  font-weight: normal;
  color: #555;
  font-size: 0.95rem;
}
.order-actions .el-button {
  font-weight: bold;
  border-radius: 4px;
  padding: 8px 15px;
}
.order-actions .el-button--primary {
  background-color: #e51748;
  border-color: #e51748;
  color: #fff;
}
.order-actions .el-button--primary:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}
.order-actions .el-button--success {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: #fff;
}
.order-actions .el-button--success:hover {
  background-color: #388E3C;
  border-color: #388E3C;
}
.order-actions .el-button--info {
  background-color: #007185;
  border-color: #007185;
  color: #fff;
}
.order-actions .el-button--info:hover {
  background-color: #005666;
  border-color: #005666;
}

.order-items {
  padding: 20px;
}
.order-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}
.order-item:last-child {
  margin-bottom: 0;
}
.item-img-link {
  flex-shrink: 0;
  margin-right: 15px;
}
.item-image {
  width: 100px; /* حجم صورة المنتج */
  height: 100px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
}
.item-details {
  flex-grow: 1;
}
.item-name {
  font-size: 1rem;
  color: #007185;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
.item-name:hover {
  text-decoration: underline;
  color: #c45500;
}
.item-vendor {
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 5px;
}
.item-price-qty {
  font-size: 0.95rem;
  font-weight: bold;
  color: #141414;
}
.item-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center; /* محاذاة عمودية */
  margin-left: 20px;
}
.item-actions .el-button {
  background-color: #e51748;
  border-color: #e51748;
  color: #fff;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 4px;
}
.item-actions .el-button:hover {
  background-color: #ca2e52;
  border-color: #ca2e52;
}


/* Responsive Styles */
@media (max-width: 991px) {
  .orders-main-container {
    padding: 0 10px;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 25px;
    padding-bottom: 12px;
  }
  .order-header {
    flex-direction: column; /* ترتيب الملخص ومعرف الطلب عمودياً */
    align-items: flex-start;
    gap: 15px;
  }
  .order-summary {
    flex-wrap: wrap; /* تسمح للعناصر بالانتقال لسطر جديد */
    gap: 15px;
  }
  .order-id {
    width: 100%;
    align-items: flex-start; /* محاذاة معرف الطلب لليسار */
  }
  .order-status-section {
    flex-direction: column; /* ترتيب العنوان والإجراءات عمودياً */
    align-items: flex-start;
    gap: 10px;
  }
  .order-actions {
    width: 100%;
    display: flex;
    justify-content: flex-start; /* محاذاة الأزرار لليسار */
    gap: 10px;
    flex-wrap: wrap; /* تسمح للأزرار بالانتقال لسطر جديد */
  }
  .order-actions .el-button {
    flex-grow: 1; /* لتملأ المساحة المتاحة بشكل متساوٍ */
    min-width: 120px; /* حد أدنى للعرض */
  }
  .order-items {
    padding: 15px;
  }
  .item-image {
    width: 80px;
    height: 80px;
  }
  .item-actions {
    margin-left: 10px;
    align-items: center;
  }
  .item-actions .el-button {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
}

@media (max-width: 767px) {
  .orders-main-container {
    padding: 0;
    margin: 20px auto;
  }
  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: none;
  }
  .order-card {
    border-radius: 0; /* إزالة الحواف المستديرة على الجوال */
    box-shadow: none; /* إزالة الظل على الجوال */
    border-left: none; /* إزالة الحدود الجانبية */
    border-right: none;
  }
  .order-header, .order-status-section, .order-items {
    padding-left: 15px;
    padding-right: 15px;
  }
  .order-header {
    align-items: center; /* توسيط عناصر الرأس عمودياً */
    text-align: center;
  }
  .order-summary {
    justify-content: center; /* توسيط عناصر الملخص */
  }
  .order-id {
    align-items: center; /* توسيط معرف الطلب */
  }
  .order-status-section {
    align-items: center; /* توسيط محتوى قسم الحالة */
  }
  .order-actions {
    justify-content: center; /* توسيط الأزرار */
  }
  .order-item {
    flex-direction: column; /* ترتيب عناصر الطلب عمودياً */
    align-items: center;
    text-align: center;
    gap: 10px; /* مسافة بين الصورة والتفاصيل */
  }
  .item-img-link {
    margin-right: 0;
  }
  .item-details {
    width: 100%; /* للسماح بتوسيط النص */
  }
  .item-name, .item-vendor, .item-price-qty {
    text-align: center;
  }
  .item-actions {
    margin-left: 0;
    margin-top: 10px; /* مسافة من الأسفل */
  }
  .item-actions .el-button {
    width: 100%;
    max-width: 250px; /* عرض أقصى لزر المراجعة */
  }
}
  </style>