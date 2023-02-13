<template>
  
  <n-carousel v-if="isHome">
    <img
      class="carousel-img"
      src="https://picsum.photos/1920/1080/?random=10"
    />
    <img class="carousel-img" src="https://picsum.photos/1920/1080/?random=9" />
    <img class="carousel-img" src="https://picsum.photos/1920/1080/?random=8" />
    <img class="carousel-img" src="https://picsum.photos/1920/1080/?random=7" />
  </n-carousel>

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
  height: 240px;
  object-fit: cover;
}
#animal-card {
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
import { computed, reactive } from "vue";
import { api } from "@/plugins/axios";
import Swal from "sweetalert2";
import AnimalCard from "../../components/AnimalCard.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const animals = reactive([]);
const isHome = computed(()=>{
  if (route.name === "home") {
    return true;
  } else {
    return false;
  }
});

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);
const displayAnimals = computed(() => {
  const skipAmount = (page.value - 1) * pageSize.value;
  return animals.slice(skipAmount, skipAmount + pageSize.value);
});
(async () => {
  try {
    const { data } = await api.get("/animals");
    animals.push(...data.result);
    pageCount.value = Math.ceil(animals.length / pageSize.value);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();

</script>
