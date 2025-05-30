<template>
  <div>
    <KolshyStyleHeader />
    <div class="buss-settings-container p-4">
      <!-- Header -->
      <div class="buss-header">
        <h1>Business settings</h1>
        <el-select v-model="value" placeholder="Add User" size="large" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <!-- Alerts -->
      <div class="buss-alert alert-warning">
        <span class="alert-title">Complete account registration for full access</span>
        <p>When we’ve verified your account, you’ll have full access to business-only discounts, extra features, and FREE shipping on eligible orders.</p>
        <el-button type="wraning" class="alert-action-btn">Complete Registration</el-button>
      </div>
      <div class="buss-alert alert-info">
        <span class="alert-title">Set up your team</span>
        <p>
          Invite others to shop on behalf of the business. Multiple people can be managed with business-wide order reports and order approval workflows.
          <br />
          <span class="alert-desc">We highly recommend adding at least one backup admin. If you leave the company for any reason, your entire company will lose access to the Amazon business account.</span>
        </p>
        <el-button type="wraning" class="alert-action-btn">Add users</el-button>
        <el-button type="wraning" class="alert-dismiss-btn">Dismiss</el-button>
      </div>

      <!-- Main Content -->
      <div class="buss-main">
        <!-- Left: Main Cards -->
        <div class="buss-main-cards">
          <!-- Billing & Shipping -->
          <div class="buss-card">
            <h2>Billing &amp; shipping</h2>
            <p>Manage your checkout preferences for employees by editing payment and shipping info.</p>
            <div class="buss-links">
              <a href="#">Shared settings</a>
              <a href="#">Bedouins (Blanket PO)</a>
              <a href="#">Shared payment methods</a>
              <a href="#">Receiving (5-Way Match)</a>
              <a href="#">Addresses and delivery preferences</a>
              <a href="#">Checkout credits</a>
              <a href="#">Business order info</a>
            </div>
          </div>
          <!-- Members -->
          <div class="buss-card">
            <h2>Members</h2>
            <p>Invite others to join this business account and organize them into groups with common settings.</p>
            <div class="buss-links">
              <a href="#">Users</a>
              <a href="#">Invitations</a>
              <a href="#">Groups</a>
            </div>
          </div>
          <!-- Buying Policies -->
          <div class="buss-card">
            <h2>Buying policies</h2>
            <p>Guide employee buying by setting purchasing rules and approval workflows based on spending limits, seller or product preferences.</p>
            <div class="buss-links">
              <a href="#">Buying policies and approvals</a>
              <a href="#">Negotiated pricing</a>
              <a href="#">Business Giving</a>
            </div>
          </div>
          <!-- Tax Exemption & Licenses -->
          <div class="buss-card">
            <h2>Tax Exemption &amp; licenses</h2>
            <p>Apply professional credentials that allow you to buy specialty items or order without sales tax.</p>
            <div class="buss-links">
              <a href="#">Tax exemptions</a>
              <a href="#">Licenses and credentials</a>
            </div>
          </div>
          <!-- System Integrations -->
          <div class="buss-card">
            <h2>System integrations</h2>
            <p>Connect Amazon Business with other purchasing, tracking, and/or financial programs you use.</p>
            <div class="buss-links">
              <a href="#">Configure purchasing system</a>
              <a href="#">Domain verification</a>
              <a href="#">Configure e-invoicing</a>
              <a href="#">UNSPSC product classification</a>
              <a href="#">Single Sign-On (SSO)</a>
              <a href="#">App Center</a>
              <a href="#">Amazon WorkDocs</a>
            </div>
          </div>
        </div>
        <!-- Right: Sidebar -->
        <aside class="buss-sidebar">
          <!-- Account Admins -->
          <div class="sidebar-card">
            <h3>Account admins (1)</h3>
            <div class="admin-info">
              <img src="https://ui-avatars.com/api/?name=Bashar" alt="Admin" class="admin-avatar" />
              <div>
                <div class="admin-name">Bashar</div>
                <div class="admin-email">mohammedbashar1996@gmail.com</div>
              </div>
            </div>
            <el-button type="wraning" class="sidebar-btn">Add an admin</el-button>
          </div>
          <!-- Business Prime -->
          <div class="sidebar-card prime-card">
            <img src="https://m.media-amazon.com/images/G/01/abn/prime/prime-badge._CB485945043_.png" alt="Prime" class="prime-img" />
            <div>
              <div class="prime-title">Enjoy fast, free shipping with Business Prime</div>
              <a href="#" class="prime-link">Register business Prime</a>
            </div>
          </div>
          <!-- Business Profile -->
          <div class="sidebar-card">
            <h3>Business profile</h3>
            <div class="profile-info">
              <div>Mechannet</div>
              <div>4452 SPINACH CT</div>
              <div>HAMID HUSIN, IL 27618-1848</div>
              <div>Business ID: AU3QK7YMAQ4AHY1</div>
            </div>
            <a href="#" class="sidebar-link">View all</a>
          </div>
          <!-- Quick Links -->
          <div class="sidebar-card">
            <a href="#" class="sidebar-link">Account management, users and updates</a>
            <a href="#" class="sidebar-link">Contact customer support</a>
            <a href="#" class="sidebar-link">Close business account</a>
          </div>
        </aside>
      </div>
    </div>
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
export default {
  name: "SettingBuss",
  components: {
      KolshyStyleHeader,
      footerC,
  },
  data() {
    return {
      options: [
        [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
        ],
      ],
    };
  },
};
</script>

