vue
<template>
    <div>

    <KolshyStyleHeader />
  <div class="wallet-container p-5">
    <!-- Left Sidebar -->
    <div class="wallet-sidebar">
      <!-- Cards & Accounts -->
      <div class="wallet-section">
        <h2>Cards &amp; accounts</h2>
        <div class="add-payment-method">
            <el-button type="primary" icon="el-icon-plus" @click="$router.push('/add_payment_method')">Add a payment method</el-button>
          </div>
      </div>
      <!-- Rewards & Balances -->
      <div class="wallet-section">
        <h2>Rewards &amp; balances</h2>
        <div class="gift-card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Gift Card" class="gift-card-img" />
          <div>
            <div class="gift-card-title"><strong>Kolshy Gift Card</strong></div>
            <div class="gift-card-balance">Balance: $0.00</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="wallet-main">
      <div class="no-payment-methods">
        <p>You don't have any payment methods saved.</p>
        <el-button type="primary" icon="el-icon-plus" @click="$router.push('/add_payment_method')">Add Payment Method</el-button>
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
  name: "paymentVendor",
  components: {
    KolshyStyleHeader,
    footerC,
  },
};
</script>

<style scoped>
.wallet-container {
  display: flex;
  background: #f3f5f6;
  min-height: 400px;
  padding: 24px;
}
@media (max-width: 625px){
    .wallet-container {
  display: flex;
  flex-direction: column;
  background: #f3f5f6;
  min-height: 400px;
  padding: 24px;
}
}
.wallet-sidebar {
  width: 280px;
  margin-right: 32px;
}
.wallet-section {
  background: #fff;
  border-radius: 6px;
  padding: 18px 16px;
  margin-bottom: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.add-payment-method {
  display: flex;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;
}
.add-icon {
  width: 36px;
  height: 36px;
  border: 2px dashed #bbb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #888;
  margin-right: 10px;
  background: #f8f8f8;
}
.add-link {
  color: #007185;
  text-decoration: none;
  font-weight: 500;
}
.gift-card {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.gift-card-img {
  width: 48px;
  height: 32px;
  object-fit: contain;
  margin-right: 12px;
}
.gift-card-title {
  font-size: 15px;
}
.gift-card-balance {
  color: #555;
  font-size: 14px;
}
.wallet-main {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.no-payment-methods {
  text-align: center;
}
.add-payment-btn {
  background: #ffd814;
  color: #111;
  border: none;
  border-radius: 18px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 18px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: background 0.2s;
}
.add-payment-btn:hover {
  background: #f7ca00;
}
</style>
