<template>
  <!-- <img :src="animal.img" /> -->

  <div class="animalData">
    <n-layout position="absolute">
      <n-layout has-sider position="absolute" style="top: 64px">
        <n-layout-sider bordered :native-scrollbar="false">
          <n-image
            :src="
              animal.img == '' ? 'https://i.imgur.com/yfhkJ0F.jpg' : animal.img
            "
          />
        </n-layout-sider>
        <n-layout :native-scrollbar="false" id="animal-Data">
          <div class="btns">
            <div class="heart">
              <n-button quaternary circle @click="activateHeart()">
                <template #icon>
                  <n-icon v-if="animal.loved"><Heart /></n-icon>
                  <n-icon v-else><HeartOutline /></n-icon>
                </template>
              </n-button>
            </div>

            <div class="goHome">
              <n-button ghost @click="home()"> 回上頁 </n-button>
            </div>
          </div>

          <!-- 大標 -->
          <!--  primary   info藍  warning黃 error紅 -->
          <div style="padding-left: 16px; position: relative">
            <div
              style="
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 24px;
              "
            />
            <n-h1 prefix="bar" align-text type="error">
              <n-h1>
                {{ animal.size }}{{ animal.color }}{{ animal.variety
                }}{{ animal.gender }}{{ animal.kind }}</n-h1
              >
            </n-h1>
            <n-h3>
              <n-text> 是否開放認養: </n-text>
              <span> {{ animal.status }} </span></n-h3
            >

            <n-h3
              ><n-text>開放認養日期: </n-text>
              <span>{{ animal.opendate }} </span></n-h3
            >

            <n-h3
              ><n-text>絕育狀態:</n-text>
              <span>{{ animal.sterilization }}</span>
            </n-h3>

            <n-h3
              ><n-text>年齡:</n-text> <span>{{ animal.age }}</span>
            </n-h3>

            <n-h3
              ><n-text>收容編號:</n-text> <span>{{ animal.subid }}</span>
            </n-h3>

            <n-h3
              ><n-text>描述:</n-text> <span>{{ animal.remark }}</span>
            </n-h3>

            <n-h3
              ><n-text>所在收容所:</n-text>
              <p>{{ animal.shelterName.place }}</p>
            </n-h3>
            <n-h3
              ><n-text>收容所電話:</n-text>
              <p>{{ animal.shelterName.tel }}</p>
            </n-h3>
            <n-h3
              ><n-text>收容所地址:</n-text>
              <p>{{ animal.shelterName.add }}</p>
            </n-h3>
            <n-h3
              ><n-text>收容所開放時間:</n-text>
              <p>{{ animal.shelterName.openTime }}</p>
            </n-h3>
          </div>
          
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<style lang="scss">
.animalData {
  .n-layout-sider {
    width: 40% !important;
    max-width: 40% !important;
    .n-layout-sider-scroll-container {
      display: flex;
    }
    .n-scrollbar-container {
      display: flex;
      align-items: center;
    }
    .n-image {
      width: 100%;
      img {
        margin: auto;
        width: calc(200px + 12vw);
      }
    }
  }

  .n-scrollbar {
    min-width: 40% !important;
  }

  .n-layout-sider__border {
    --n-border-color: rgb(245, 245, 245);
  }
  .n-h1 {
    font-size: calc(1rem + 1.2vw);
    font-weight: bolder;
  }
  .n-text {
    font-size: calc(1rem + 0.5vw);

    font-weight: bolder;
  }
  .n-h3 {
    margin: 20px 0px 8px 0px;
  }
  span:nth-child(2) {
    font-size: calc(1rem + 0.3vw);
    margin-left: 1vw;
  }
  p {
    font-size: calc(1rem + 0.3vw);

    margin: 0px;
  }
  .n-scrollbar-content {
    padding: 2vw 1vw;
  }
}
.btns {
  z-index: 2;
  padding-right: 2vw;
  float: right;
  height: 85vh;
  display: flex;
  position: sticky;
  top: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
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
  .animalData {
    .n-layout-scroll-container {
      flex-direction: column !important;
    }

    .n-layout-sider {
      width: 100% !important;
      max-width: 100% !important;
      max-height: 350px;
    }
    .n-scrollbar {
      min-width: 100% !important;
    }
    #animal-Data {
      .n-scrollbar-content {
        padding: 2vw 10vw;
      }
    }
  }

  .btns {
    height: 48vh;
    padding-right: 0px;
    top: 0px;
  }
}
@media (max-width: 545px) {
  .animalData {
    img {
      width: calc(150px + 10vw) !important;
    }
  }
}
</style>

<script setup>
import { HeartOutline, Heart } from "@vicons/ionicons5";

import { reactive, ref } from "vue";
import { apiAuth } from "@/plugins/axios";
import { useRoute, useRouter } from "vue-router";

import { Swal } from "sweetalert2";
import { useUserStore } from "@/stores/user";
// Router是跳頁 ，Route是取現在路由資訊用
const route = useRoute();
const router = useRouter();
const user = useUserStore();

const activateHeart = async () => {
  try {
    if (animal.loved) {
      await apiAuth.delete("/users/likeAnimalsList/" + animal._id);
    } else {
      await apiAuth.post("/users/likeAnimalsList/" + animal._id);
    }
    animal.loved = !animal.loved;
  } catch (error) {
    console.log(error);
  }
};

const animal = reactive({
  _id: "",
  img: "",
  size: "",
  color: "",
  variety: "",
  gender: "",
  kind: "",
  opendate: "",
  sterilization: "",
  age: "",
  subid: "",
  status: "",
  shelterName: {},
  remark: "",
  loved: false,
});

const home = () => {
  router.go(-1);
};

(async () => {
  try {
    const { data } = await apiAuth.get("/animals/" + route.params.id);
    animal._id = data.result._id;
    animal.img = data.result.img;
    animal.size = data.result.size;
    animal.color = data.result.color;
    animal.variety = data.result.variety;
    animal.gender = data.result.gender;
    animal.kind = data.result.kind;
    animal.opendate = data.result.opendate;
    animal.sterilization = data.result.sterilization;
    animal.age = data.result.age;
    animal.subid = data.result.subid;
    animal.status = data.result.status;
    animal.shelterName = data.result.shelterName;
    animal.remark = data.result.remark;
    animal.loved = data.result.loved;
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
