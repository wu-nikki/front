<template>
  <img :src="animal.img" />
  {{ animal.color }}
  <div class="goHome">
    <n-button ghost @click="home()"> 回上頁 </n-button>
  </div>
</template>

<style lang="scss">
.goHome {
  .n-button {
    --n-text-color-hover: rgb(252, 170, 145) !important;
    --n-text-color-pressed: #fd784eff !important;
    --n-text-color-focus: rgb(0, 0, 0) !important;

    --n-ripple-color: rgb(139, 38, 4) !important;
    --n-border: 1px solid rgb(255, 227, 218) !important;
    --n-border-hover: 2px solid rgb(252, 170, 145) !important;
    --n-border-pressed: 2px solid #fd784eff !important;
    --n-border-focus: 1px solid rgb(255, 227, 218) !important;
  }
}
</style>

<script setup>
import { reactive, ref } from "vue";
import { api } from "@/plugins/axios";
import { useRoute, useRouter } from "vue-router";

import { Swal } from "sweetalert2";
import { useUserStore } from "@/stores/user";
// Router是跳頁 ，Route是取現在路由資訊用
const route = useRoute();
const router = useRouter();

const user = useUserStore();

const animal = reactive({
  _id: "",
  img: "",
  size: "",
  color: "",
  variety: "",
  gender: "",
  kind: "",
  shelterName: {},
});

const home = () => {
  router.go(-1);
};

(async () => {
  try {
    const { data } = await api.get("/animals/" + route.params.id);

    animal._id = data.result._id;
    animal.img = data.result.img;
    animal.size = data.result.size;
    animal.color = data.result.color;
    animal.variety = data.result.variety;
    animal.gender = data.result.gender;
    animal.kind = data.result.kind;
    animal.shelterName = data.result.shelterName;

    // document.title = '購物網 | ' + product.name
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: "進入詳細介紹失敗",
    });
    router.go(-1);
  }
})();
</script>
