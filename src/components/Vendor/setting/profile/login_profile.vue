<template>
  <div class="login_security">
    <div class="form text-center" :class="FormLogin ? 'd-block' : 'd-none'" style="width: 35%; margin: 100px auto">
      <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" width="180" height="180" alt="Kolshy Logo" class="img-fluid" />
      <div class="border rounded p-5">
        <h2 class="text-start fw-bold">Sign in</h2>
        <hr />
        <div v-if="userData.length">
          <div class="d-flex justify-content-start align-items-top p-2" v-for="(user, n) in userData" :key="n">
            <v-avatar color="secondary" size="x-large"><i class="bi bi-person-fill fs-3"></i></v-avatar>
            <div class="d-flex flex-column justify-content-start ms-2 text-start">
              <b class="fw-bold">{{ user.name }}</b>
              <p>{{ user.email.slice(0, 19) }}</p>
            </div>
          </div>
        </div>

        <div :class="{ 'd-none': showLoders }">
          <el-skeleton />
          <br />
          <el-skeleton style="--el-skeleton-circle-size: 10px">
            <div>
              <el-skeleton-item variant="circle" />
            </div>
          </el-skeleton>
        </div>

        <form @submit.prevent class="text-start">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <label for="pass">Password</label>
            <router-link to="/res_pass" class="fw-bold">Forget Password?</router-link>
          </div>
          <input id="pass" type="password" v-model="password" class="form-control" />
          <button type="submit" @click="submitForm" id="subm" class="btn fw-bold mt-4 w-100 rounded-pill" style="background-color: #e51748">Sign in</button>
        </form>
      </div>
    </div>

    <!-- Profile Settings Panel -->
    <div style="width: 35%; margin: 100px auto" class="text-center d-flex flex-column justify-content-start" :class="verifyLogin ? 'd-block' : 'd-none'">
      <h1 class="fw-bold">Login & Security</h1>
      <div class="w-100 border rounded p-4">
        <div v-for="(update, n) in updateSetting" :key="n" class="p-2 bg-transparent d-flex justify-content-between border-bottom align-items-center w-100">
          <div class="text-start w-75">
            <b class="fw-bold">{{ update.text }}</b>
            <input :type="update.type || 'text'" class="form-control border-0" v-model="update.info" :placeholder="update.description" />
          </div>
          <button class="btn rounded-pill border bg-transparent text-primary fw-bold" @click="updateProfile(update.text, update.info)">
            {{ update.info ? "Edit" : "Add" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoreApp } from "@/stores/app";
import { useToast } from "vue-toastification";
import axios from "axios";

export default {
  name: "LoginSecurity",
  data() {
    return {
      verifyLogin: false,
      FormLogin: true,
      showLoders: false,
      userData: [],
      password: "",
      updateSetting: [
        { text: "Name", info: "", description: "Your First & Last Name", type: "text" },
        { text: "Email", info: "", description: "Your Email", type: "email" },
        { text: "⚡ Primary Mobile Number", info: "", description: "Your mobile number", type: "tel" },
        { text: "PassKey", info: "", description: "Secure key", type: "password" },
        { text: "Password", info: "********", description: "Your account password", type: "password" },
        { text: "⚡ 2-step verification", info: "", description: "Enable 2FA", type: "text" },
      ],
    };
  },
  setup() {
    return {
      api: useStoreApp(),
      toast: useToast(),
    };
  },
  methods: {
    async submitForm() {
      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.customer.auth.login;
        const email = this.userData.length ? this.userData[0].email : "";
        document.getElementById("subm").innerText = "Wait...";

        const res = await axios.post(fullApi, {
          email_or_phone: email,
          password: this.password,
        });

        if ([200, 201].includes(res.status)) {
          this.verifyLogin = true;
          this.FormLogin = false;
          this.toast.success("Successfully logged in");
        }
      } catch (err) {
        this.toast.error(err.response?.data?.message || "Login failed");
      } finally {
        document.getElementById("subm").innerText = "Sign in";
      }
    },

    async updateProfile(field, value) {
      try {
        const payload = {};
        if (field.includes("Name")) payload.name = value;
        if (field.includes("Email")) payload.email_or_phone = value;
        if (field.includes("Password")) payload.password = value;
        if (field.includes("Mobile")) payload.phone = value;

        const url = this.api.baseUrl + this.api.endPoint.globel.profile.update_profile;
        const res = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenkolshy")}`,
          },
        });

        if ([200, 201].includes(res.status)) {
          this.toast.success(`${field} updated successfully`);
        }
      } catch (err) {
        this.toast.error(`Failed to update ${field}`);
      }
    },
  },
  async mounted() {
    try {
      const fullApi = this.api.baseUrl + this.api.endPoint.globel.profile.show_profile;
      const res = await axios.get(fullApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenkolshyvendor")}`,
        },
      });

      if ([200, 201].includes(res.status)) {
        this.userData = [res.data.data];
        this.updateSetting[0].info = res.data.data.name;
        this.updateSetting[1].info = res.data.data.email;
        this.showLoders = true;
      }
    } catch (err) {
      console.error("Error loading profile", err);
    }
  },
};
</script>

<style scoped>
.login_security .form {
  max-width: 100%;
  min-width: 320px;
}
</style>
