<template>

  <div id="shelters-card">
    <n-grid cols="1 s:2 m:3 l:4" responsive="screen" item-responsive>
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
#shelters-card {
  padding-top: 80px;
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

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);
const displayshelters = computed(() => {
  const skipAmount = (page.value - 1) * pageSize.value;
  return shelters.slice(skipAmount, skipAmount + pageSize.value);
});
(async () => {
  try {
    const { data } = await api.get("/shelters");
    shelters.push(...data.result);
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
