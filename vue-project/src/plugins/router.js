import { createRouter, createWebHashHistory } from "vue-router";
import FrontLayout from "@/layouts/FrontLayout.vue";
import FrontHomeView from "@/views/front/HomeView.vue";

import MemberLayout from "@/layouts/MemberLayout.vue";
import MemberLogin from "@/views/front/member/loginView.vue";

import AdminLayout from "@/layouts/AdminLayout.vue";

import NotFoundView from "@/views/NotFoundView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: "/",
      component: FrontLayout,
      children: [
        {
          path: "",
          name: "home",
          component: FrontHomeView,
          meta: {
            title: "首頁",
            login: false,
            admin: false,
          },
        },
        {
          path: "friendlyInformation",
          name: "friendlyInformation",
          component: () => import("@/views/front/FriendlyInformation.vue"),
          meta: {
            title: "友善資訊",
            login: false,
            admin: false,
          },
        },
        {
          path: "aboutMe",
          name: "aboutMe",
          component: () => import("@/views/front/AboutMeView.vue"),
          meta: {
            title: "關於我們",
            login: false,
            admin: false,
          },
        },
        {
          path: "animals",
          name: "animals",
          component: () => import("@/views/front/animalsView.vue"),
          meta: {
            title: "認養毛孩",
            login: false,
            admin: false,
          },
        },
        {
          path: "animals/:id",
          name: "animal",
          component: () => import("@/views/front/animal.vue"),
          meta: {
            title: "個別毛孩頁面",
            login: false,
            admin: false,
          },
        },
        {
          path: "shelters",
          name: "shelters",
          component: () => import("@/views/front/sheltersView.vue"),
          meta: {
            title: "所有收容所",
            login: false,
            admin: false,
          },
        },
        {
          path: "chooseShelter",
          name: "chooseShelter",
          component: () => import("@/views/front/chooseShelter.vue"),
          meta: {
            title: "個別收容所",
            login: false,
            admin: false,
          },
        },
        {
          path: "reserveDay",
          name: "reserveDay",
          component: () => import("@/views/front/reserveDay.vue"),
          meta: {
            title: "預約日期",
            login: true,
            admin: false,
          },
        },
        {
          path: "member",
          component: MemberLayout,
          children: [
            {
              path: "",
              name: "memberLogin",
              component: MemberLogin,
              meta: {
                title: "登入|註冊",
                login: false,
                admin: false,
              },
            },
            {
              path: "me",
              name: "member",
              component: () => import("@/views/front/member/member.vue"),
              meta: {
                title: "會員資料頁面",
                login: true,
                admin: false,
              },
            },
            {
              path: "animals",
              name: "memberAnimals",
              component: () => import("@/views/front/member/animals.vue"),
              meta: {
                title: "會員毛孩收藏",
                login: true,
                admin: false,
              },
            },
            {
              path: "reservel",
              name: "memberReservel",
              component: () => import("@/views/front/member/reservel.vue"),
              meta: {
                title: "預約清單",
                login: true,
                admin: false,
              },
            },
          ],
        },

        // 後台管理
        {
          path: "admin",
          component: AdminLayout,
          children: [
            {
              path: "FriendlyInformation",
              name: "admin-FriendlyInformation",
              component: () => import("@/views/admin/FriendlyInformation.vue"),
              meta: {
                title: "頁面管理-友善資訊",
                login: true,
                admin: true,
              },
            },
            {
              path: "AboutMeView",
              name: "admin-AboutMeView",
              component: () => import("@/views/admin/AboutMeView.vue"),
              meta: {
                title: "頁面管理-關於我們",
                login: true,
                admin: true,
              },
            },
            {
              path: "Members",
              name: "admin-Members",
              component: () => import("@/views/admin/Members.vue"),
              meta: {
                title: "會員管理",
                login: true,
                admin: true,
              },
            },  {
              path: "Reserve",
              name: "admin-Reserve",
              component: () => import("@/views/admin/Reserve.vue"),
              meta: {
                title: "預約管理",
                login: true,
                admin: true,
              },
            },
            //     {
            //       path: "products",
            //       name: "admin-products",
            //       component: () => import("@/views/admin/ProductsView.vue"),
            //       meta: {
            //         title: "購物網 | 商品管理",
            //         login: true,
            //         admin: true,
            //       },
            //     },
            //     {
            //       path: "orders",
            //       name: "admin-orders",
            //       component: () => import("@/views/admin/OrdersView.vue"),
            //       meta: {
            //         title: "購物網 | 訂單管理",
            //         login: true,
            //         admin: true,
            //       },
            //     },
          ],
        },
      ],
    },

    //
    {
      path: "/404",
      name: "404",
      component: NotFoundView,
      meta: {
        title: "購物網|404",
        login: false,
        admin: false,
      },
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "all",
    //   redirect: "/404",
    // },
  ],
});

// router.afterEach((to, from) => {
//   document.title = to.meta.title;
// });
// // 阻擋亂入
router.beforeEach(async (to, from, next) => {
  // console.log('beforeEach')

  const user = useUserStore();
  // 登入後，如果又點了註冊或是登入 把他導到會員資料
  if (user.isLogin && to.path === "/member") {
    next("/member/me");
    // 如果去要登入的頁面 但他沒登入 ，把他導去登入頁
  } else if (to.meta.login && !user.isLogin) {
    next("/member");
    // 如果去要管理的頁面 ，要先判斷是不是管理員
  } else if (to.meta.admin && !user.isAdmin) {
    next("/");
  } else {
    next();
  }
});

export default router;
