<template>
  <!-- 
// {
//   "_id": {
//     "$oid": "63d9172425a8467587909e3f"
//   },
//   "img": "https://www.pet.gov.tw/upload/pic/1675160685885.png",
//   "size": "中型",
//   "color": "黑黃色",
//   "variety": "米克斯",
//   "gender": "母",
//   "kind": "貓",
//   "opendate": "2023-01-18",
//   "sterilization": "已絕育",
//   "age": "成年",
//   "subid": "111112602",
//   "status": "開放認養",
//   "shelterName": {
//     "$oid": "63d9170ba38a09fc8c1ad9be"
//   },
//   "remark": "---"
// } -->
  <n-card>
    <template #header-extra
      ><n-button
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
    </template>
    <template #cover>
      <img :src="img" />
    </template>
    <n-h2> <router-link :to="'/animals/' + _id" />{{ size }} </n-h2>

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
const { isLogin } = storeToRefs(user);
const { logout } = user;
console.log(user) 
defineProps({
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
