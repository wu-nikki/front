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
    --n-text-color-focus: rgb(255, 64, 0) !important;


    --n-border-hover: 2px solid rgb(252, 170, 145) !important;
    --n-border-pressed: 2px solid #fd784e !important;
    --n-border-focus: 3px solid rgb(255, 64, 0) !important;
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
@media (max-width: 545px) {
  .shelters-btn {
  width: 100%;
  justify-content: center;
}
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

const buttonList = ["??????", "??????", "??????", "??????", "??????", "??????"];
const activeButton = ref(buttonList[0]);
const city = [
  {
    title: "??????",
    list: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????"],
  },
  {
    title: "??????",
    list: ["?????????","?????????","?????????","?????????"],
  },
  {
    title: "??????",
    list: ["?????????","?????????","?????????","?????????","?????????",],
  },
  {
    title: "??????",
    list: ["?????????","?????????","?????????",],
  },
  {
    title: "??????",
    list: ["?????????","?????????","?????????",],
  },
];

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);



const filtershelters = computed(() => {
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
  return filtershelters.value.slice(skipAmount, skipAmount + pageSize.value);
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
      title: "??????",
      text: error?.response?.data?.message || "????????????",
    });
  }
})();
</script>
