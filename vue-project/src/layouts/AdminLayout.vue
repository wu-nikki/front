<template>
  <!--  -->
  <div class="admin">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="nav">
        <div class="title">後臺管理</div>
      </div>
      <!--  -->
      <div class="admin-content">
        <n-layout style="height: calc(100vh - 60px)">
          <n-layout has-sider position="absolute">
            <n-layout-sider bordered class="admin-left">
              海淀桥
            </n-layout-sider>

            <n-layout :native-scrollbar="false">
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
              <n-h2>平山道</n-h2>
            </n-layout>
          </n-layout>
        </n-layout>
      </div>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
* {
  --n-bezier: "";
}
body {
  margin: 0;
  overflow: hidden;
}

.n-scrollbar-rail {
  --n-scrollbar-color: rgb(255, 227, 218);
  --n-scrollbar-color-hover: rgb(255, 149, 117);
  --n-scrollbar-width: 6px;
}

.admin {
  width: 100vw;
  height: 100vh;
  .nav {
    width: 100%;
    background: #ffe3da;
    .title {
      margin-left: 20px;
      font-size: calc(1.3rem + 0.5vw);
    }
  }
  .admin-content {
  }
}

//  #ffe3da  rgba(255, 241, 236, 1)
// .n-layout-sider:deep(.child-class) {
//     background-color: #000
// }

@media (max-width: 768px) {
}

@media (max-width: 545px) {
}
</style>

<script setup>
import {
  PersonCircleOutline,
  HeartSharp,
  Notifications,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
// import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
const user = useUserStore();
const route = useRoute();
// const active = ref(true);
// const btnActive = ref(true);

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 546) {
//     active.value = false;
//     btnActive.value = true;
//   } else if (window.innerWidth < 546) {
//     active.value = true;
//     btnActive.value = false;
//   }
// });
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const options = computed(() => {
  return [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/member/me",
          },
          { default: () => "會員資料" }
        ),
      key: "member/member.vue",
      icon: renderIcon(PersonCircleOutline),
    },
  ];
});

const themeOverrides = {};
</script>
