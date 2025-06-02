<template>
  <div class="setting_profile p-0">
    <div class="text-start text-light w-100 mb-4" style="padding: 20px 45px; background-color: #000336">
      <h2>Your business</h2>
      <p class="fw-bold">Manage Profile</p>
    </div>
    <div class="d-flex flex-wrap justify-content-between bg-transparent blocks" style="width: 85%; margin: auto">
      <div v-for="(block, n) in blocks" :key="n" class="mb-4 col-lg-6 col-12 d-flex flex-column justify-content-center p-4 block-data" :class="['border', block.highlight ? 'bg-primary text-white border-primary' : 'bg-light border-secondary']" style="width: 500px">
        <router-link :to="block.link || '#'" class="text-decoration-none">
          <div class="d-flex justify-content-start align-items-start">
            <i :class="block.icon" class="me-4 fs-1 fw-bold"></i>
            <div>
              <h3 class="mb-0" :class="block.highlight ? 'text-white' : 'text-dark'">{{ block.text }}</h3>
              <p class="fw-bold" :class="block.highlight ? 'text-light' : 'text-secondary'">{{ block.subTitle }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YourAccount",
  data() {
    return {
      blocks: [
        { icon: "bi bi-speedometer2", text: "Dashboard", subTitle: "View overall performance", link: "/vendor_dashboard" },
        { icon: "bi bi-box", text: "Products", subTitle: "Manage your product listings", link: "/vendor_product" },
        { icon: "bi bi-bag-check", text: "Orders", subTitle: "Track and manage orders", link: "/vendor_orders" },
        { icon: "bi bi-tags", text: "Coupons", subTitle: "Create and manage discounts" },
        { icon: "bi bi-graph-up", text: "Reports", subTitle: "Analyze your store’s data" },
        { icon: "bi bi-star", text: "Reviews", subTitle: "Manage customer feedback" },
        { icon: "bi bi-wallet", text: "Withdraw", subTitle: "Withdraw your earnings" },
        { icon: "bi bi-award", text: "Badge", subTitle: "Manage your store’s badges" },
        { icon: "bi bi-arrow-counterclockwise", text: "Return Request", subTitle: "Handle product returns" },
        { icon: "bi bi-megaphone", text: "Announcements", subTitle: "Post store announcements" },
        { icon: "bi bi-bar-chart", text: "Analytics", subTitle: "Track traffic and sales" },
        { icon: "bi bi-tools", text: "Tools", subTitle: "Utilities and tools for vendors" },
        { icon: "bi bi-question-circle", text: "Support", subTitle: "Get help and assistance" },
        { icon: "bi bi-arrow-repeat", text: "Reverse Withdrawal", subTitle: "Revert withdrawal requests" },
        { icon: "bi bi-gear", text: "Settings", subTitle: "General account settings", highlight: true , link: "/setting_buss"},
        { icon: "bi bi-shop", text: "Store", subTitle: "Edit your store profile" },
        { icon: "bi bi-credit-card", text: "Payment", subTitle: "Manage payout settings", link: "/vendor_payment" },
        { icon: "bi bi-check2-square", text: "Verification", subTitle: "Verify your account" },
        { icon: "bi bi-truck", text: "Shipping", subTitle: "Shipping policies and zones" },
        { icon: "bi bi-people", text: "Social Profile", subTitle: "Link your social accounts" },
        { icon: "bi bi-arrow-return-left", text: "Return and Warranty", subTitle: "Set return & warranty info" },
        { icon: "bi bi-globe", text: "Store SEO", subTitle: "Optimize for search engines" },
        { icon: "bi bi-globe", text: "Login & Security", subTitle: "Update your name,email,phone", link: "/security" },
      ],
    };
  },
};
</script>

<style scoped>
.blocks {
  padding: 25px;
  width: 90%;
  margin: auto;
}
.block-data {
  transition: border 0.3s ease, background-color 0.3s ease;
}
.block-data:hover {
  border: 5px solid #000336;
  cursor: pointer;
}
@media (max-width: 576px) {
  .block-data {
    width: 100% !important;
  }
}
</style>
