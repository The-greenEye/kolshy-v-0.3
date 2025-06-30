<template>
  <div class="row shop-page p-2">
    <div class="col-lg-3 col-12">
      <!-- Mobile Filter Toggle Button -->
      <button class="btn btn-outline-secondary d-lg-none top-0 start-0 m-3" style="z-index: 1051" @click="showFilter = true" aria-label="Show filters"><i class="bi bi-funnel"></i> Filters</button>

      <!-- Sidebar / Filter -->
      <transition name="fade">
        <div v-if="showFilter || isDesktop" class="filter-sidebar bg-trasparent rounded-0 bg-opacity-75 mb-4 shadow-lg p-3 overflow-auto" :class="{ 'd-none d-lg-block': !showFilter && !isDesktop, 'd-block': showFilter || isDesktop }" style="z-index: 1050; backdrop-filter: blur(8px)">
          <!-- Close button for mobile -->
          <button v-if="!isDesktop" class="btn-close float-end" aria-label="Close" @click="showFilter = false"></button>
          <div class="mt-4 mt-lg-0">
            <p class="fw-bold">Popular Shopping Ideas</p>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none">Unicorn</a></li>
              <li><a href="#" class="text-decoration-none">Fidget</a></li>
              <li><a href="#" class="text-decoration-none">Best</a></li>
              <li><a href="#" class="text-decoration-none">Paw Patrol</a></li>
            </ul>
            <hr />
            <div>
              <p class="fw-bold mb-1">Toys Age Range</p>
              <div><input type="checkbox" id="age1" /> <label for="age1">Birth to 24 Months</label></div>
              <div><input type="checkbox" id="age2" /> <label for="age2">2 to 4 Years</label></div>
              <div><input type="checkbox" id="age3" /> <label for="age3">5 to 7 Years</label></div>
              <div><input type="checkbox" id="age4" /> <label for="age4">8 to 13 Years</label></div>
              <div><input type="checkbox" id="age5" /> <label for="age5">14 Years & Up</label></div>
            </div>
            <hr />
            <div>
              <p class="fw-bold mb-1">Price</p>
              <v-range-slider color="pink" v-model="priceRange" step="2" thumb-label="always"></v-range-slider>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Main Content -->
    <div class="col-lg-9 offset-lg-3 m-0 col-12">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
      </div>
      <div v-else>
        <div class="row d-lg-flex d-none g-3">
          <div v-for="item in items" :key="item.id" class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 border-0 product-card">
              <v-img :width="200" :height="100" aspect-ratio="1/1" :src="item.image"></v-img>
              <div class="card-body d-lg-flex align-items-start flex-lg-column">
                <h6 class="card-title">{{ item.title }}</h6>
                <p class="card-text text-truncate text-wrap">{{ item.description }}</p>
                <div class="mt-0">
                  <div class="fw-bold mb-0">${{ item.price }}</div>
                  <div><span class="text-warning">★</span> {{ item.rating.rate || "N/A" }} ({{ item.rating.count || 0 }})</div>
                  <button style="border:1px solid #e51748" class="btn btn-light rounded-pill btn-sm mt-2 w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-lg-none d-block p-2">
          <div v-for="item in items" :key="item.id" class="row mb-2 p-2 border border-light rounded shadow-sm">
            <div class="bg-light d-flex justify-content-center flex-column col-4">
            <img class="img-fluid" :src="item.image">
            </div>
            <div class="col-8 row">
            <h6 class="card-title fw-bold col-12 m-0">{{ item.title }}</h6>
            <el-tag type="info" style="width: 30%" class="m-2" size="small">category</el-tag>
            <small class="m-0">Options: <span class="text-primary">2 size</span></small>
            <div class="mt-0"><span>{{ item.rating.rate || 4.5 }}</span><el-rate disabled v-model="item.rating.rate" low-threshold="4.5" size="small" allow-half /> ({{ item.rating.count || 0 }})</div>
            <small style="color: rgb(213 212 212)">500+ bought in past month</small>
            <p calss="fw-bold"><sup>$</sup>{{ item.price }}<sup>46</sup><sub style="color: rgb(213 212 212)">($0.40/count)</sub></p>
            <div class="mt-0">Delivery <b>Tue, jul 8</b></div>
            <small style="color: rgb(213 212 212)">ships to Egypt</small>
            <el-button color="gold" class="m-2" round>Add To Cart</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopPage",
  data() {
    return {
      items: [],
      loading: false,
      priceRange: 1000,
      showFilter: false,
      isDesktop: false,
    };
  },
  mounted() {
    const perfStart = performance.now();
    this.loading = true;
    // Fetch product data from the fake store API
      fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        this.items = data;
        this.loading = false;
      })
      .catch((err) => {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error loading products:", err);
        }
        this.items = [];
        this.loading = false;
        // Show user-friendly error message (optional: use a toast or ElMessage)
        // ElMessage.error('Failed to load products. Please try again later.');
      });
    this.checkDesktop();
    window.addEventListener("resize", this.checkDesktop);
    const perfEnd = performance.now();
    console.log(`ShopPage mounted in ms`);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkDesktop);
  },
  methods: {
    /**
     * Check if the current window size is desktop and update state.
     */
    checkDesktop() {
      this.isDesktop = window.innerWidth >= 992;
      if (this.isDesktop) this.showFilter = false;
    },
  },
};
</script>

<style scoped>
.shop-page {
  background: transparent;
  min-height: 100vh;
  position: relative;
}
.filter-sidebar {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  width: 95vw;
  margin: auto;
  top: 0;
  left: 0;
  transition: all 0.3s;
}
@media (min-width: 992px) {
  .filter-sidebar {
    width: 100%;
    left: 0;
    border-radius: 0;
    background: transparent !important;
    box-shadow: none;
    z-index: 2;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.product-card {
  background: transparent;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.product-img {
  height: 200px;
  object-fit: contain;
}
@media (max-width: 991.98px) {
  .col-lg-9.offset-lg-3 {
    margin-left: 0 !important;
    width: 100% !important;
  }
  .product-card {
    border-radius: 0.75rem;
    display: flex;
    margin-bottom: 1rem;
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .product-img {
    height: 180px;
  }
  .row.g-3 {
    flex-direction: column;
  }
}
</style>