<style scoped>
.buss-settings-container {
  background: #f6f7f9;
  min-height: 100vh;
  padding: 24px 0;
  font-family: Arial, sans-serif;
}
.buss-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 16px auto;
  padding: 0 16px;
}
.buss-header h1 {
  font-size: 1.7rem;
  font-weight: 600;
}
.add-users-btn {
  background: #ff9900;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}
.buss-alert {
  max-width: 1200px;
  margin: 0 auto 12px auto;
  padding: 16px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.alert-warning {
  background: #fff3cd;
  border: 1px solid #ffeeba;
}
.alert-info {
  background: #e7f3fe;
  border: 1px solid #b3d8fd;
}
.alert-title {
  font-weight: 600;
  color: #b12704;
}
.alert-action-btn {
  background: #ff9900;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 6px;
  cursor: pointer;
}
.alert-dismiss-btn {
  background: transparent;
  color: #555;
  border: none;
  font-size: 0.95rem;
  margin-left: 8px;
  cursor: pointer;
}
.buss-main {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 24px;
  padding: 0 16px;
}
.buss-main-cards {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.buss-card {
  background: #fff;
  border-radius: 6px;
  padding: 20px 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.buss-card h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 6px;
}
.buss-card p {
  font-size: 1rem;
  color: #444;
  margin-bottom: 10px;
}
.buss-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
}
.buss-links a {
  color: #007185;
  text-decoration: none;
  font-size: 0.98rem;
  margin-bottom: 4px;
}
.buss-links a:hover {
  text-decoration: underline;
}
.buss-sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 260px;
}
.sidebar-card {
  background: #fff;
  border-radius: 6px;
  padding: 18px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 0;
}
.admin-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.admin-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
.admin-name {
  font-weight: 600;
  font-size: 1rem;
}
.admin-email {
  font-size: 0.95rem;
  color: #555;
}
.sidebar-btn {
  background: #007185;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 6px 14px;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
}
.prime-card {
  display: flex;
  align-items: center;
  gap: 10px;
}
.prime-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.prime-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.prime-link {
  color: #007185;
  text-decoration: none;
  font-size: 0.98rem;
}
.prime-link:hover {
  text-decoration: underline;
}
.profile-info {
  font-size: 0.98rem;
  color: #222;
  margin-bottom: 8px;
}
.sidebar-link {
  display: block;
  color: #007185;
  text-decoration: none;
  font-size: 0.98rem;
  margin-bottom: 6px;
}
.sidebar-link:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 900px) {
  .buss-main {
    flex-direction: column;
    gap: 0;
  }
  .buss-sidebar {
    min-width: 0;
    margin-top: 18px;
  }
}
@media (max-width: 600px) {
  .buss-header,
  .buss-main,
  .buss-alert {
    padding: 0 4px;
    max-width: 100%;
  }
  .buss-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .buss-main-cards,
  .buss-sidebar {
    gap: 10px;
  }
  .buss-card,
  .sidebar-card {
    padding: 12px 8px;
  }
}
</style>
