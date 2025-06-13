<template>
  <div class="register-page">
    <!-- OTP Verification Section -->
    <div class="otp-container bg-light" :class="{ 'otp-active': showOtp }">
      <h2 class="otp-title">Verify Your Account</h2>
      <div class="otp-inputs">
  <input
    v-model="otp"
    type="text"
    maxlength="6"
    class="otp-input"
    autocomplete="one-time-code"
    inputmode="numeric"
    pattern="[0-9]*"
    @input="handleOtpInput"
    placeholder="Enter 6-digit code"
  />
</div>
      <div class="otp-actions">
        <button @click="submitOtp" class="btn btn-verify">Verify</button>
        <button @click="resendOtp" class="btn btn-resend">Resend Code</button>
      </div>
      <div class="otp-feedback" :class="feedbackClass">{{ feedbackMessage }}</div>
    </div>

    <!-- Registration Form -->
    <section class="registration-form" :class="{ 'form-hidden': showOtp }">
      <div class="rounded p-2 bg-light form-sign">
        <div class="d-flex flex-column justify-content-center align-items-start">
          <center>
            <div class="mb-4"><img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" class="img-fluid" alt="logo-form" /></div>
          </center>
          <h1 class="fs-1 fw-bold mt-4" style="color: #000336">Create Costumer Account</h1>
          <form method="post" class="w-100 p-0" @submit.prevent="sendForm()">
            <small v-if="v$.Name.$error && v$.Name.$dirty" style="font-size: 12px; font-weight: bold; color: red">Please enter a valid name</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-0">
              <input type="text" name="name" id="name" v-model="Name" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="Name" aria-label="Name" @blur="v$.Name.$touch()" required />
            </div>
            <small style="font-size: 12px; font-weight: bold; color: gray">Just use [A,Z,a,z,1,9,@]</small>

            <small v-if="v$.Email.$error && v$.Email.$dirty" style="font-size: 12px; font-weight: bold; color: red">Please enter a valid email</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4 mt-4">
              <input type="email" class="bg-transparent w-75 p-2" v-model="Email" style="border: none; outline: none; font-weight: 500" placeholder="Email" aria-label="Email" @blur="v$.Email.$touch()" required />
            </div>

            <small v-if="v$.Password.$error && v$.Password.$dirty" style="font-size: 12px; font-weight: bold; color: red">Password must be at least 6 characters</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-0">
              <input type="password" class="bg-transparent w-75 p-2" v-model="Password" style="border: none; outline: none; font-weight: 500" placeholder="Password" aria-label="Password" @blur="v$.Password.$touch()" required />
            </div>
            <small style="font-size: 12px; font-weight: bold; color: gray">must use at least 6 characters</small>

            <small v-if="v$.Password_confirmation.$error && v$.Password_confirmation.$dirty" style="font-size: 12px; font-weight: bold; color: red">Passwords do not match</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4 mt-4">
              <input type="password" class="bg-transparent w-75 p-2" v-model="Password_confirmation" style="border: none; outline: none; font-weight: 500" placeholder="Confirm Your Password" aria-label="Confirm Password" @blur="v$.Password_confirmation.$touch()" required />
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center mb-4">
              <button type="submit" class="btn rounded-3 d-flex justify-content-center align-items-center w-100 mb-2" style="background-color: #e51742; color: var(--text-color-secondary); font-weight: 700; font-size: 20px" :disabled="v$.$invalid || isSubmitting">
                Create Account
                <span class="ml-2 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                    <path fill="#fff" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>

              <button class="btn w-100 d-flex justify-content-center align-items-center w-100 mb-4 p-2" style="background-color: rgb(180, 180, 180); color: var(--text-color); font-weight: 700" type="button">
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128">
                    <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38" />
                    <path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21" />
                    <path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9" />
                    <path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68" />
                    <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4" />
                  </svg>
                </span>
                <b style="margin-bottom: 5px">Sign up with google</b>
              </button>
            </div>
          </form>

          <div class="mt-4 d-flex justify-content-center align-items-center w-100">
            <p class="text-center text-secondary mb-0" style="font-weight: 400">Already have account?</p>
            <router-link to="/login" style="color: #e51742; text-decoration: underline; font-weight: 600">Sign in</router-link>
          </div>

          <div class="mt-4 d-flex justify-content-center align-items-center w-100">
            <p class="text-center text-secondary mb-0" style="font-weight: 400">Create a vendor account</p>
            <router-link to="/register_seller" style="color: #e51742; text-decoration: underline; font-weight: 600">Sign up</router-link>
          </div>

          <div class="mt-4 d-flex justify-content-center align-items-center w-100">
            <div class="btn rounded-3 d-flex justify-content-center align-items-center w-100 mb-2" style="background-color: #000336; color: var(--text-color-secondary); font-weight: 700; font-size: 20px">
              Want to sell via Kolshy ?
              <span class="ml-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <path fill="#fff" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStoreApp, useStoreCustomer } from "@/stores/app";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    return {
      v$: useVuelidate(),
      toast: useToast(),
      api: useStoreApp(),
      customer: useStoreCustomer(),
      router: useRouter(),
    };
  },
  data() {
    return {
      showOtp: false,
      Name: "",
      Email: "",
      Password: "",
      Password_confirmation: "",
      otp: '',
      feedbackMessage: "",
      feedbackClass: "",
      otpRequested: false,
      isVerifying: false,
      isResending: false,
      isSubmitting: false,
    };
  },
  validations() {
    return {
      Name: { required },
      Email: { required, email },
      Password: {
        required,
        minLength: minLength(6),
      },
      Password_confirmation: {
        required,
        sameAs: sameAs(this.Password),
      },
    };
  },
  methods: {
    async sendForm() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      const isFormValid = await this.v$.$validate();

      if (!isFormValid) {
        this.toast.error("Please fill all required fields correctly");
        this.isSubmitting = false;
        return;
      }

      const userData = {
        name: this.Name,
        email_or_phone: this.Email,
        password: this.Password,
        password_confirmation: this.Password_confirmation,
      };

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.customer.auth.register;
        const response = await axios.post(fullApi, userData);

        if ([200, 201].includes(response.status)) {
          const token = response.data.data.token;
          this.customer.token = token;
          this.customer.token = response.data.data;
          console.log(this.customer.token);
          console.log(this.customer.data);
          if (!this.otpRequested) {
            const fullApi2 = this.api.baseUrl + this.api.endPoint.globel.auth.verify.get_otp;
            await axios.get(fullApi2, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.otpRequested = true;
            this.showOtp = true;
            this.toast.success("OTP sent successfully!");
            this.$nextTick(() => {
              if (this.$refs.otpInputs && this.$refs.otpInputs[0]) {
                this.$refs.otpInputs[0].focus();
              }
            });
          }
        }
      } catch (error) {
        this.handleApiError(error, "registration");
      } finally {
        this.isSubmitting = false;
      }
    },

    handleOtpInput(event) {
  // Only allow numeric and max 6 digits
  let value = event.target.value.replace(/\D/g, '');
  if (value.length > 6) value = value.slice(0, 6);
  this.otp = value;
},

    // No longer needed for single input OTP


    async submitOtp() {
      if (this.isVerifying) return;
      this.isVerifying = true;
      const otpCode = this.otp;

      if (otpCode.length !== 6) {
  this.toast.warning("Please enter the complete 6-digit code");
  this.isVerifying = false;
  return;
}

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.verify.verify_otp;
        const verificationResponse = await axios.post(
          fullApi,
          {
            channel: "email",
            otp: otpCode,
          },
          {
            headers: {
              Authorization: `Bearer ${this.customer.token}`,
            },
          }
        );

        if ([200, 201].includes(verificationResponse.status)) {
          this.toast.success("Account verified successfully!");
          this.router.push("/login");
        }
      } catch (error) {
        this.handleApiError(error, "verification");
      } finally {
        this.isVerifying = false;
      }
    },

    async resendOtp() {
      if (this.isResending) return;
      this.isResending = true;

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.verify.get_otp;
        await axios.get(fullApi, {
          headers: {
            Authorization: `Bearer ${this.customer.token}`,
          },
        });

        this.toast.success("New OTP sent successfully!");
        this.otp = '';
        this.otp(() => {
          if (this.otpInputs && this.otpInputs[0]) {
            this.otpInputs[0].focus();
          }
        });
        this.feedbackClass = "feedback-success";
        this.feedbackMessage = "New code sent!";
      } catch (error) {
        this.handleApiError(error, "OTP resend");
      } finally {
        this.isResending = false;
      }
    },

    handleApiError(error, context) {
      let errorMessage = `An error occurred during ${context}`;
      console.error(`Error in ${context}:`, error);
      if (error.response) {
        if (error.response.status === 422 && error.response.data && error.response.data.errors) {
          errorMessage = Object.values(error.response.data.errors).flat().join(", ");
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = errorMessage; // Keep the default error message
        }
      } else if (error.request) {
        errorMessage = "No response received from server";
      }
      this.toast.error(errorMessage);
      this.feedbackClass = "feedback-error";
      this.feedbackMessage = errorMessage;
    },
  },
};
</script>
<style>
.otp-container {
  transition: all 0.3s ease;
  transform: scale(0);
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background: white;
  width: 90%;
  max-width: 500px;
}

.otp-active {
  transform: translate(-50%, -50%) scale(1);
  display: block;
}

.otp-inputs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.otp-input {
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.otp-input:focus {
  border-color: #e51742;
  box-shadow: 0 0 8px rgba(229, 23, 66, 0.2);
  outline: none;
}

.otp-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-verify {
  background: #e51742;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-verify:hover {
  background: #c31136;
}

.btn-resend {
  border: 2px solid #e51742;
  color: #e51742;
  background: transparent;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-resend:hover {
  background: #e51742;
  color: white;
}

.otp-feedback {
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}

.feedback-error {
  color: #dc3545;
}

.feedback-success {
  color: #28a745;
}

.form-hidden {
  opacity: 0.3;
  pointer-events: none;
  user-select: none;
}

@media (max-width: 576px) {
  .otp-input {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .otp-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-verify,
  .btn-resend {
    width: 100%;
  }
}
</style>
