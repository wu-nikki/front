<template>
  <!--  -->
  <div class="admin">


  </div>
</template>

<style lang="scss">
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
