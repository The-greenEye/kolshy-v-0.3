<template>
  <div class="account-dashboard">
    <h2 class="dashboard-title">Your account</h2>
    <el-row :gutter="20" class="dashboard-grid">
      <el-col
        v-for="(item, idx) in dashboardItems"
        :key="idx"
        :xs="24" :sm="12" :md="8"
        class="dashboard-card-col"
      >
        <a :href="item.link" class="dashboard-card">
          <div class="icon-wrap">
            <i :class="item.icon"></i>
          </div>
          <div class="card-content">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-desc">{{ item.desc }}</div>
          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "basiceSetting",
  data() {
    return {
      dashboardItems : [
  {
    title: 'For me',
    desc: 'View benefits and payment settings',
    icon: 'bi bi-person-badge',
    link: "/setting/profile"
  },
  {
    title: 'Login and Security',
    desc: 'Manage your password, email, mobile number, and security settings',
    icon: 'bi bi-shield-lock',
    link: '/setting/login&security'
  },
  {
    title: 'Your requests',
    desc: 'Track, return or buy again items',
    icon: 'bi bi-box-seam',
    link: '/setting/orders'
  },
  {
    title: 'Your messages',
    desc: 'Messages sent and received from Amazon, sellers, and buyers',
    icon: 'bi bi-envelope-paper',
  },
  {
    title: 'Your payments',
    desc: 'View all transactions, modify payment methods and settings',
    icon: 'bi bi-credit-card',
    link: '/setting/mypayments'
  },
  {
    title: 'Gift cards',
    desc: 'View balance or redeem a card',
    icon: 'bi bi-gift',
  },
  {
    title: 'Kolshy Mobile App',
    desc: 'Download the Kolshy app',
    icon: 'bi bi-phone',
  },
  {
    title: 'Installment program',
    desc: 'View the installment programs offered',
    icon: 'bi bi-calendar2-check',
  },
  {
    title: 'Your addresses',
    desc: 'Edit order and gift addresses',
    icon: 'bi bi-house-door',
    link: "/setting/addresses",
  },
  {
    title: 'Contact us',
    desc: 'Contact our customer service by phone or chat',
    icon: 'bi bi-headset',
  },
  {
    title: 'Your lists',
    desc: 'View, edit, and share your lists or create new ones',
    icon: 'bi bi-card-list',
  },
],
      }
    }
}
</script>
<style scoped>
.account-dashboard {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 12px;
}
.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: right;
}
.dashboard-grid {
  width: 100%;
}
.dashboard-card-col {
  margin-bottom: 24px;
}
.dashboard-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 20px 18px;
  text-decoration: none;
  transition: box-shadow 0.2s;
  min-height: 110px;
  height: 100%;
}
.dashboard-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.icon-wrap {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e517420f;
  border-radius: 50%;
  margin-right: 18px;
  font-size: 2rem;
  color: #e51748;
}
.card-content {
  flex: 1;
}
.card-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
  color: #e51748
}
.card-desc {
  font-size: 0.97rem;
  color: #666;
}
@media (max-width: 768px) {
  .dashboard-title {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  .dashboard-card {
    padding: 14px 10px;
    min-height: 90px;
  }
  .icon-wrap {
    width: 38px;
    height: 38px;
    font-size: 1.3rem;
    margin-right: 10px;
  }
}
</style>
