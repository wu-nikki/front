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
    
    <n-grid cols="1 s:2 m:3 l:4" responsive="screen" item-responsive>
      <!-- <n-gi span="3 545:2  768:1" -->
      <n-gi v-for="animal in animals" :key="animal._id">
        <AnimalCard v-bind="animal"></AnimalCard>
      </n-gi>
    </n-grid>
    
  </div>
  <!-- ProductCard(v-bind="animal") -->
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
