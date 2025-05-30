<template>
  <div class="signin">
    <!-- OTP Verification Section -->
    <div class="otp-container bg-light" :class="{ 'otp-active': showOtp }">
      <h2 class="otp-title">Verify Your Account</h2>
      <div class="otp-inputs">
        <input v-for="i in 6" :key="i" v-model="otp[i - 1]" @input="handleOtpInput($event, i - 1)" @keydown.delete="handleOtpDelete($event, i - 1)" ref="otpInputs" type="text" maxlength="1" class="otp-input" />
      </div>
      <div class="otp-actions">
        <v-btn @click="submitOtp" class="btn btn-verify">Verify</v-btn>
        <v-btn @click="resendOtp" class="btn btn-resend">Resend Code</v-btn>
      </div>
      <div class="otp-feedback" :class="feedbackClass">{{ feedbackMessage }}</div>
    </div>

    <!-- Password Reset Form -->
    <section class="div-login" :class="{ 'form-hidden': showOtp }">
      <div class="rounded p-2 bg-light form-sign">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="mb-4"><img src="https://kolshy.ae/wp-content/uploads/2025/02/Layer_1.svg" class="img-fluid" alt="logo-form" /></div>
          <h1 class="fs-1 fw-bold mt-4" style="color: #000336">Reset Password</h1>
          <v-form v-model="valid" method="post" class="w-100 p-0" @submit.prevent="submitForm()">
            <input type="hidden" v-model="token_pass" />

            <small v-if="emailError" style="font-size: 12px; font-weight: bold; color: red">{{ emailError }}</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4">
              <input type="text" name="email" id="userName" v-model="email" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="Email or Phone" aria-label="Username" required />
              <span class="input-text" style="cursor: pointer" @click="email = ''">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <path fill="#E51742" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" />
                </svg>
              </span>
            </div>

            <small v-if="passwordError" style="font-size: 12px; font-weight: bold; color: red">{{ passwordError }}</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4">
              <input :type="passwordFieldType" v-model="password" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="New Password" aria-label="Password" required />
              <span class="input-text" style="cursor: pointer" @click="togglePasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <g fill="none" stroke="#E51742" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                    <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                  </g>
                </svg>
              </span>
            </div>

            <small v-if="passwordConfirmationError" style="font-size: 12px; font-weight: bold; color: red">{{ passwordConfirmationError }}</small>
            <div style="border: none; border-bottom: 1px solid #e51742" class="input-group w-100 justify-content-between align-items-end mb-4">
              <input type="password" v-model="password_confirmation" class="bg-transparent w-75 p-2" style="border: none; outline: none; font-weight: 500" placeholder="Confirm Password" aria-label="Confirm Password" required />
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center mb-4 mt-4">
              <v-btn type="submit" class="btn rounded-3 d-flex justify-content-center align-items-center w-100 mb-2" style="background-color: #e51742; color: var(--text-color-secondary); font-weight: 700; font-size: 20px" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isSubmitting ? "Processing..." : "Reset Password" }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStoreApp } from "../../stores/app"; // Adjust the import path as needed
export default {
  name: "PasswordReset",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      otp: Array(6).fill(""),
      showOtp: false,
      token_pass: "",
      feedbackMessage: "",
      feedbackClass: "",
      emailError: "",
      passwordError: "",
      passwordConfirmationError: "",
      isSubmitting: false,
      passwordFieldType: "password",
    };
  },
  setup() {
    const toast = useToast();
    const api = useStoreApp();
    return { toast, api };
  },
  methods: {
    validateForm() {
      let isValid = true;

      this.emailError = "";
      this.passwordError = "";
      this.passwordConfirmationError = "";

      if (!this.email) {
        this.emailError = "Email or phone is required";
        isValid = false;
      }

      if (!this.password) {
        this.passwordError = "Password is required";
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters";
        isValid = false;
      }

      if (this.password !== this.password_confirmation) {
        this.passwordConfirmationError = "Passwords do not match";
        isValid = false;
      }

      return isValid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.forget_pass.send_otp;
        const response = await axios.post(fullApi, { email_or_phone: this.email });

        if ([200, 201].includes(response.status)) {
          this.toast.success("Verification code sent to your email");
          this.showOtp = true;
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to send verification code";
        this.toast.error(errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },

    handleOtpInput(event, index) {
      const value = event.target.value;
      if (!/^\d*$/.test(value)) {
        this.otp[index] = "";
        return;
      }

      this.otp[index] = value;
      if (value && index < 5) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },

    handleOtpDelete(event, index) {
      if (event.key === "Backspace" && !this.otp[index] && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },

    async submitOtp() {
      const otpCode = this.otp.join("");
      if (otpCode.length !== 6) {
        this.toast.warning("Please enter complete 6-digit code");
        return;
      }

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.forget_pass.verify_otp;
        const response = await axios.post(
          fullApi,
          {
            email_or_phone: this.email,
            otp: otpCode,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token_pass}`,
            },
          }
        );

        if ([200, 201].includes(response.status)) {
          this.token_pass = response.data.data?.verification_token;
          this.toast.success("Verification successful!");
          await this.resetPass();
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Verification failed";
        this.toast.error(errorMessage);
        this.feedbackClass = "feedback-error";
        this.feedbackMessage = errorMessage;
      }
    },

    async resendOtp() {
      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.forget_pass.send_otp;
        await axios.post(fullApi, { email_or_phone: this.email });

        this.toast.success("New verification code sent!");
        this.otp = Array(6).fill("");
        this.feedbackClass = "feedback-success";
        this.feedbackMessage = "New code sent!";
      } catch (error) {
        this.toast.error("Failed to resend verification code");
      }
    },

    async resetPass() {
      if (!this.validateForm()) return;

      try {
        const fullApi = this.api.baseUrl + this.api.endPoint.globel.auth.forget_pass.reset_pass;
        const response = await axios.post(fullApi, {
          verification_token: this.token_pass,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        if ([200, 201].includes(response.status)) {
          this.toast.success("Password reset successfully!");
          location.pathname = "/login";
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to reset password";
        this.toast.error(errorMessage);
      }
    },

    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
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

@media (max-width: 668px) {
  .form-sign {
    width: 100%;
  }

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
