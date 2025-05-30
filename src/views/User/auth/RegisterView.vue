<template>
  <div>
    <KolshyStyleHeader />
    <registerUser />
    <footerC />
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar"
import footerC from "@/components/Global/footer"
import registerUser from '@/components/User/auth/register'
export default {
    name: 'SigninView',
    components: {
        registerUser,
        KolshyStyleHeader,
        footerC
    }
}
</script>

<style>

</style>