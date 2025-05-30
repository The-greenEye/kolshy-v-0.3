<template>
  <div class="signin">
    <section class="div-login">
      <div class="rounded p-2 bg-light form-sign">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="mb-4"><img src="https://kolshy.ae/wp-content/uploads/2025/02/Layer_1.svg" class="img-fluid" alt="logo-form" /></div>
          <h1 class="fs-1 fw-bold mt-4" style="color: #000336">Log In Like Costumer</h1>
          <form method="post" class="w-100 p-0" @submit.prevent="submitForm()">
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4">
              <input type="text" name="userName" id="userName" v-model="user_name" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
              <span class="input-text" style="cursor: pointer" onclick="document.getElementById('userName').value = '';">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="#E51742" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
              </span>
            </div>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-0">
              <input :type="type_inputs === true ? 'password' : 'text'" v-model="password" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
              <span @mousemove="type_inputs === false" class="input-text" style="cursor: pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <g fill="none" stroke="#E51742" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                    <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                  </g>
                </svg>
              </span>
            </div>
            <small class="text-secondary fw-bold">Forget My <router-link to="/res_pass">Password?</router-link></small>
            <div class="d-flex flex-column justify-content-center align-items-center mb-4 mt-4">
              <button @click="submitForm()" class="btn rounded-3 d-flex justify-content-center align-items-center w-100 mb-2" style="background-color: #e51742; color: var(--text-color-secondary); font-weight: 700; font-size: 20px">
                Sign In
                <span class="ml-2 mt-2"
                  ><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd" /></svg
                ></span>
              </button>
              <button class="btn w-100 d-flex justify-content-center align-items-center w-100 mb-4 p-2" style="background-color: rgb(180, 180, 180); color: var(--text-color); font-weight: 700">
                <span class="mr-2"
                  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128">
                    <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38" />
                    <path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21" />
                    <path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9" />
                    <path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68" />
                    <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4" /></svg
                ></span>
                <b style="margin-bottom: 5px">Sign in with google</b>
              </button>
            </div>
          </form>
          <div class="mt-4 d-flex justify-content-around align-items-center w-100">
            <p class="text-center text-secondary mb-0" style="font-weight: 400">Don't have an account?</p>
            <a href="./register" style="color: #e51742; text-decoration: underline; font-weight: 600">Create Account</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStoreApp } from "../../../stores/app"; // Adjust the import path as needed
export default {
  name: "login",
  data() {
    return {
      user_name: "",
      password: "",
      type_inputs: true,
    };
  },
  setup() {
    const toast = useToast();
    const api = useStoreApp();
    return { toast, api };
  },
  methods: {
    async submitForm() {
      const userData = {
        email_or_phone: this.user_name,
        password: this.password,
      };
      try {
        const fullUrl = this.api.baseUrl + this.api.endPoint.customer.auth.login;
        console.log("Full API URL:", fullUrl); // Debugging: Log the full URL
        const res_log_in = await axios.post(fullUrl, userData);

        if (res_log_in.status === 200 || res_log_in.status === 201) {
          this.toast.success("Your Login Customer Successfully");
          location.pathname = "/";
        }
      } catch (error) {
        // Debugging: Log error details for inspection
        console.error("API Error:", error);

        // Provide more detailed error messages
        if (error.response) {
          this.toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          this.toast.error("No response received from the server.");
        } else {
          this.toast.error("Error in request configuration or other issue.");
        }
      }
    },
  },
};
</script>

<style>
.form-sign {
  width: 50%;
  margin: 10% auto;
  box-shadow: 0px 0px 10px 1px #fccfd9;
}
@media (max-width: 668px) and (min-width: 320px) {
  .form-sign {
    width: 100%;
  }
}
</style>
