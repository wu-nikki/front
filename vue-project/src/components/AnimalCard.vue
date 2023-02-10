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

  <n-card >
    <router-link :to="'/animals/' + _id" />
    <template #cover>
      <img :src="img" />
      <!-- <img :src="img" /> -->
    </template>
    <div class="contect">
      {{ size }}{{ color }}{{ variety }}{{ gender }}{{ kind }}
    </div>
    <template #footer> {{ shelterName.place }}</template>
    <template #action>
      <div class="heart">
        <n-button quaternary circle @click="activateHeart()">
          <template #icon>
            <n-icon v-if="HeartOutlineColor"><HeartOutline /></n-icon>
            <n-icon v-if="HeartColor"><Heart /></n-icon>
          </template>
        </n-button>
      </div>
      <n-button type="primary" ghost> Primary </n-button>
    </template>
  </n-card>
</template>
<!-- <n-h2>{{ user.name }}</n-h2> -->

<style lang="scss">
.n-card {
  text-align: center;
  border-radius: 10px;
  max-width: 350px;

  .heart {
    .n-button {
      margin-left: calc(0.1vw + 5px);
      width: 3rem;
      height: 3rem;
      font-weight: bolder !important;
      transition: none;
      --n-color-focus:white !important;
      .n-button__icon {
        color: #f00;
        font-size: 1.8rem;
        //  會變愛心黑
        // .n-icon-slot {
        //   .n-icon {
        //     &:nth-child(1) {
        //       color: #000;
        //     }
        //   }
        // }
      }
    }
  }
}
.contect {
  font-size: calc(1.1rem + 0.1vw);
  font-weight: bolder;
}
</style>

<script setup>
import { HeartOutline, Heart } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const user = useUserStore();

const HeartOutlineColor = ref(true);
const HeartColor = ref(false);
const activateHeart = () => {
  HeartOutlineColor.value = !HeartOutlineColor.value;
  HeartColor.value = !HeartColor.value;
  // console.log(HeartOutlineColor.value);
};
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
