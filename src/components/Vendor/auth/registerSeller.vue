<template>
  <div class="register-page">
    <KolshyStyleHeader />

    <!-- OTP Verification Dialog -->
    <el-dialog
      v-model="showOtp"
      title="Verify Your Account"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <div class="otp-inputs">
        <el-input
          v-for="i in 6"
          :key="i"
          v-model="otp[i - 1]"
          maxlength="1"
          class="otp-input"
          @input="handleOtpInput($event, i - 1)"
          @keydown.delete="handleOtpDelete($event, i - 1)"
          ref="otpInputs"
          style="width: 40px; text-align: center; margin: 0 4px;"
        />
      </div>
      <div class="otp-actions" style="margin-top: 16px;">
        <el-button type="primary" @click="submitOtp" :loading="isVerifying" style="margin-right: 8px;">Verify</el-button>
        <el-button @click="resendOtp" :loading="isResending" plain>Resend Code</el-button>
      </div>
      <el-alert
        v-if="feedbackMessage"
        :title="feedbackMessage"
        :type="feedbackClass === 'feedback-success' ? 'success' : 'error'"
        show-icon
        style="margin-top: 16px;"
      />
    </el-dialog>

    <!-- Registration Form -->
    <el-row justify="center" style="margin-top: 32px;">
      <el-col :xs="24" :sm="20" :md="16" :lg="12">
        <el-card shadow="never" class="form-sign w-100">
          <div class="form-logo" style="text-align:center;">
            <img
              src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif"
              class="img-fluid"
              alt="logo-form"
              style="max-width: 220px;"
            />
          </div>
          <h1 class="fs-1 fw-bold mt-4" style="color: #000336; text-align:center;">Create Customer Account</h1>
          <el-form
            :model="form"
            :rules="rules"
            ref="registerForm"
            label-position="top"
            @submit.prevent="sendForm"
            class="mt-4"
          >
            <el-form-item label="Name" prop="Name">
              <el-input v-model="form.Name" placeholder="Name" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" placeholder="Email" type="email" />
            </el-form-item>
            <el-form-item label="Password" prop="Password">
              <el-input v-model="form.Password" placeholder="Password" type="password" show-password />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="Password_confirmation">
              <el-input v-model="form.Password_confirmation" placeholder="Confirm Password" type="password" show-password />
            </el-form-item>
            <el-form-item label="Shop Name" prop="shopName">
              <el-input v-model="form.shopName" placeholder="Shop Name" />
            </el-form-item>
            <el-form-item label="Street">
              <el-input v-model="form.street" placeholder="Street" />
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="City">
                  <el-input v-model="form.city" placeholder="City" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="ZIP">
                  <el-input v-model="form.ZIP" placeholder="ZIP" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Country">
              <el-select v-model="form.country" placeholder="Select Your Country">
                <el-option label="Egypt" value="eg" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="(lang, i) in languages"
              :key="i"
              :label="`About in ${lang}`"
            >
              <el-input v-model="form.about[lang]" :placeholder="`About in ${lang}`" />
            </el-form-item>
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="form.phone" placeholder="Phone" />
            </el-form-item>
            <el-form-item prop="accept">
              <el-checkbox v-model="form.accept">
                I accept terms & conditions
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                native-type="submit"
                :loading="isSubmitting"
                :disabled="isSubmitting"
                style="width: 100%;"
              >
                Create An Account
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <footerC />
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStoreApp } from "../../../stores/app";
import { useRouter } from "vue-router";
import KolshyStyleHeader from "@/components/Global/topBar";
import footerC from "@/components/Global/footer";

