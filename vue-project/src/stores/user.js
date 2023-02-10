import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api, apiAuth } from "@/plugins/axios";
import Swal from "sweetalert2";
import router from "@/plugins/router";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const name = ref("");
    const account = ref("");
    const list = ref(0);
    const dayList = ref(0);
    const role = ref(0);

    const isLogin = computed(() => {
      return token.value.length > 0;
    });

    const isAdmin = computed(() => {
      return role.value === 1;
    });

    // 可愛頭貼
    // https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51

    // const avatar = computed(() => {
    //   return `https://source.boringavatars.com/beam/512/${account.value}?colors=#FFF7C6,#FFC6A5,#E6324B,#093D64,#FEFF00`;
    // });

    const login = async (form) => {
      try {
        const { data } = await api.post("/users/login", form);
        // console.log(token.value);
        token.value = data.result.token;
        // console.log(token.value);
        name.value = data.result.name;
        // console.log(account.value);
        account.value = data.result.account;
        // console.log(account.value);

        list.value = data.result.list;
        dayList.value = data.result.dayList;
        role.value = data.result.role;

        Swal.fire({
          icon: "success",
          title: "成功",
          text: "登入成功",
        });
        // router.push("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "發生錯誤",
        });
      }
    };

    // 登出
    const logout = async () => {
      try {
        await apiAuth.delete("/users/logout");
        token.value = "";
        name.value = "";
        account.value = "";
        list.value = 0;
        role.value = 0;
        dayList.value = 0;
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "成功",
          text: "登出成功",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "發生錯誤",
        });
      }
    };
    const getUser = async () => {
      if (token.value.length === 0) return;
      try {
        const { data } = await apiAuth.get("/users/me");
        name.value = data.result.name;
        account.value = data.result.account;
        list.value = data.result.list;
        dayList.value = data.result.dayList;
        role.value = data.result.role;
      } catch (error) {
        logout();
      }
    };

    // 購物車
    // const editCart = async ({ _id, quantity }) => {
    //   if (token.value.length === 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "失敗",
    //       text: "請先登入",
    //     });
    //     router.push("/login");
    //     return;
    //   }
    //   try {
    //     const { data } = await apiAuth.post("/users/cart", {
    //       p_id: _id,
    //       quantity,
    //     });
    //     cart.value = data.result;
    //     Swal.fire({
    //       icon: "success",
    //       title: "成功",
    //       text: "加入購物車成功",
    //     });
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "失敗",
    //       text: error?.response?.data?.message || "發生錯誤",
    //     });
    //   }
    // };
    // 結帳
    // const checkout = async () => {
    //   try {
    //     await apiAuth.post("/orders");
    //     cart.value = 0;
    //     Swal.fire({
    //       icon: "success",
    //       title: "成功",
    //       text: "結帳成功",
    //     });
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "失敗",
    //       text: error?.response?.data?.message || "發生錯誤",
    //     });
    //   }
    // };

    return {
      token,
      name,
      account,
      list,
      dayList,
      role,
      isAdmin,
      login,
      logout,
      getUser,
      isLogin,
    };
  },
  {
    persist: {
      key: "user",
    },
  }
);
