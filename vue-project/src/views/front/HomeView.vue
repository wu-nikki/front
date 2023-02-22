<template>
  <n-carousel autoplay v-if="isHome">
    <img class="carousel-img" src="../../assets/carousel/1.jpg"   />
    <img class="carousel-img" src="../../assets/carousel/2.jpg" />
  </n-carousel>

  <div id="filterA">
    <n-grid cols="24" item-responsive responsive="screen">
      <n-grid-item span="0 m:6 l:9">
        <div class="light-green">
          <div style="padding-left: 24px; position: relative">
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
              <n-text> 搜尋條件 </n-text>
            </n-h1>
          </div>
        </div>
      </n-grid-item>
      <n-grid-item span="24 m:18 l:15" style="line-height: 300px">
        <div class="green">
          <div class="filter">
            <n-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-placement="left"
              label-width="auto"
              :style="{
                maxWidth: '760px',
              }"
            >
              <n-form-item label="類別:" path="kind">
                <n-radio-group v-model:value="form.kind" name="radiogroup1">
                  <n-space>
                    <n-radio value="犬"> 犬 </n-radio>
                    <n-radio value="貓"> 貓 </n-radio>
                    <n-radio value="其他"> 其他 </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

              <n-form-item label="性別:" path="gender">
                <n-radio-group v-model:value="form.gender" name="radiogroup2">
                  <n-space>
                    <n-radio value="公"> 公 </n-radio>
                    <n-radio value="母"> 母 </n-radio>
                    <n-radio value="未輸入"> 未輸入 </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

              <n-form-item class="color" label="毛色:" path="color">
                <n-input v-model:value="form.color" placeholder="黑 白.." />
              </n-form-item>

              <n-form-item
                class="selectShelter"
                label="選擇收容所: "
                path="shelterName"
              >
                <n-select
                  v-model:value="form.shelterName"
                  placeholder="Select"
                  :options="shelterOptions"
                />
                <!-- shelterOptions 選單表 -->
              </n-form-item>

              <n-form-item label="收容編號:" path="subid">
                <n-input v-model:value="form.subid" placeholder="" />
              </n-form-item>

              <n-form-item>
                <div style="display: flex; justify-content: flex-end">
                  <n-button
                    class="filterBtn"
                    round
                    type="primary"
                    ghost
                    @click="handleValidateButtonClick"
                  >
                    搜尋
                  </n-button>
                </div>
              </n-form-item>
            </n-form>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>

  <!-- v-col(v-for="product in products" :key="product._id" cols="12" md="6" lg="3") -->
  <div id="animal-card">
    <n-grid cols="1 s:2 m:3 l:4" responsive="screen" item-responsive>
      <!-- <n-gi span="3 545:2  768:1" -->
      <n-gi v-for="animal in displayAnimals" :key="animal._id">
        <AnimalCard v-bind="animal"></AnimalCard>
      </n-gi>
    </n-grid>
  </div>

  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="pageCount"
    show-size-picker
    :page-sizes="[12, 24, 36]"
  />
</template>

