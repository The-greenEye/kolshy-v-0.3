<template>
  <div>
<KolshyStyleHeader />
<div class="setting_account"><YourAccaount /></div>
<footerC />
  </div>
</template>

<script>
import YourAccaount from "@/components/Vendor/setting/setting_profile.vue"
import KolshyStyleHeader from "@/components/Global/topBar"
import footerC from "@/components/Global/footer"
export default {
    name: "SettingAccount",
    components: {
        YourAccaount,
        KolshyStyleHeader,
        footerC
    }
}
</script>

<style>

</style>