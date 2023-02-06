<template>
  <div class="member">
    <n-config-provider :theme-overrides="themeOverrides">
      <n-layout style="height: calc(100vh - 60px)">
        <n-layout position="absolute" has-sider>
          <n-layout-sider
            v-if="route.path != '/member'"
            :native-scrollbar="false"
            bordered
            class="content"
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
            <div class="btn" v-if="btnActive">
              <n-menu mode="horizontal" :options="options" />
              <!-- v-model:value="activeKey" -->
            </div>

            <n-dropdown :options="options" v-if="active">
              <n-button quaternary round>功能列</n-button>
            </n-dropdown>
          </n-layout-sider>

          <n-layout :native-scrollbar="false">
            <router-view></router-view>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
// .n-layout-sider:deep(.child-class) {
//     background-color: #000
// }

.n-layout-sider {
  background-color: #ffe3da;
  padding-top: 50px;
  text-align: center;
  max-width: 25% !important;
  display: flex;
  justify-content: center;
  .n-avatar {
    width: 12vw;
    height: 12vw;
  }

  .n-h2 {
    font-size: calc(22px + 0.3vw);
    // margin: 0 0 0 10px;
  }
  .n-menu {
    display: flex;
    flex-direction: column;
    font-size: calc(15px + 0.2vw);
    .n-menu-item {
      margin: 10px;
      border-radius: 30px;
    }
    .n-menu-item :hover,.n-menu-item-content--selected  {
      background-color: white;
      border-radius: 30px;
      font-weight: bolder;
    }
    // .n-menu-item-content--selected {
    //   background-color: white;
    //   border-radius: 30px;
    //   font-weight: bolder;
    // }
    .n-menu-item-content {
      transition: none;
    }
    .n-menu-item-content__icon,
    .n-menu-item-content__icon:active {
      width: 30px !important;
      height: 30px !important;
      font-size: 28px !important;
      margin-right: 8px !important;
    }
    .n-menu-item {
      &:nth-child(2) {
        .n-menu-item-content__icon {
          --n-item-icon-color-hover-horizontal: #dc3741 !important;
          --n-item-icon-color-active-hover-horizontal: #dc3741 !important;--n-item-icon-color-active-horizontal: #dc3741 !important;
     
        }
      }
    }
    // .n-menu-item-content__icon{
    //   .n-icon:nth-child(){
    //    ;
    //   }

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

@media (max-width: 768px) {
  .n-layout-sider {
    background-color: rgba(255, 227, 218, 0.5);
    padding-top: 0px;
    max-width: 100vw !important;
    width: 100vw !important;
    .n-avatar {
      margin: 0 10px 0 10px;
      width: 30px !important;
      height: 30px !important;
    }

    .n-h2 {
      font-size: calc(22px + 0.1vw);
      margin: 0 0 0 10px;
    }

    .n-scrollbar {
      min-width: 100vw !important;
    }
  }

  .n-layout-scroll-container {
    display: flex !important;
    // flex-flow: column;
    width: 100% !important;
    flex-direction: column !important;
    flex-wrap: nowrap;
    .content {
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
    }
  }
}

@media (max-width: 545px) {
  .n-layout-sider {
    .n-button {
      width: 120px;
      margin: 0 10px 0 10px;
      font-weight: bolder !important;
      font-size: 16px;
      background-color: rgba(255, 241, 236, 1);
    }
  }
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
const active = ref(true);
const btnActive = ref(true);

window.addEventListener("resize", () => {
  if (window.innerWidth > 546) {
    active.value = false;
    btnActive.value = true;
  } else if (window.innerWidth < 546) {
    active.value = true;
    btnActive.value = false;
  }
});
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
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/member/animals",
          },
          { default: () => "毛孩收藏" }
        ),
      key: "member/animals.vue",
      icon: renderIcon(HeartSharp),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/member/reservel",
          },
          { default: () => "預約清單" }
        ),
      key: "member/reservel.vue",
      icon: renderIcon(Notifications),
    },
  ];
});

const themeOverrides = {
  Menu: {
    borderRadius: "10px",
    itemTextColorHover: "rgb(54 242 74)",
    itemIconColor: "rgb(16, 28, 39)",
    itemIconColorHoverHorizontal: "rgb(58, 99, 138)",
    itemIconColorActiveHorizontal: "rgb(58, 99, 138)",
    
    itemIconColorActiveHoverHorizontal: "rgb(58, 99, 138)",

  },
  Button: {
    colorPrimary: "#000",

    textColor: "#000",
    colorQuaternaryHover: "rgba(255, 255, 255, 1)",
    colorQuaternaryPressed: "rgba(255, 255, 255, 1)",
    colorQuaternary: "#ffe3da",
  },
};
</script>
