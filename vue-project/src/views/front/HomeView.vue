<template>
  首頁
  <n-carousel>
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
    <div class="row">
      <n-divider>Screen 响应式</n-divider>
      <n-grid x-gap="12" :cols="4">
        <!-- responsive="screen" -->
        <n-gi v-for="animal in animals" :key="animal._id">
          <AnimalCard v-bind="animal"></AnimalCard>
        </n-gi>
      </n-grid>
      <n-divider>Screen 响应式</n-divider>
    </div>
  </div>
  <!-- ProductCard(v-bind="animal") -->
</template>

<style lang="scss">
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
// #animal-card{

// }
</style>

<script setup>
import { reactive } from "vue";
import { api } from "@/plugins/axios";
import Swal from "sweetalert2";
import AnimalCard from "../../components/AnimalCard.vue";
const animals = reactive([]);

(async () => {
  try {
    const { data } = await api.get("/animals");

    animals.push(...data.result);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
</script>
