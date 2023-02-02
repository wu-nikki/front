<template>
  <div class="nav">
    <div class="row">
      <div class="logo">
        <img src="../assets/Logo.png" alt="" />
      </div>

      <div class="menu">
        <n-menu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
        />
      </div>
    </div>
  </div>
  <div class="main"><router-view></router-view></div>
</template>

<style lang="scss">
.nav {
  width: 90vw;
  height: 60px;
  margin: auto;
  line-height: 60px;
  .row {
    display: flex;
  }
  .logo {
    width: 25vw;
    height: 60px;
    img {
      width: 60px;
    }
  }
  .menu {
    width: 65vw;
    .n-menu {
    }
  }
}
</style>

<script setup>
import FriendlyInformation from "../views/front/FriendlyInformation.vue";

import { h, ref } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/",
        },
        { default: () => "首頁" }
      ),
    key: "home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/FriendlyInformation",
        },
        { default: () => "友善資訊" }
      ),
    key: "FriendlyInformation",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/AboutMe",
        },
        { default: () => "關於我們" }
      ),
    key: "AboutMe",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/Animal",
        },
        { default: () => "認養毛孩" }
      ),
    key: "Animal",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/Reserve",
        },
        { default: () => "預約" }
      ),
    key: "Reserve",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/LoginView",
        },
        { default: () => "登入" }
      ),
    key: "LoginView",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/RegisterView",
        },
        { default: () => "註冊" }
      ),
    key: "RegisterView",
  },
];
</script>

<!-- ,
  {
    label: () =>
      h(
        "a",
        {
          href: "/",
          rel: "noopenner noreferrer",
        },
        "home"
      ),
    key: "home",
  } -->

<!-- 
<n-tabs
        default-value="首頁"
        justify-content="space-evenly"
        :size="small"
        type="line"
      >
        <n-tab-pane name="首頁" tab="首頁"> <HomeView></HomeView></n-tab-pane>
        <n-tab-pane name="友善資訊" tab="友善資訊">
          <FriendlyInformation></FriendlyInformation>
        </n-tab-pane>
        <n-tab-pane name="關於我們" tab="關於我們"></n-tab-pane>
        <n-tab-pane name="認養毛孩" tab="認養毛孩"></n-tab-pane>
        <n-tab-pane name="預約" tab="預約"></n-tab-pane>
        <n-tab-pane name="登入" tab="登入"></n-tab-pane>
        <n-tab-pane name="註冊" tab="註冊"></n-tab-pane>
      </n-tabs> -->
