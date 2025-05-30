<template>
  <div>
    <KolshyStyleHeader />
    <div class="orders-page container py-5">
      <div class="d-flex justify-content-between">
        <h2>Your Orders</h2>
        <div class="d-flex align-items-center mb-3">
          <el-input v-model="searchQuery" placeholder="Item, order or PO number..." class="me-2" style="max-width: 350px" @keyup.enter="searchOrders" />
          <el-button type="primary" @click="searchOrders">Search Orders</el-button>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="mb-3">
        <el-tab-pane label="Orders" name="orders"></el-tab-pane>
        <el-tab-pane label="Buy Again" name="buyAgain"></el-tab-pane>
        <el-tab-pane label="Not Yet Shipped" name="notShipped"></el-tab-pane>
        <el-tab-pane label="Digital Orders" name="digital"></el-tab-pane>
        <el-tab-pane label="Local Store Orders" name="local"></el-tab-pane>
        <el-tab-pane label="Kolshy Pay" name="pay"></el-tab-pane>
        <el-tab-pane label="Cancelled Orders" name="cancelled"></el-tab-pane>
      </el-tabs>

      <div class="d-flex align-items-center mb-2">
        <span class="me-2">Viewing {{ filteredOrders.length }} orders placed in</span>
        <el-select v-model="orderType" placeholder="All orders" class="me-2" style="width: 120px">
          <el-option label="All orders" value="all"></el-option>
          <el-option label="Open orders" value="open"></el-option>
          <el-option label="Cancelled orders" value="cancelled"></el-option>
        </el-select>
        <el-select v-model="orderPeriod" placeholder="Last 30 days" style="width: 140px">
          <el-option label="Last 30 days" value="30"></el-option>
          <el-option label="Last 3 months" value="90"></el-option>
          <el-option label="2024" value="2024"></el-option>
          <el-option label="2023" value="2023"></el-option>
        </el-select>
        <el-button class="ms-auto" plain>View order reports</el-button>
      </div>

      <div v-if="filteredOrders.length === 0" class="no-orders">
        <p>
          You have not placed any orders in Last 30 days.
          <a href="#" @click.prevent="orderPeriod = '90'">View orders in Last 3 months.</a>
        </p>
      </div>
      <div v-else>
        <!-- List orders here -->
        <div v-for="order in filteredOrders" :key="order.id" class="order-card mb-3 p-3 border rounded">
          <!-- Order details go here -->
          <div>Order #{{ order.id }} - {{ order.date }}</div>
          <div>{{ order.items.length }} items</div>
          <!-- etc. -->
        </div>
      </div>
    </div>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
export default {
  name: "OrdersPage",
  components: {
      KolshyStyleHeader,
      footerC,
  },
  data() {
    return {
      searchQuery: "",
      activeTab: "orders",
      orderType: "all",
      orderPeriod: "30",
      orders: [
        // Example order data structure
        // { id: 1, date: "2024-05-01", items: [ ... ] }
      ],
    };
  },
  computed: {
    filteredOrders() {
      // Filter logic based on tab, type, period, and search
      // For now, always return empty for demo
      return [];
    },
  },
  methods: {
    searchOrders() {
      // Implement search logic here
    },
  },
};
</script>

<style scoped>
.orders-page {
  background: #fff;
  border-radius: 8px;
  min-height: 400px;
}
.no-orders {
  padding: 2rem 0;
  color: #555;
}
.order-card {
  background: #fafafa;
}
</style>
