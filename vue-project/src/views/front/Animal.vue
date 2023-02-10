<template>animal

<div class="goHome"><n-button   ghost  > 詳細介紹 </n-button></div>

</template>

<style lang="scss">

.goHome{
  .n-button{
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
</style>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute, useRouter } from 'vue-router'
// Router是跳頁 ，Route是取現在路由資訊用
import { Swal } from 'sweetalert2'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editCart } = user

const valid = ref(false)
const quantity = ref(0)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  number (value) {
    return value > 0 || '數量錯誤'
  }
}

const product = reactive({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: ''
})

const submitCart = () => {
  if (!valid.value) return
  editCart({ _id: product._id, quantity: quantity.value })
}

(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.price = data.result.price
    product.description = data.result.description
    product.image = data.result.image
    product.sell = data.result.sell
    product.category = data.result.category

    document.title = '購物網 | ' + product.name
    // document.querySelector('meta[property="og:title"]').setAttribute('content', product.name)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品失敗'
    })
    router.go(-1)
  }
})()

</script>
