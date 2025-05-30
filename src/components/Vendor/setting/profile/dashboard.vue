<template>
  <div>
    <KolshyStyleHeader />
    <div class="container border rounded mb-2 p-5 pb-0">
      <el-progress :percentage="30" :stroke-width="15" status="warning" striped />
      <div class="p-4 rounded mt-4 mb-2 text-primary fs-3" style="background: #d9edf7">
        Add Profile Picture to gain 15% progress
      </div>
    </div>

    <div class="container_blocks container p-0">
      <!-- Summary Blocks -->
      <div class="blocks rounded">
        <div class="text-center border m-0 p-2 rounded-0">
          <b>Net Sales</b>
          <p class="fs-4 fw-bold">ADE 0.00</p>
        </div>
        <div class="text-center border m-0 p-2 rounded-0">
          <b>Earnings</b>
          <p class="fs-4 fw-bold">ADE 0.00</p>
        </div>
        <div class="text-center border m-0 p-2 rounded-0">
          <b>Page Views</b>
          <p>0</p>
        </div>
        <div class="text-center border m-0 p-2 rounded-0">
          <b>Orders</b>
          <p>0</p>
        </div>
      </div>

      <!-- Live Chart -->
      <div class="blocks">
        <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance" />
      </div>

      <!-- Orders Summary -->
      <div class="blocks d-flex flex-column justify-content-start border p-1">
        <div class="border-bottom text-start p-1">
          <small><i class="bi bi-cart2 me-1"></i></small><b class="text-danger">Orders</b>
        </div>
        <div class="d-flex justify-content-between p-2" v-for="(value, key) in orderStats" :key="key">
          <small :class="statusClasses[key]">{{ key }}</small>
          <span>{{ value }}</span>
        </div>
      </div>

      <!-- Reviews Summary -->
      <div class="blocks d-flex flex-column justify-content-start border p-1 m-0">
        <div class="border-bottom text-start p-1">
          <small><i class="bi bi-chat me-1"></i></small><b class="text-danger">Reviews</b>
        </div>
        <div class="d-flex justify-content-between p-2" v-for="(value, key) in reviewStats" :key="key">
          <small class="fw-bold">{{ key }}</small>
          <span>{{ value }}</span>
        </div>
      </div>

      <!-- Notifications -->
      <div class="blocks d-flex flex-column justify-content-start border p-1 m-0">
        <div class="border-bottom text-start p-1">
          <small><i class="bi bi-bell me-1"></i></small><b class="text-danger">Notifications</b>
        </div>
        <div class="text-center p-1" id="notic">
          <i class="bi bi-bell" style="font-size: 80px; color: gray"></i>
        </div>
      </div>

      <!-- Products Summary -->
      <div class="blocks d-flex flex-column justify-content-start border p-1 m-0">
        <div class="border-bottom text-start p-1">
          <small><i class="bi bi-briefcase me-1"></i></small><b class="text-danger">Products</b>
        </div>
        <div class="d-flex justify-content-between p-2" v-for="(value, key) in productStats" :key="key">
          <small class="fw-bold">{{ key }}</small>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>

    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";
import { useStoreApp } from "@/stores/app";
import CanvasJSChart from "@canvasjs/vue-charts";
import axios from "axios";

// Move static classes outside component for efficiency
const statusClasses = {
  Total: "text-secondary fw-bold",
  Completed: "text-success fw-bold",
  Cancelled: "text-danger fw-bold",
  "On Hold": "text-warning fw-bold",
  Pending: "text-muted fw-bold",
  Processing: "text-primary fw-bold",
  Refunded: "text-secondary fw-bold",
};

export default {
  name: "DashboardVendor",
  components: {
    KolshyStyleHeader,
    footerC,
    CanvasJSChart,
  },
  data() {
    return {
      chart: null,
      xValue: 1,
      yValue: 10,
      newDataCount: 10,
      timeout: null,
      options: {
        theme: "light2",
        animationEnabled: true,
        title: { text: "Live Data" },
        data: [{ type: "line", dataPoints: [] }],
      },
      styleOptions: {
        width: "100%",
        height: "360px",
      },
      orderStats: {
        Total: 0,
        Completed: 0,
        Cancelled: 0,
        "On Hold": 0,
        Pending: 0,
        Processing: 0,
        Refunded: 0,
      },
      reviewStats: {
        All: 0,
        Pending: 0,
        Spam: 0,
        Trash: 0,
      },
      productStats: {
        Total: 0,
        Live: 0,
        Offline: 0,
        "Pending Review": 0,
      },
    };
  },
  computed: {
    statusClasses() {
      return statusClasses;
    },
  },
  created() {
    // Get the store instance
    this.api = useStoreApp();
    this.fetchVendorProfile();
  },
  mounted() {
    // Set placeholder data for demonstration
    this.orderStats = {
      Total: 12,
      Completed: 8,
      Cancelled: 1,
      "On Hold": 1,
      Pending: 1,
      Processing: 0,
      Refunded: 1,
    };
    this.reviewStats = {
      All: 5,
      Pending: 2,
      Spam: 1,
      Trash: 2,
    };
    this.productStats = {
      Total: 20,
      Live: 15,
      Offline: 3,
      "Pending Review": 2,
    };
  },
  beforeUnmount() {
    // Clear timeout if component is destroyed
    clearTimeout(this.timeout);
  },
  methods: {
    async fetchVendorProfile() {
      const getDataVendor = this.api.baseUrl + this.api.endPoint.globel.profile.show_profile;
      try {
        const response = await axios.get(getDataVendor, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenkolshyVendor")}`,
          },
        });
        if ([200, 201].includes(response.status)) {
          const data = response.data?.data || response.data;
          this.api.vendor.profile = data;
          console.log("Vendor Profile:", data);
        }
      } catch (err) {
        console.error("Error fetching vendor profile:", err);
      }
    },
    updateData() {
      fetch(
        `https://canvasjs.com/services/data/datapoints.php?xstart=${this.xValue}&ystart=${this.yValue}&length=${this.newDataCount}&type=json`
      )
        .then((response) => response.json())
        .then(this.addData);
    },
    addData(data) {
      if (this.newDataCount !== 1) {
        data.forEach((val) => {
          this.options.data[0].dataPoints.push({ x: val[0], y: parseInt(val[1]) });
          this.xValue++;
          this.yValue = parseInt(val[1]);
        });
      } else {
        this.options.data[0].dataPoints.push({ x: data[0][0], y: parseInt(data[0][1]) });
        this.xValue++;
        this.yValue = parseInt(data[0][1]);
      }
      this.newDataCount = 1;
      if (this.chart) this.chart.render();
      this.timeout = setTimeout(this.updateData, 1000);
    },
    chartInstance(chart) {
      this.chart = chart;
      this.updateData();
    },
  },
};
</script>

<style scoped>
.container_blocks {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
i {
  font-size: 23px;
}
.blocks {
  width: 48%;
  height: 100%;
  align-self: center;
}
</style>