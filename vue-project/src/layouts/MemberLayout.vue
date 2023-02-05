<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout style="height: calc(100vh - 60px)">
      <n-layout position="absolute" has-sider>
        <n-layout-sider
          v-if="route.path != '/member'"
          :native-scrollbar="false"
          bordered
        >
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

        <n-layout :native-scrollbar="false"
          ><n-h2>平山道</n-h2>
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
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style lang="scss">
// .n-layout-sider:deep(.child-class) {
//     background-color: #000
// }

.n-layout-sider {
  padding-top: 50px;
  text-align: center;
  max-width: 25% !important;
  display: flex;
  justify-content: center;
  .n-scrollbar {
    min-width: 25% !important;
    .n-scrollbar-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .n-avatar {
    width: 13vw;
    height: 13vw;
  }
}

@media (max-width: 768px) {
  .n-layout-scroll-container {
    display: flex;
    flex-flow: column;
    width: 100%;
    flex-direction: column;
    flex-wrap: nowrap;

    .n-scrollbar-content {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
<script setup>
// import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
const route = useRoute();

const user = useUserStore();

// defineProps({
//   userImg: {
//     type: String,
//   },
//   // 名稱
//   name: {
//     type: String,
//     default: "",
//   },
// });
</script>
