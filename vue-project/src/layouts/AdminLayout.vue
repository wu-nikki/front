<template>
  <!--  -->
  <div class="admin">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="nav">
        <!--  class="btnLogin"  v-if="isLogin"
          @click="logout" -->
        <n-button class="btn" quaternary circle @click="home">
          <template #icon>
            <n-icon><LogInOutline /></n-icon>
          </template>
        </n-button>

        <div class="title">後臺管理</div>
      </div>
      <!--  -->
      <div class="admin-content">
        <n-layout style="height: calc(100vh - 60px)">
          <n-layout has-sider position="absolute">
            <n-layout-sider bordered>
              <n-space class="admin-left">
                <n-avatar
                  round
                  :src="
                    user.userImg
                      ? user.userImg
                      : `https://source.boringavatars.com/beam/512/${user.account}?colors=#FFF7C6,#FFC6A5,#E6324B,#093D64,#FEFF00`
                  "
                />

                <n-h2>{{ user.name }}</n-h2>
              </n-space>
              <n-divider />

              <div class="btn" v-if="btnActive">
                <n-menu :options="options" />
                <!--           @select="handleSelect" -->
                <!--           :default-expanded-keys="defaultExpandedKeys" -->
                <!-- v-model:value="activeKey" -->
              </div>

              <!-- <n-dropdown :options="options" v-if="active">
                <n-button quaternary round>功能列</n-button>
              </n-dropdown> -->
            </n-layout-sider>

            <n-layout :native-scrollbar="false">
              <router-view></router-view>
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
    display: flex;
    align-items: center;
    width: 100%;
    background: #ffe3da;
    .title {
      margin-right: 20px;
      margin-left: 10px;
      font-size: calc(1.3rem + 0.5vw);
    }
    .btn {
      margin-left: 20px;
      width: 2.5rem;
      height: 2.5rem;
      transform: scaleX(-1);
      .n-button__icon {
        font-size: 1.8rem;
      }
    }
  }
  .admin-content {
    .n-layout-sider {
      text-align: center;
      max-width: 25% !important;
      display: flex;
      justify-content: center;
      transition: none;
    }
    .admin-left {
      padding-top: 10px;
      justify-content: center !important;
      align-items: center;
    }
    .n-layout-sider-scroll-container {
      min-width: 25% !important;
    }
    .n-avatar {
      width: 60px;
      height: 60px;
      border: 0.4vw solid #fff;
    }

    .n-h2 {
      font-size: calc(22px + 0.3vw);
      margin: 0 0 0 10px;
    }

    // 分隔線
    .n-divider {
      width: 100%;
      margin-top: 12px;
      margin-bottom: 0px;
    }

    // 選單
    .n-menu {
      display: flex;
      flex-direction: column;
      font-size: calc(15px + 0.2vw);

      .n-submenu {
        margin: 5px;
        font-size: 18px;
      }

      .n-menu-item-group-title {
        height: 0px;
        margin: 0px;
        transition: none;
      }
      .n-menu-item {
        border-radius: 30px;
        width: 100%;
      }

      .n-menu-item-content {
        padding-left: 0px !important;
        transition: none;
      }
      .n-menu-item-content::before {
        left: 0px;
        right: 0px;
      }
      .n-menu-item-content a {
        font-size: 16px;
      }

      .n-menu-item-content-header {
        &:hover,
        &:active {
          font-weight: bolder;
        }
      }
      // .n-menu-item-content:hover {
      //   color: #000;
      // }
      // --n-item-text-color-child-active-hover
      // .n-menu-item :hover,
      // .n-menu-item-content--selected {
      //   background-color: white;
      //   border-radius: 30px;
      //   font-weight: bolder;
      // }
      // .n-menu-item-content--selected {
      //   background-color: white;
      //   border-radius: 30px;
      //   font-weight: bolder;
      // }

      // --n-item-icon-color-hover-horizontal: #dc3741 !important;
    }

    .n-scrollbar {
      min-width: 25% !important;
      .n-scrollbar-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .n-dropdown {
      visibility: hidden;
    }
  }
}

