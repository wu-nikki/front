<template>
  <!-- {
  "_id": {
    "$oid": "63e9e69c736c58bf6ca056d4"
  },
  "seq": "1",
  "img": "",
  "place": "臺北市動物之家",
  "cityName": "臺北市",
  "tel": "02-87913254 、02-87913255",
  "add": "臺北市內湖區潭美街852號",
  "openTime": "週二至週日，上午10:00~12:30，下午1:30~4:00",
  "lon": "121.608935",
  "lat": "25.063111"
}-->

  <n-card hoverable>

    <!-- <router-link :to="'/shelters/' + _id"> -->
      <template #cover>
        <img :src="img = 'https://i.imgur.com/yfhkJ0F.jpg'" />
        <!-- <img :src="img" /> -->
      </template>
    <!-- </router-link> -->
    <div class="contect">
      {{ place }}

    </div>
    <template #footer>

      電話: {{tel}}</template>
  </n-card>
</template>
<!-- <n-h2>{{ user.name }}</n-h2> -->

<style lang="scss">
#shelters-card {
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
  }
}
</style>

<script setup>
import { ref } from "vue";
import { apiAuth } from "@/plugins/axios";
// import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();



defineProps({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: String,
    required: true,
  },
  img: {
    type: String || '',
  },
  // 公告收容所
  place: {
    type: String,
    required: true,
  },
  //  縣市名稱
  cityName: {
    type: String,
    required: true,
  },
  // 收容所電話
  tel: {
    type: String,
    required: true,
  },
  // 收容所地址
  add: {
    type: String,
    required: true,
  }, 
  // 開放時間
  openTime: {
    type: String,
    required: true,
  },
  // 經度
  lon: {
    type: String,
    required: true,
  }, 
  // 緯度
  lat: {
    type: String,
    required: true,
  },
});


</script>