export default {
  name: "RegisterSeller",
  components: {
    KolshyStyleHeader,
    footerC,
  },
  setup() {
    const toast = useToast();
    const api = useStoreApp();
    const router = useRouter();

    const form = reactive({
      Name: "",
      email: "",
      Password: "",
      Password_confirmation: "",
      shopName: "",
      street: "",
      city: "",
      ZIP: "",
      country: "",
      phone: "",
      about: {},
      accept: false,
    });

    const languages = ["en", "ar"];

    const rules = {
      Name: [{ required: true, message: "Please enter a valid name", trigger: "blur" }],
      email: [
        { required: true, message: "Please enter a valid email", trigger: "blur" },
        { type: "email", message: "Please enter a valid email", trigger: "blur" },
      ],
      Password: [
        { required: true, message: "Password is required", trigger: "blur" },
        { min: 8, message: "Password must be at least 8 characters", trigger: "blur" },
      ],
      Password_confirmation: [
        { required: true, message: "Please confirm your password", trigger: "blur" },
        {
          validator: (rule, value) => value === form.Password,
          message: "Passwords do not match",
          trigger: "blur",
        },
      ],
      shopName: [{ required: true, message: "Please enter a shop name", trigger: "blur" }],
      phone: [
        { required: true, message: "Please enter a valid phone", trigger: "blur" },
        { min: 8, message: "Phone must be at least 8 digits", trigger: "blur" },
      ],
      accept: [
        {
          validator: (rule, value) => value === true,
          message: "You must accept terms & conditions",
          trigger: "change",
        },
      ],
    };

    // OTP
    const showOtp = ref(false);
    const otp = ref(Array(6).fill(""));
    const feedbackMessage = ref("");
    const feedbackClass = ref("");
    const otpRequested = ref(false);
    const isVerifying = ref(false);
    const isResending = ref(false);
    const isSubmitting = ref(false);

    // Form ref
    const registerForm = ref();

    // --- Methods ---
    const sendForm = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;
      await registerForm.value.validate(async (valid) => {
        if (!valid) {
          toast.error("Please fill all required fields correctly");
          isSubmitting.value = false;
          return;
        }
        const userData = {
          name: form.Name,
          email: form.email,
          password: form.Password,
          password_confirmation: form.Password_confirmation,
          phone: form.phone,
          store_name: form.shopName,
          about: form.about,
          street: form.street,
          city: form.city,
          zip: form.ZIP,
          country: form.country,
          phone: form.phone
        };
        try {
          const fullApi = api.baseUrl + api.endPoint.seller.auth.register;
          const response = await axios.post(fullApi, userData);
          if ([200, 201].includes(response.status)) {
            const token = response.data.data.token;
            localStorage.setItem("tokenkolshyvendor", token);

            if (!otpRequested.value) {
              const otpUrl = api.baseUrl + api.endPoint.globel.auth.verify.get_otp;
              await axios.get(otpUrl, {
                headers: { Authorization: `Bearer ${token}` },
              });
              otpRequested.value = true;
              showOtp.value = true;
              toast.success("OTP sent successfully!");
            }
          }
        } catch (error) {
          handleApiError(error, "registration");
        } finally {
          isSubmitting.value = false;
        }
      });
    };

    const handleOtpInput = (event, index) => {
      const value = event.target.value.replace(/\D/g, "");
      otp.value[index] = value ? value.slice(-1) : "";
      if (value && index < 5) {
        const nextInput = document.querySelectorAll(".otp-input")[index + 1];
        if (nextInput) nextInput.focus();
      }
    };

    const handleOtpDelete = (event, index) => {
      if (event.key === "Backspace" && !otp.value[index] && index > 0) {
        otp.value[index - 1] = "";
        const prevInput = document.querySelectorAll(".otp-input")[index - 1];
        if (prevInput) prevInput.focus();
      }
    };

    const submitOtp = async () => {
      if (isVerifying.value) return;
      isVerifying.value = true;
      const otpCode = otp.value.join("");
      if (otpCode.length !== 6) {
        toast.warning("Please enter the complete 6-digit code");
        isVerifying.value = false;
        return;
      }
      try {
        const otpApi = api.baseUrl + api.endPoint.globel.auth.verify.verify_otp;
        const response = await axios.post(
          otpApi,
          { channel: "email", otp: otpCode },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenkolshyvendor")}`,
            },
          }
        );
        if ([200, 201].includes(response.status)) {
          toast.success("Account verified successfully!");
          router.push("/");
        }
      } catch (error) {
        handleApiError(error, "verification");
      } finally {
        isVerifying.value = false;
      }
    };

    const resendOtp = async () => {
      if (isResending.value) return;
      isResending.value = true;
      try {
        const otpUrl = api.baseUrl + api.endPoint.globel.auth.verify.get_otp;
        await axios.get(otpUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem("tokenkolshyvendor")}` },
        });
        toast.success("New OTP sent successfully!");
        otp.value = Array(6).fill("");
        feedbackMessage.value = "New code sent!";
        feedbackClass.value = "feedback-success";
      } catch (error) {
        handleApiError(error, "OTP resend");
      } finally {
        isResending.value = false;
      }
    };

    const handleApiError = (error, context) => {
      let errorMessage = `An error occurred during ${context}`;
      if (error.response) {
        const data = error.response.data;
        if (data.errors) {
          errorMessage = Object.values(data.errors).flat().join(", ");
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        errorMessage = "No response from server";
      }
      toast.error(errorMessage);
      feedbackMessage.value = errorMessage;
      feedbackClass.value = "feedback-error";
    };

    return {
      form,
      rules,
      languages,
      sendForm,
      showOtp,
      otp,
      feedbackMessage,
      feedbackClass,
      otpRequested,
      isVerifying,
      isResending,
      isSubmitting,
      handleOtpInput,
      handleOtpDelete,
      submitOtp,
      resendOtp,
      registerForm,
    };
  },
};
</script>

<style scoped>
.form-sign {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 32px 24px;
  margin-bottom: 32px;
}
.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 24px 0 0 0;
}
.otp-input {
  text-align: center;
  font-size: 1.5rem;
}
@media (max-width: 768px) {
  .form-sign {
    padding: 16px 4px;
  }
}
</style>