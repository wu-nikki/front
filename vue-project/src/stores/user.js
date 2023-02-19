import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api, apiAuth } from "@/plugins/axios";
import Swal from "sweetalert2";
import router from "@/plugins/router";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const userImg = ref("");
    const name = ref("");
    const account = ref("");
    const email = ref("");
    const birthday = ref("");
    const cellPhone = ref("");

    const likeAnimalsList = ref(0);
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
        token.value = data.result.token;
        userImg.value = data.result.userImg;;
        name.value = data.result.name;
        account.value = data.result.account;
        email.value = data.result.email;
        birthday.value = data.result.birthday;
        cellPhone.value = data.result.cellPhone;

        // console.log(account.value);

        likeAnimalsList.value = data.result.likeAnimalsList;
        dayList.value = data.result.dayList;
        role.value = data.result.role;
        // console.log(data);
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
        likeAnimalsList.value = 0;
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
        // console.log(data.result);
        userImg.value = data.result.userImg;
        name.value = data.result.name;
        account.value = data.result.account;
        email.value = data.result.email;
        birthday.value = data.result.birthday;
        cellPhone.value = data.result.cellPhone;
        likeAnimalsList.value = data.result.likeAnimalsList;
        dayList.value = data.result.dayList;
        role.value = data.result.role;
      } catch (error) {
        logout();
      }
    };
    //  會員管理自己的資料
    const editUser = async () => {
      if (token.value.length === 0) return;
      try {
        const { data } = await apiAuth.get("/users/me");

        name.value = data.result.name;
        account.value = data.result.account;
        cellPhone.value = data.result.cellPhone;
        email.value = data.result.email;
        birthday.value = data.result.birthday;
      } catch (error) {
        logout();
      }
    };

    // 編輯會員們資料
    const editUsers = async () => {
      if (token.value.length === 0) return;
      try {
        const { data } = await apiAuth.get("/users/:id");

        name.value = data.result.name;
        account.value = data.result.account;
        cellPhone.value = data.result.cellPhone;
        email.value = data.result.email;
        birthday.value = data.result.birthday;
      } catch (error) {
        logout();
      }
    };

    //加入至毛孩收藏
    const addLikeAnimalsList = async ({ _id }) => {
      if (token.value.length === 0) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: "請先登入",
        });
        router.push("/login");
        return;
      }
      try {
        const { data } = await apiAuth.post("/users/likeAnimalsList", {
          _id,
        });
        likeAnimalsList.value = data.result.likeAnimalsList;
        Swal.fire({
          icon: "success",
          title: "成功",
          text: "加入至毛孩收藏",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "加入至毛孩收藏錯誤",
        });
      }
    };

    //從毛孩收藏移除
    const deleteLikeAnimalsList = async ({ _id }) => {
      if (token.value.length === 0) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: "請先登入",
        });
        router.push("/login");
        return;
      }
      try {
        const { data } = await apiAuth.delete("/users/likeAnimalsList", {
          _id,
        });
        likeAnimalsList.value = data.result.likeAnimalsList;
        Swal.fire({
          icon: "success",
          title: "從毛孩收藏移除",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "發生錯誤",
        });
      }
    };
    // 取毛孩收藏id
    const getLikeAnimalsListById = async () => {
      if (token.value.length === 0) return;
      try {
        const { data } = await apiAuth.get("/users/likeAnimalsList");
        // console.log(data.result);
        likeAnimalsList.value = data.result.likeAnimalsList;
        Swal.fire({
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "取毛孩收藏id錯誤",
        });
      }
    };

    // 取毛孩收藏
    const getLikeAnimalsList = async () => {
      if (token.value.length === 0) return;
      try {
        const { data } = await apiAuth.get("/users/likeAnimalsList");
        // console.log(data.result);
        likeAnimalsList.value = data.result.likeAnimalsList;
        Swal.fire({
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "取毛孩收藏id錯誤",
        });
      }
    };

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
      userImg,
      email,
      birthday,
      cellPhone,
      name,
      account,
      likeAnimalsList,
      dayList,
      role,
      isAdmin,
      login,
      logout,
      getUser,
      getLikeAnimalsListById,
      getLikeAnimalsList,
      addLikeAnimalsList,
      deleteLikeAnimalsList,

      isLogin,
      editUser,
      editUsers,
    };
  },
  {
    persist: {
      key: "token",
    },
  }
);
