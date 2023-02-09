<template>
  <!-- {
  "_id": {
    "$oid": "63e44cd94c1fe16e40929875"
  },
  "img": "https://www.pet.gov.tw/upload/pic/1675851170399.png",
  "size": "中型",
  "color": "黃虎斑色",
  "variety": "米克斯",
  "gender": "母",
  "kind": "貓",
  "opendate": "2023-02-15",
  "sterilization": "已絕育",
  "age": "成年",
  "subid": "112020701",
  "status": "開放認養",
  "shelterName": {
    "$oid": "63d9170ba38a09fc8c1ad9be"
  },
  "remark": "右剪耳，112215 開放認養"
} -->
  <n-card>
    <template #header-extra
      >
      <!-- <n-button class="btnLogin" quaternary circle> -->
        <!-- v-if="isLogin" -->
        <!-- @click="logout" -->
        <!-- <template #icon>
          <n-icon><LogInOutline /></n-icon>
        </template>
      </n-button> -->

    </template>

<template #title>
  size
</template>
    
    <template #cover>
      <img src="https://www.pet.gov.tw/upload/pic/1675851170399.png">
      <!-- <img :src="img" /> -->
    </template>
    <!-- <n-h2> <router-link :to="'/animals/' + _id" />{{ size }} </n-h2> -->

    <template #footer> #footer </template>
  </n-card>
</template>
<!-- <n-h2>{{ user.name }}</n-h2> -->

<style lang="scss">
.n-card {
  max-width: 300px;
}
</style>

<script setup>
import { LogInOutline } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
// const { isLogin } = storeToRefs(user);
// const { logout } = user;

defineProps({
  _id: {
      type: String,
      default: ''
    },
  img: {
    type: String,
    required: true,
  },
  // 體型
  size: {
    type: String,
    required: true,
  },
  // 毛色
  color: {
    type: String,
    required: true,
  },
  // 動物品種
  variety: {
    type: String,
    required: true,
  },
  // 動物性別
  gender: {
    type: String,
    required: true,
  }, // 動物類別
  kind: {
    type: String,
    required: true,
  },
  // 公告收容所
  shelterName: {
    type: String,
    required: true,
  },
});
</script>
