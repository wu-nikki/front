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

  <n-card hoverable>
    <!-- <router-link :to="'/animals/' + _id" /> -->
    <template #cover>
      <img :src="img == '' ? 'https://i.imgur.com/yfhkJ0F.jpg' : img" />
      <!-- <img :src="img" /> -->
    </template>
    <div class="contect">
      {{ size }}{{ color }}{{ variety }}{{ gender }}{{ kind }}
    </div>
    <template #footer> 我在:{{ shelterName.place }}</template>
    <template #action>
      <div class="heart">
        <n-button quaternary circle @click="activateHeart(_id)">
          <template #icon>
            <n-icon v-if="HeartOutlineColor"><HeartOutline /></n-icon>
            <n-icon v-if="HeartColor"><Heart /></n-icon>
          </template>
        </n-button>
      </div>
      <router-link :to="'/animals/' + _id">
        <n-button class="animal" ghost> 詳細介紹 </n-button></router-link
      >
    </template>
  </n-card>
</template>
<!-- <n-h2>{{ user.name }}</n-h2> -->

<style lang="scss">
#animal-card {
  .n-card {
    --n-border-color: rgb(227, 227, 228) !important;
    text-align: center;
    border-radius: 10px;
    max-width: 350px;
    max-height: 500px;
    .n-card-cover {
      height: 100%;
      width: 100%;
    }
    img {
      object-fit: cover;

      // max-height: 400px;
    }
    .n-card__content {
      font-size: calc(1.3rem + 0.1vw);
      font-weight: bolder;
      padding: 15px 0 10px 0;
    }
    .n-card__footer {
      font-size: calc(0.9rem + 0.1vw);

      padding: 5px 0 10px 0;
    }

    .n-card__action {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 0 15px 0;

      .animal {
        --n-text-color-hover: rgb(252, 170, 145) !important;
        --n-text-color-pressed: #fd784eff !important;
        --n-text-color-focus: rgb(0, 0, 0) !important;

        --n-ripple-color: rgb(139, 38, 4) !important;
        --n-border: 1px solid rgb(255, 227, 218) !important;
        --n-border-hover: 2px solid rgb(252, 170, 145) !important;
        --n-border-pressed: 2px solid #fd784eff !important;
        --n-border-focus: 1px solid rgb(255, 227, 218) !important;

        //       colorPrimary: "#FD784EFF",
        // rgb(255, 227, 218)
        // textColor: "#FD784EFF",
        // colorQuaternaryHover: "rgba(253, 120, 78, 0.1)",
        // colorQuaternaryPressed: "rgba(253, 120, 78, 0.08)",
        // colorQuaternary: "#fff",
      }
    }
    a {
      text-decoration: none;
    }
    .heart {
      .n-button {
        margin-left: calc(0.1vw + 5px);
        width: 3rem;
        height: 3rem;
        font-weight: bolder !important;
        transition: none;
        --n-color-focus: white !important;

        .n-button__icon {
          color: #f00;
          font-size: 2rem;
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
}
</style>

<script setup>
import { HeartOutline, Heart } from "@vicons/ionicons5";
import { ref } from "vue";
import { apiAuth } from "@/plugins/axios";
// import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

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
    type: Object,
    required: true,
  },
});
const user = useUserStore();
const router = useRouter();
const HeartOutlineColor = ref(true);
const HeartColor = ref(false);

const activateHeart = async (animalID) => {
  try {
    if (HeartColor.value) {
      await apiAuth.delete("/users/likeAnimalsList/" + animalID);
    } else if (HeartOutlineColor.value) {
      await apiAuth.post("/users/likeAnimalsList/" + animalID);
    }
    HeartOutlineColor.value = !HeartOutlineColor.value;
    HeartColor.value = !HeartColor.value;
  } catch (error) {
  } finally {
  }

  // console.log(HeartOutlineColor.value);
};


</script>
