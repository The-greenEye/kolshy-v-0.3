<template>
  <div>
    <router-view />
    <div class="reload-screen">
      <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" class="img-fluid" alt="" />
    </div>
  </div>
</template>

<script>
import KolshyStyleHeader from "@/components/Global/topBar"
export default {
  name: "App",
  components: {
    KolshyStyleHeader
  }
}
</script>

<style>
body {
  background-color: #f3eeee;
}
v-btn {
  cursor: pointer;
  background-color: #e51742;
  transition: all 0.3s ease-in-out;
}
v-btn:hover {
  background-color: #000336;
}
.top-blackFriday-div {
  background-color: #000336;
  color: #fff;
  font-weight: 400;
}
.secound-nav {
  background-color: #fff;
  /* padding: 0 300px; */
}
.icon {
  color: #e51742;
}
.input-group-li {
  margin: 0 40px;
  background-color: #f5f5f5;
  padding: 7px 20px;
  border-radius: 16px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group-li input {
  background-color: transparent;
  border: none;
  outline: none;
}
.input-group-li .span {
  background-color: #f5f5f5;
  padding: 7px 20px;
  border-radius: 16px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.flex {
  margin: 0px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
svg {
  margin: 0 10px;
}
.circle-cart {
  background-color: #e51742;
  position: absolute;
  top: -4px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
input::placeholder {
  font-weight: 600;
}
.bottom-nav {
  background: #000336;
  width: 100%;
  padding: 0px 20px;
  color: #fff;
}
.home-page {
  background-color: #fff;
  padding: 0 20px;
  width: 90%;
  margin: 0 auto;
}
.slide {
  height: 900px;
  width: 90%;
  margin: 0 auto;
}
.cards-pro {
  width: 320px;
  height: 380px;
  margin: 12px 0;
  overflow: hidden;
  object-fit: cover;
  box-shadow: 0 0 10px 0 #fccfd9;
}
.side-cart {
  border-left: 2px solid #e51742;
  border-top: 2px solid #e51742;
  width: 0;
  padding: 0;
  height: 85%;
  overflow-x: hidden;
  transition: all 0.3s cubic-bezier(0, 0, 0.96, -0.48); /* css transition cb tool */
}
@media (max-width: 664px) and (min-width: 320px) {
  .slide {
    height: 750px;
    width: 100%;
    margin: 0 auto;
  }
  .nav-mobile {
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: between;
    padding: 0 8px;
  }
  .cards-pro {
    width: 95%;
    height: 380px;
    margin: 10px 0;
    overflow: hidden;
    object-fit: cover;
    box-shadow: 0 0 10px 0 #fccfd9;
  }
}
.reload-screen {
  position: absolute;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #e6e6e633;
  backdrop-filter: blur(30px);
  z-index: 999;
  animation: hide-reloade 5s forwards ease-out;
}
@keyframes hide-reloade {
  0% {
    opacity: 1;
    display: block;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
.reload-screen img {
  width: 90%;
  margin: auto;
  width: 20%;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 43%;
}
</style>