//  #ffe3da  rgba(255, 241, 236, 1)
// .n-layout-sider:deep(.child-class) {
//     background-color: #000
// }

@media (max-width: 768px) {
  .admin .admin-content {
    .n-layout-sider {
      padding-top: 0px;
      max-width: 100vw !important;
      width: 100vw !important;

      .n-scrollbar-content {
        display: flex;
        flex-direction: row !important;
        justify-content: space-around !important;
        height: 40px;
        .n-space div {
          display: flex;
          align-items: center;
        }
      }

      .n-avatar {
        width: 40px !important;
        height: 40px !important;
      }

      .n-h2 {
        font-size: calc(22px + 0.1vw);
      }

      .n-scrollbar {
        min-width: 100vw !important;
      }

      .n-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-size: calc(15px + 0.1vw);

        .n-menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .n-menu-item-content {
          padding: 0;
          height: none;
        }
      }
    }
    .n-layout-scroll-container {
      display: flex !important;
      // flex-flow: column;
      width: 100% !important;
      flex-direction: column !important;
      flex-wrap: nowrap;
    }
  }
}

@media (max-width: 545px) {
  // .admin {
  //   .admin-content {

  //   }
  // }
}
</style>

<script setup>
import { LogInOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
// import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const user = useUserStore();
const router = useRouter();

const home = () => router.push("/");
const btnActive = ref(true);

const options = computed(() => {
  return [
    {
      label: "頁面管理",
      key: "頁面管理",
      children: [
        {
          type: "group",
          children: [
            {
              key: "divider-1",
              type: "divider",
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: "/admin/Carousel",
                  },
                  { default: () => "首頁輪播" }
                ),
              key: "admin/CarouselView",
            },
            {
              key: "divider-1",
              type: "divider",
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: "/admin/FriendlyInformation",
                  },
                  { default: () => "友善資訊" }
                ),
              key: "admin/FriendlyInformation",
            },
            {
              key: "divider-1",
              type: "divider",
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: "/admin/AboutMe",
                  },
                  { default: () => "關於我們" }
                ),
              key: "admin/AboutMeView",
            },
          ],
        },
      ],
    },
    {
      key: "divider-1",
      type: "divider",
    },
    //
    {
      label: "會員管理",
      key: "會員管理",

      children: [
        {
          type: "group",
          children: [
            {
              key: "divider-1",
              type: "divider",
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: "/admin/Members",
                  },
                  { default: () => "會員清單" }
                ),
              key: "admin/Members",
            },
          ],
        },
      ],
    },
    {
      key: "divider-1",
      type: "divider",
    },
    //
    {
      label: "預約管理",
      key: "預約管理",
      children: [
        {
          type: "group",

          children: [
            {
              key: "divider-1",
              type: "divider",
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: "/admin/Reserve",
                  },
                  { default: () => "預約清單" }
                ),
              key: "admin/Reserve",
            },
          ],
        },
      ],
    },
  ];
});

const themeOverrides = {
  Menu: {
    itemTextColorHover: "#FD784EFF",
    itemTextColorActive: "#FD784EFF",
    itemTextColorChildActive: "#FD784EFF",
    itemTextColorChildActiveHover: "#FD784EFF",

    itemTextColorActiveHover: "#FD784EFF",

    itemColorActive: "rgb(255, 255, 255)",
    itemColorActiveHover: "rgb(243, 243, 245)",
    itemColorVisited: "rgb(255, 255, 255)",
  },
  Button: {
    textColor: "#FD784EFF",
    colorQuaternaryHover: "rgba(255, 255, 255, 0.8)",
    colorQuaternaryPressed: "rgba(255, 255, 255, 0.8)",
    colorQuaternary: "#ffe3da",
  },
};
</script>
