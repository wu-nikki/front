<template>
  <div id="Shelter">
    <div class="shelterImgData">
      <n-layout position="absolute">
        <n-layout has-sider position="absolute" style="top: 64px">
          <n-layout-sider bordered :native-scrollbar="false">
            <n-carousel autoplay>
              <n-image
                class="carousel-img"
                v-for="i in imageCount"
                :key="i"
                :src="getImageUrl(i)"
              />
            </n-carousel>
          </n-layout-sider>
          <n-layout :native-scrollbar="false" class="shelter-Data">
            <div class="btns">
              <div class="goHome">
                <n-button ghost @click="home()"> 回上頁 </n-button>
              </div>
            </div>

            <!-- 大標 -->
            <!--  primary   info藍  warning黃 error紅 -->
            <div style="padding-left: 30px; position: relative">
              <div
                style="
                  position: absolute;
                  left: 0;
                  top: -10px;
                  bottom: 0;
                  width: 24px;
                "
              />
              <n-h1 prefix="bar" align-text type="error">
                <n-h1> {{ shelter.place }}</n-h1>
              </n-h1>
              <n-h3>
                <n-text> 所在縣市: </n-text>
                <span> {{ shelter.cityName }} </span></n-h3
              >
              <n-h3
                ><n-text>收容所電話:</n-text>
                <span> {{ shelter.tel }}</span>
              </n-h3>
              <n-h3
                ><n-text>收容所地址:</n-text>
                <p>{{ shelter.add }}</p>
              </n-h3>
              <n-h3
                ><n-text>收容所開放時間:</n-text>
                <p>{{ shelter.openTime }}</p>
              </n-h3>
              <!-- <n-h3
              ><n-text>所在收容所: </n-text>
              <span>{{  shelter.place }} </span></n-h3
            > -->
            </div>
          </n-layout>
        </n-layout>
      </n-layout>
    </div>
    <div id="map">
      <Map
        v-if="shelter.lat"
        :latitude="Number(shelter.lat)"
        :longitude="Number(shelter.lon)"
      />
      <!-- <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map> -->
    </div>
  </div>
</template>

<style lang="scss">
.main {
  overflow: hidden;
}
#Shelter {
  display: flex;
}
.shelterImgData {
  width: 50vw;
  height: 100vh;

  .n-layout {
    width: 50vw;
  }
  .n-layout-scroll-container {
    flex-flow: column !important;
  }
  // 圖片區
  .n-layout-sider {
    width: 100% !important;
    max-width: 100% !important;
    height: 45vh;
    max-height: 98% !important;

    // .n-scrollbar-content {
    //   // padding: 1vw 0.5vh;
    // }

    .n-layout-sider-scroll-container {
      display: flex;
    }
    .n-scrollbar-container {
      display: flex;
      align-items: center;
    }
    .n-carousel {
      text-align: center;
      .carousel-img {
        height: 42vh;
      }
      .n-image {
        justify-content: center;
        margin: auto;
        width: calc(500px - 2vw);
      }
    }
  }
  .shelter-Data {
    height: 52vh;
  }
  .n-scrollbar {
    min-width: 40% !important;
  }

  .n-layout-sider__border {
    --n-border-color: rgb(255, 255, 255);
  }
  .n-h1 {
    font-size: calc(1rem + 1.1vw);
    font-weight: bolder;
    margin-top: 10px;

    margin-bottom: 10px;
  }
  .n-text {
    font-size: calc(1rem + 0.5vw);

    font-weight: bolder;
  }
  .n-h3 {
    margin: 10px 0px 2px 0px;
  }
  span:nth-child(2) {
    font-size: calc(1rem + 0.2vw);
    margin-left: 1vw;
  }
  p {
    font-size: calc(1rem + 0.2vw);
    margin: 0px;
  }
  .n-scrollbar-content {
    padding: 0vw 1vw;
  }
}
#map {
  width: 50vw;
  height: 100vh;
position: relative;
}
.btns {
  z-index: 2;
  padding-right: 2vw;
  float: right;
  height: 43vh;
  display: flex;
  position: sticky;
  top: 20px;
  align-items: flex-end;
}
.heart {
  .n-button {
    width: 4rem;
    height: 4rem;
    font-weight: bolder !important;
    transition: none;
    --n-color-focus: white !important;

    .n-button__icon {
      color: #f00;
      font-size: 2.5rem;
    }
  }
}

.goHome {
  .n-button {
    background: #fff;
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

@media (max-width: 768px) {
  .shelterData {
    // .n-layout-scroll-container {
    //   flex-direction: column !important;
    // }

    .n-layout-sider {
      width: 100% !important;
      max-width: 100% !important;
      max-height: 250px;
    }
    .n-scrollbar {
      min-width: 100% !important;
    }
    .shelter-Data {
      .n-scrollbar-content {
        padding: 2vw 10vw;
      }
    }
    .n-image {
      img {
        width: calc(300px + 12vw);
      }
    }
  }

  .btns {
    height: 37vh;
    padding-right: 0px;
    top: 0px;
  }
}
@media (max-width: 545px) {
}
</style>

<script setup>
import { reactive, ref } from "vue";
import { apiAuth } from "@/plugins/axios";
import { useRoute, useRouter } from "vue-router";
import { Swal } from "sweetalert2";
import { useUserStore } from "@/stores/user";
import Map from "@/components/Map.vue";
// Router是跳頁 ，Route是取現在路由資訊用
const route = useRoute();
const imageCount = ref(0);
const getImageUrl = (i) => {
  return shelter.img[i - 1];
};

const router = useRouter();
const user = useUserStore();
// const mapUrl= 'https://www.google.com.tw/maps/place/'
const shelter = reactive({
  _id: "",
  img: [],
  place: "",
  cityName: "",
  tel: "",
  add: "",
  openTime: "",
  lon: "",
  lat: "",
});

const home = () => {
  router.go(-1);
};

(async () => {
  try {
    const { data } = await apiAuth.get("/shelters/" + route.params.id);
    shelter._id = data.result._id;
    shelter.img = data.result.img;
    imageCount.value = shelter.img.length;
    // console.log(imageCount.value);
    shelter.place = data.result.place;
    shelter.cityName = data.result.cityName;
    shelter.tel = data.result.tel;
    shelter.add = data.result.add;
    shelter.openTime = data.result.openTime;
    shelter.lon = data.result.lon;
    shelter.lat = data.result.lat;

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