<style lang="scss">
.carousel-img {
  width: 100%;
  height: 32vw;
  object-fit: cover;
}
#filterA {
  // margin-top: 10px !important;
  margin: auto;
  width: 80vw;
  height: 300px;

  .n-grid {
    height: 100%;
  }
  .light-green {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .green {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .filter {
    width: 100%;
    height: 70%;
    background-color: rgba(255, 227, 218, 0.5);
    border-radius: 70px;
  }
  .n-form {
    padding: 1vw 10px 2px 2vw;
    width: 95%;
    margin: auto;
    height: 90%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  .n-form-item-feedback-wrapper {
    min-height: 0px;
  }
  // radio
  .n-space {
    gap: 5px 10px;
  }
  .n-radio__label {
    font-size: 15px;
  }
  //
  .n-form-item {
    height: 40px;
    grid-template-columns: auto minmax(0, 150px);
  }
  .n-form-item:nth-child(1),
  .n-form-item:nth-child(2) {
    grid-template-columns: auto minmax(0, 195px);
  }
  .n-form-item:last-child {
    justify-items: center;
  }
  .n-form-item-label {
    font-size: 18px;
    font-weight: 700;
  }
  .color .n-form-item-blank {
    max-width: 60%;
  }

  .selectShelter {
    .n-form-item-blank {
      width: 150px;
    }
  }
  .n-h1 {
    font-size: calc(1rem + 1.1vw);
    font-weight: bolder;
    margin-top: 10px;

    margin-bottom: 10px;
  }
  .n-h1::before {
    background: #fd784eff;
    width: 6px;
  }
  .filterBtn {
    font-size: 15px;
    --n-text-color: rgb(58, 58, 58) !important;
    --n-text-color-hover: rgb(253, 145, 112) !important;
    --n-text-color-pressed: #fd784eff !important;
    --n-text-color-focus: rgb(0, 0, 0) !important;

    --n-ripple-color: rgb(139, 38, 4) !important;
    --n-border: 2px solid rgb(255, 202, 184) !important;
    --n-border-hover: 2px solid rgb(252, 170, 145) !important;
    --n-border-pressed: 2px solid #fd784e !important;
    --n-border-focus: 1px solid rgb(255, 227, 218) !important;
  }
}

#animal-card {
  padding-top: 40px;
  margin: auto;
  width: 80%;
  display: grid;
  justify-content: center;
  .n-grid {
    grid-column-gap: 2vw !important;
    grid-row-gap: 3vh !important;
  }
}
.n-pagination {
  margin: 30px;
  justify-content: center;
  --n-item-text-color-hover: rgb(252, 170, 145) !important;
  --n-item-text-color-active: rgb(237 102 62) !important;
  --n-item-text-color-pressed: rgb(252, 170, 145) !important;
  --n-item-border-active: 2px solid #fd784e !important;
}
.n-pagination-item--active {
  font-size: 17px;
  font-weight: bolder;
}

@media (max-width: 768px) {
  #filterA {
    .n-form {
      padding-bottom: 0px;
      height: 95%;
    }

    .n-form-item {
      height: 30px;
      grid-template-columns: auto minmax(0, 150px);
    }
    .n-form-item:nth-child(1),
    .n-form-item:nth-child(2) {
      grid-template-columns: auto minmax(0, 200px);
    }
  }
}

@media (max-width: 545px) {
  #filterA {
    .n-form {
      height: 90%;
      padding: 2px 0px 0px 12px;

      justify-content: flex-start;
    }
    .n-form-item:last-child {
      justify-content: flex-end;
      grid-template-columns: auto minmax(0, 100px);
    }
  }
}
</style>

<script setup>
import { computed, reactive, ref } from "vue";
import { apiAuth } from "@/plugins/axios";
import Swal from "sweetalert2";
import AnimalCard from "../../components/AnimalCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const animals = reactive([]);

const formRef = ref(null);
const isHome = computed(() => {
  if (route.name === "home") {
    return true;
  } else {
    return false;
  }
});

const form = reactive({
  _id: "",
  // 動物類別
  kind: ["犬", "貓", "其他"],
  // 動物性別
  gender: "",
  color: "",
  shelterName: "",
  // 收容編號
  subid: "",
});
const rules = {
  kind: {
    trigger: "change",
  },
};
const shelterOptions = () => {
  shelterName.map((v) => ({
    label: String(v),
    value: v,
  }));
};

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);
const displayAnimals = computed(() => {
  const skipAmount = (page.value - 1) * pageSize.value;
  return animals.slice(skipAmount, skipAmount + pageSize.value);
});

(async () => {
  try {
    const { data } = await apiAuth.get("/animals");
    animals.push(...data.result);
    pageCount.value = Math.ceil(animals.length / pageSize.value);
    console.log(animals[0]);
    console.log(animals[0].shelterName.place);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
</script>
