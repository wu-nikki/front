<template>
  首頁
  <n-carousel>
    <img
      class="carousel-img"
      src="https://picsum.photos/1920/1080/?random=10"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    />
  </n-carousel>

  <!-- v-col(v-for="product in products" :key="product._id" cols="12" md="6" lg="3") -->
  <div id="animal-card">
    <div class="row">
      
    </div>
  </div>
  <!-- ProductCard(v-bind="product") -->


</template>

<style lang="scss">
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>

<script setup>
// import { reactive } from 'vue'
// import { api } from '@/plugins/axios'
// import Swal from 'sweetalert2'
// import ProductCard from '@/components/ProductCard'
// const products = reactive([]);
// (async () => {
//   try {
//     const { data } = await api.get('/products')
//     products.push(...data.result)
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: '失敗',
//       text: error?.response?.data?.message || '發生錯誤'
//     })
//   }
// })()

</script>
