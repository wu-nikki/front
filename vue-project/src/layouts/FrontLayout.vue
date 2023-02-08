<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="nav">
      <div class="row">
        <div class="logo">
          <img src="../assets/Logo.png" alt="" />
        </div>
        <div class="menu">
          <n-button id="bar" quaternary circle @click="activate('right')">
            <template #icon>
              <n-icon
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    fill="currentColor"
                  ></path>
                </svg>
              </n-icon>
            </template>
          </n-button>
          <n-menu v-if="active" mode="horizontal" :options="menuOptions" />

          <n-button
            class="btnLogin"
            quaternary
            circle
            v-if="isLogin"
            @click="logout"
          >
            <template #icon>
              <n-icon><LogInOutline /></n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </div>
    <div class="main"><router-view></router-view></div
  ></n-config-provider>
</template>

<style lang="scss">
* {
  --n-bezier: "";
}
html {
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid rgb(255, 227, 218);
  }
}
.nav {
  width: 90vw;
  height: 60px;
  margin: auto;
  line-height: 60px;
  .row {
    display: flex;
    height: 60px;
  }
  .logo {
    display: flex;
    width: 15vw;
    align-items: center;
    img {
      width: 50px;
    }
  }

  .menu {
    display: flex;
    align-items: flex-end;
    #bar {
      visibility: hidden;
    }
    .n-menu {
      display: flex;
      width: 70vw;
      justify-content: space-between;
      font-size: calc(0.6rem + 0.4vw);
      flex-grow: 1;
      font-weight: bolder;
      transition: none !important;
    }

    .n-menu-item {
      --n-item-text-color: #fd784eff;
      width: 100%;
      text-align: center;
    }
    .n-menu-item-content {
      padding: 0;
      border-bottom: 0px;
      height: 85%;
    }
    .n-menu-item-content-header a {
      padding: calc(0.2rem + 1.3vw);
    }
    .n-menu--horizontal {
      display: flex;
    }
    .n-button {
      margin-left: calc(0.4vw + 10px);
      width: 2.5rem;
      height: 2.5rem;
      // display: inline-flex;
      // align-items: flex-start;
      margin-bottom: 7px;
      .n-button__icon {
        font-size: 1.8rem;
      }
    }

    // n-button n-button--default-type n-button--medium-type btnLogin
  }
}

@media (max-width: 768px) {
  .nav {
    width: 100vw !important;
    .row {
      justify-content: space-between;
      .logo {
        width: 10vw;
        img {
          width: 50px;
          padding: 5px 0 0 50px;
        }
      }
      .menu {
        display: flex;
        flex-direction: column;
        align-items: end;
        height: 100vh;

        #bar {
          width: 3rem;
          height: 3rem;
          visibility: visible;
          margin: 6px 13px 6px 0;
          background: #fff;
          .n-button__icon {
            font-size: 1.5rem;
          }
        }
        #bar:hover {
          background: rgba(253, 120, 78, 0.1);
        }
        // #bar:active,
        // #bar:visited {
        //   background: #fff;
        // }

        .n-menu {
          z-index: 2;
          width: 120px !important;
          background-color: rgba(255, 227, 218, 1);
          display: flex;
          height: 35vh;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          font-size: calc(0.4rem + 1.1vw);

          .n-menu-item {
            width: 100%;
            text-align: center;
          }
        }
        .btnLogin {
          z-index: 3;
          // color: rgb(16, 28, 39);
          background: rgba(255, 227, 218, 0.2);
          &:hover {
            background: #fff;
          }
        }
      }
    }
  }
}

// @media (max-width: 545px) {
//   .menu {
//     .n-menu {
//       font-size: calc(2rem + 0.8vw );
//     }
//   }
// }
</style>

<script setup>

import { LogInOutline } from "@vicons/ionicons5";
import { h, ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
// import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
const user = useUserStore();

const active = ref(true);
const activate = () => {
  active.value = !active.value;
};
window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    active.value = true;
  }
});
const { isLogin } = storeToRefs(user);
const { logout } = user;

const menuOptions = computed(() => {
  return [
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
            to: "/friendlyInformation",
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
            to: "/aboutMe",
          },
          { default: () => "關於我們" }
        ),
      key: "AboutMeView",
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/animals",
          },
          { default: () => "認養毛孩" }
        ),
      key: "animalsView",
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/shelters",
          },
          { default: () => "收容所" }
        ),
      key: "sheltersView",
    },
    
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/member",
          },
          {
            default: () =>
              user.token?.length > 0 ? "會員資料" : "登入 | 註冊",
          }
        ),
      key: "memberLoginView",
    },{
      label: () =>
        h(
          RouterLink,
          {
            to: "/admin",
          },
          {
            default: () => "管理設定",
          }
        ),
      key: "AdminLayout",
      show: user.role == "1",
    },
  ];
});
/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  Menu: {
    itemTextColorActive: "#FD784EFF",
    itemTextColorActiveHover: "#FD784EFF",
    itemTextColorChildActive: "#FD784EFF",
    itemTextColorChildActiveHover: "#FD784EFF",
    itemTextColorHoverHorizontal: "#FD784EFF",
    itemTextColorActiveHorizontal: "#FD784EFF",
    itemTextColorActiveHoverHorizontal: "#FD784EFF",
    itemTextColorChildActiveHorizontal: "#FD784EFF",
    itemTextColorChildActiveHoverHorizontal: "#FD784EFF",
    // itemTextColorHover: "rgb(54 242 74)",
  },
  Tabs: {
    tabTextColorActiveBar: "#FD784EFF",
    tabTextColorHoverBar: "#FD784EFF",
    tabTextColorActiveCard: "#FD784EFF",
    barColor: "#FD784EFF",
    tabTextColorHoverLine: "#FD784EFF",
    tabTextColorActiveLine: "#FD784EFF",
  },
  Button: {
    colorPrimary: "#FD784EFF",

    textColor: "#FD784EFF",
    colorQuaternaryHover: "rgba(253, 120, 78, 0.1)",
    colorQuaternaryPressed: "rgba(253, 120, 78, 0.08)",
    colorQuaternary: "#fff",
  },
  Scrollbar: {
    color: "rgba(253, 120, 78, 0.2)",
    colorHover: "rgba(253, 120, 78, 0.6)",
  },
};
</script>

<script></script>

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
