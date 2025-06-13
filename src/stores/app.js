import { defineStore } from "pinia";

// Basic EndPoint Api
export const useStoreApp = defineStore("Api", {
  state: () => ({
    baseUrl: "https://back.kolshy.ae/api/",
    timeOut: 10000,
    endPoint: {
      customer: {
        auth: {
          login: "auth/customer/login",
          register: "customer/register",
        },
        address: {
          add_address: "customer/addresses",
          update_address: "customer/addresses/",
          get_address: "customer/addresses",
          get_address_id: "customer/addresses/",
          delete_address: "customer/addresses/",
        },
        sections: {
          get_sections: "customer/home/sections",
          get_sections_id: "customer/home/sections/",
        },
      },
      seller: {
        auth: {
          register: "seller/register",
          formData: "seller/register/form-data",
          login: "auth/seller/login",
        },
      },
      globel: {
        auth: {
          forget_pass: {
            send_otp: "auth/forgot-password/send-otp",
            verify_otp: "auth/forgot-password/verify-otp",
            reset_pass: "auth/forgot-password/reset-password",
          },
          verify: {
            get_otp: "auth/verification/get-otp/email",
            verify_otp: "auth/verification/verify",
          },
          logout: "auth/logout",
        },
        Countries: {
          get_all: "countries",
          get_city_by_country: "countries/",
        },
        profile: {
          update_profile: "profile",
          show_profile: "profile",
        },
      },
      admin: {
        auth: {
          login: "auth/admin/login",
        },
        languages: {
          create_form_data: "admin/languages/create/form-data",
          get_all: "admin/languages",
          add: "admin/languages",
          get_by_id: "admin/languages/",
          update: "admin/languages/",
          delete: "admin/languages/",
        },
        categories: {
          create_form_data: "admin/categories/form-data",
          create: "admin/categories",
          get_all: "admin/categories",
          get_by_id: "admin/categories/",
          update: "admin/categories/",
        },
        collections: {
          create_form_data: "admin/collections/form-data",
          create: "admin/collections",
          get_all: "admin/collections",
          get_by_id: "admin/collections/",
          update: "admin/collections/",
          delete: "admin/collections/",
        },
        featured_items: {
          create_form_data: "admin/featured-items/form-data",
          create: "admin/featured-items",
          get_all: "admin/featured-items",
          get_by_id: "admin/featured-items/",
          update: "admin/featured-items/",
          delete: "admin/featured-items/",
        },
        sections: {
          create_form_data: "admin/sections/form-data",
          create: "admin/sections",
          get_all: "admin/sections",
          get_by_id: "admin/sections/",
          update: "admin/sections/",
          delete: "admin/sections/",
          reorder: "admin/sections/order/update",
        },
      },
    },
  }),
});

// Customer Data
export const useStoreCustomer = defineStore("Customer", {
  state: () => ({
    customer: {
      token: "",
      data: [],
    },
  }),
});

//Vendor Data 
export const useStoreVendor = defineStore; ("Vendor", {
  state: () => ({
    vendor: {
      token: "",
      data: [],
    },
  }),
});

