<template>

<!-- {
  "_id": {
    "$oid": "63e4a7c0fe0ff99c31c4fd15"
  },
  "img": "https://www.pet.gov.tw/upload/pic/1672990486661.png",
  "size": "小型",
  "color": "棕色",
  "variety": "米克斯",
  "gender": "母",
  "kind": "犬",
  "opendate": "2023-02-20",
  "sterilization": "已絕育",
  "age": "成年",
  "subid": "OAAAG1120106005",
  "status": "開放認養",
  "shelterName": {
    "$oid": "63e4a7a2825a7b0e31492c8d"
  },
  "remark": "---"
} -->

  <n-card>
    <template #header-extra>
      <!-- <n-button  quaternary circle>
        <template #icon>
          <n-icon><LogInOutline /></n-icon>
        </template>
      </n-button> -->
    </template>
    <router-link :to="'/animals/' + _id" />
  

    <template #cover>
      <img :src="img" />
      <!-- <img :src="img" /> -->
    </template>

    <template #footer> {{ size }} {{shelterName.place }}</template>
    
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
    required: [true, "https://i.imgur.com/yfhkJ0F.jpg"],
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
