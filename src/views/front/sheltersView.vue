<template>
  <div class="shelters-btn">
    <n-button-group>
      <n-button
        ghost
        v-for="(btn, index) in buttonList"
        :class="{
          'btn-circle1': index === 0,
          'btn-circle2': index === buttonList.length - 1,
        }"
        @click="activeButton = btn"
        >{{ btn }}</n-button
      >
    </n-button-group>
  </div>

  <div class="shelters-card">
    <n-grid cols="1 s:2 m:3 " responsive="screen" item-responsive>
      <!-- <n-gi span="3 545:2  768:1" -->
      <n-gi v-for="shelter in displayshelters" :key="shelter._id">
        <sheltersCard v-bind="shelter"></sheltersCard>
      </n-gi>
    </n-grid>
  </div>

  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="pageCount"
    show-size-picker
    :page-sizes="[12]"
  />
</template>

<style lang="scss">
.shelters-btn {
  margin: auto;
  width: 65%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .n-button {
    .n-button__content:active {
      color: #fd784eff !important;
    }
    --n-text-color-hover: rgb(253, 145, 112) !important;
    --n-text-color-pressed: #fd784eff !important;
    --n-text-color-focus: rgb(0, 0, 0) !important;
    --n-text-color-active: #fd784eff !important;
    --n-border-active: #fd784eff !important;

    --n-border-hover: 2px solid rgb(252, 170, 145) !important;
    --n-border-pressed: 2px solid #fd784e !important;
    --n-border-focus: 1px solid rgb(255, 227, 218) !important;
  }
  .btn-circle1 {
    --n-border-radius: 20px !important;
  }
  .btn-circle2 {
    --n-border-radius: 20px !important;
  }
}
.shelters-card {
  padding-top: 20px;
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
</style>

<script setup>
import sheltersCard from "../../components/sheltersCard.vue";
import { computed, reactive } from "vue";
import { api } from "@/plugins/axios";
import Swal from "sweetalert2";

import { useRoute } from "vue-router";
const route = useRoute();
const shelters = reactive([]);

const buttonList = ["全部", "北部", "中部", "南部", "東部", "離島"];
const activeButton = ref(buttonList[0]);
const city = [
  {
    title: "北部",
    list: ["臺北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣"],
  },
  {
    title: "中部",
    list: [],
  },
  {
    title: "南部",
    list: [],
  },
  {
    title: "東部",
    list: [],
  },
  {
    title: "離島",
    list: ["澎湖縣"],
  },
];

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);

// const filtershelters1 = computed(() => {
//   return;
//   const shelters1 = shelters.filter((item) => {
//     return (item.cityName.includes(
//       "臺北市" && "新北市" && "基隆市" && "桃園市" && "新竹市" && "新竹縣"
//     ));
//   });
//   pageCount.value = Math.ceil(shelters.length / pageSize.value);
//   return shelters1;
// });

const filtershelters1 = computed(() => {
  if (activeButton.value === buttonList[0]) {
    pageCount.value = Math.ceil(shelters.length / pageSize.value);
    return shelters;
  } else {
    const cityIndex = city.findIndex(
      (item) => item.title === activeButton.value
    );
    const newData = shelters.filter((item) =>
      city[cityIndex].list.includes(item.cityName)
    );

    pageCount.value = Math.ceil(newData.length / pageSize.value);

    return newData;
  }
});

const displayshelters = computed(() => {
  const skipAmount = (page.value - 1) * pageSize.value;
  return filtershelters1.value.slice(skipAmount, skipAmount + pageSize.value);
});
(async () => {
  try {
    const { data } = await api.get("/shelters");
    shelters.push(...data.result);
    shelters.sort((itemA, itemB) => Number(itemA.seq) - Number(itemB.seq));

    pageCount.value = Math.ceil(shelters.length / pageSize.value);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
</script>
