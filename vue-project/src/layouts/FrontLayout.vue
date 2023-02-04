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
        </div>
      </div>
    </div>
    <div class="main"><router-view></router-view></div
  ></n-config-provider>
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
    width: 15vw;
    height: 60px;
    img {
      width: 60px;
    }
  }

  .menu {
    display: flex;
    #bar {
      visibility: hidden;
    }
    .n-menu {
      display: flex;
      width: 70vw;
      justify-content: space-between;
      font-size: calc(0.9rem + 0.1vw);
      flex-grow: 1;
      font-weight: bolder;
    }
    .n-menu--horizontal {
      align-items: flex-end;
    }
  }
}
@media (max-width: 768px) {
  .nav {
    width: 100vw;
    .row {
      justify-content: space-between;
      .logo {
        width: 10vw;
        img {
          width: 50px;
          padding: 5px 0 0 5px;
        }
      }
      .menu {
        z-index: 1;

        display: flex;
        flex-direction: column;
        align-items: end;
        height: 100vh;
        #bar {
          visibility: visible;
          margin-top: 14px;
          margin-right: 13px;
          margin-bottom: 14px;
        }
        .n-menu {
          width: 120px !important;
          background-color: rgba(255, 227, 218, 1);
          display: flex;
          height: 35vh;
          flex-direction: column;
          justify-content: flex-start;
          .n-menu-item-content-header {
            padding-top: 13px;
            padding-bottom: 13px;
          }
        }
      }
    }
  }
}
</style>

<script setup>
import { CashOutline } from "@vicons/ionicons5";
import { h, ref } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
const active = ref(true);
const activate = () => {
  active.value = !active.value;
};
window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    active.value = true;
  }
});

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
          to: "/memberLogin",
        },
        { default: () => "登入 | 註冊" }
      ),
    key: "memberLoginView",
  },
];

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
  CashOutline,
};

// let count = 0;
// const changeTab = () => {
//   count++;
//   if (count % 2 === 0) {
//     document.querySelector(".n-menu").style.display = "none";
//   } else {
//     document.querySelector(".n-menu").style.display = "inline-block";
//   }
//   console.log("btn clicked");
// };

// let bar = document
//   .querySelector(".n-button")
//   .addEventListener("click", function () {
// count++;
// if (count % 2 === 0) {
//   document.querySelector(".n-menu").style.display = "none";
// } else {
//   document.querySelector(".n-menu").style.display = "inline-block";
// }
//   });
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
