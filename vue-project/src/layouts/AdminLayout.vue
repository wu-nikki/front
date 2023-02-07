<template>
  <!--  -->
  <div class="admin">
    <n-config-provider :theme-overrides="themeOverrides">
      <n-layout>
        <n-layout has-sider>
          <div class="left">
            <n-layout-sider bordered>
              <n-space>
                <n-avatar
                  round
                  :src="
                    user.userImg
                      ? user.userImg
                      : `https://source.boringavatars.com/beam/512/${user.account}?colors=#FFF7C6,#FFC6A5,#E6324B,#093D64,#FEFF00`
                  "
                />
              </n-space>
              <n-h2>{{ user.name }}</n-h2>
            </n-layout-sider>
          </div>

          <div class="right">
            <n-layout>
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
              <router-view></router-view>
            </n-layout>
          </div>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
* {
  --n-bezier: "";
}
.admin {
  .n-config-provider {
    height: calc(100vh - 60px);
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
