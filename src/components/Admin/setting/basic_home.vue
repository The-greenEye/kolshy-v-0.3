<template>
  <main class="p-4 bg-light">
    <section class="mb-5">
      <h4>Overview</h4>
      <div class="row g-3 mt-2">
        <div class="col-md-4">
          <div class="card shadow-sm" style="height: 200px">
            <div class="card-body d-flex justify-content-start align-items-start">
              <i class="bi bi-wallet2 fs-1 mr-4 text-danger"></i>
              <div>
                <h2 class="text-muted">Total Sales</h2>
                <h2 class="fw-bold">
                  {{ salesCount }}<sub class="text-muted mr-4"><small>Order</small></sub>
                </h2>
                <div class="d-flex"></div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center border-0 bg-transparent">
              <div class="text-success">▲ 22.3%</div>
              <button class="btn text-light fw-bold btn-sm rounded-pill" style="background: #e51748">Manage →</button>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card shadow-sm" style="height: 200px">
            <div class="card-body d-flex justify-content-start align-items-start">
              <i class="bi bi-bag-check fs-1 m-r4 text-danger"></i>
              <div>
                <h2 class="text-muted">Total Products</h2>
                <h2 class="fw-bold">
                  {{ productCount }}<sub class="text-muted mr-4"><small>Product</small></sub>
                </h2>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-end border-0 bg-transparent">
              <button class="btn text-light fw-bold btn-sm rounded-pill" style="background: #e51748">Manage →</button>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card shadow-sm" style="height: 200px">
            <div class="card-body d-flex justify-content-start align-items-start">
              <i class="bi bi-wallet2 mr-4 fs-1 text-success"></i>
              <div>
                <h2 class="text-muted">Kolshy Income</h2>
                <h2 class="fw-bold">
                  {{ incomeTotal }}<sub><small class="text-success">$</small></sub>
                </h2>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center border-0 bg-transparent">
              <div class="text-success">▲ 22.3%</div>
              <button class="btn text-light fw-bold btn-sm rounded-pill" style="background: #e51748">Manage →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="">
      <h4>Users</h4>
      <div class="row g-3 mt-4 p-2 bg-white border rounded">
        <div class="col-md-3 border-0 border-end border-dark">
          <div class="card border-0 text-dark">
            <div class="card-body">
              <h4 style="color: #e51748">Total Users</h4>
              <h2 class="fw-bold">{{ totalUsers }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3 border-0 border-end border-dark">
          <div class="card text-dark border-0">
            <div class="card-body">
              <h4>Customers</h4>
              <h2 class="fw-bold">{{ customerCount }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3 border-0 border-end border-dark">
          <div class="card text-dark border-0">
            <div class="card-body">
              <h4>Sellers</h4>
              <h2 class="fw-bold text-warning">{{ sellerCount }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-dark border-0">
            <div class="card-body">
              <h4>Affiliate Sellers</h4>
              <h2 class="fw-bold text-success">{{ affiliateCount }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="p-4">
      <div class="bg-white p-2 rounded shadow-lg">
        <h4 class="mt-4 mb-5">Recent Activities</h4>
        <div class="p-4 row overflow-y-auto">
          <div class="col-12 border- border-bottom mb-4">
            <b class="text-success fw-bold d-block w-100 d-flex justify-content-between align-items-center"
              ><div><span class="mr-4 text-success">+</span>New Order</div>
              <div style="color: gray">2025-5-14, 8:34</div></b
            >
            <small class="fw-bold mb-4" style="color: gray">A new order on platform from <span class="text-danger fw-bold">Ali Mohamed</span> hase been placed successfully</small>
            <div class="mt-4">
              <b>Price: </b>
              <b style="color: #e51748">99.0$</b>
            </div>
            <div class="mt-4 d-flex">
              <b>Product: </b>
              <div class="d-flex align-items-center">
                <div class="p-2">
                  <img src="https://cms.dresma.com/uploads/Image_2_11cac6fa82.jpg" width="70" height="70" alt="product_example" class="img-fluid rounded" />
                </div>
                <div>
                  <b style="color: #141414">Mobile</b>
                  <p><small style="color: gray">A mobile iphone pro max</small></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 border- border-bottom mb-4">
            <b class="text-danger fw-bold d-block w-100 mb-4 d-flex justify-content-between align-items-center"
              ><div><span class="mr-4">-</span>New User Registeration</div>
              <div style="color: gray">2025-5-14, 8:34</div></b
            >
            <div class="d-flex align-items-center mb-4">
                <img src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000" width="60" height="60" alt="example_user" class="img-fluid rounded-circle mr-2" />
                <b class="text-dark mr-4">Ali Mohamed</b>
              <span class="mr-4">-</span>
              <b class="bg-danger text-light" style="padding: 3px 20px">Seller</b>
            </div>
          </div>
          <div class="col-12 border- border-bottom mb-4">
            <b class="text-success fw-bold d-block w-100 d-flex justify-content-between align-items-center"
              ><div><span class="mr-4 text-success">+</span>New Order</div>
              <div style="color: gray">2025-5-14, 8:34</div></b
            >
            <small class="fw-bold mb-4" style="color: gray">A new order on platform from <span class="text-danger fw-bold">Ali Mohamed</span> hase been placed successfully</small>
            <div class="mt-4">
              <b>Price: </b>
              <b style="color: #e51748">99.0$</b>
            </div>
            <div class="mt-4 d-flex">
              <b>Product: </b>
              <div class="d-flex align-items-center">
                <div class="p-2">
                  <img src="https://cms.dresma.com/uploads/Image_2_11cac6fa82.jpg" width="70" height="70" alt="product_example" class="img-fluid rounded" />
                </div>
                <div>
                  <b style="color: #141414">Mobile</b>
                  <p><small style="color: gray">A mobile iphone pro max</small></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 border- border-bottom mb-4">
            <b class="text-danger fw-bold d-block w-100 mb-4 d-flex justify-content-between align-items-center"
              ><div><span class="mr-4">-</span>New User Registeration</div>
              <div style="color: gray">2025-5-14, 8:34</div></b
            >
            <div class="d-flex align-items-center mb-4">
              <img src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000" width="60" height="60" alt="example_user" class="img-fluid rounded-circle mr-2" />
              <b class="text-dark mr-4">Ali Mohamed</b>
              <span class="mr-4">-</span>
              <b class="bg-danger text-light" style="padding: 3px 20px">Seller</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "BasicHome",
  data() {
    return {
      totalUsers: 0,
      customerCount: 0,
      sellerCount: 0,
      affiliateCount: 0,
      productCount: 0,
      salesCount: 0,
      incomeTotal: 0,
    };
  },
  async mounted() {
    const token = localStorage.getItem("adminToken");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const res = await axios.get("/api/admin/users", headers);
      this.totalUsers = res.data.count;
    } catch (e) {
      console.error("Failed to fetch total users", e);
      this.totalUsers = 4350;
    }
    try {
      const res = await axios.get("/api/admin/customers", headers);
      this.customerCount = res.data.count;
    } catch (e) {
      console.error("Failed to fetch customers", e);
      this.customerCount = 2024;
    }
    try {
      const res = await axios.get("/api/admin/sellers", headers);
      this.sellerCount = res.data.count;
    } catch (e) {
      console.error("Failed to fetch sellers", e);
      this.sellerCount = 1689;
    }
    try {
      const res = await axios.get("/api/admin/affiliates", headers);
      this.affiliateCount = res.data.count;
    } catch (e) {
      console.error("Failed to fetch affiliates", e);
      this.affiliateCount = 832;
    }
    try {
      const res = await axios.get("/api/admin/products", headers);
      this.productCount = res.data.count;
    } catch (e) {
      console.error("Failed to fetch products", e);
      this.productCount = 2897;
    }
    try {
      const res = await axios.get("/api/admin/sales", headers);
      this.salesCount = res.data.total_sales;
      this.incomeTotal = res.data.income;
    } catch (e) {
      console.error("Failed to fetch sales", e);
      this.salesCount = 4350;
      this.incomeTotal = 999.0;
    }
  },
};
</script>

<style></style>
