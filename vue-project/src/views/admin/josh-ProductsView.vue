<template>
  <h1>商品管理</h1>

  <n-button @click="openDialog(-1)">
    新增商品
  </n-button>

  <n-modal v-model:show="form.dialog" preset="dialog" title="Dialog" negative-text="取消" positive-text="送出" :mask-closable="false" :on-negative-click="closeForm" :on-positive-click="submitForm" :closable="false" :loading="loading">
    <template #header>
      <div>{{ form._id.length > 0 ? '編輯商品' : '新增商品' }}</div>
    </template>
    <n-card>
      <n-form ref="fromRef" :rules="rules" :model="form">
        <n-grid :cols="12" :x-gap="12">
          <n-form-item-gi :span="10" label="商品名稱" path="name">
            <n-input v-model:value="form.name" placeholder="給商品取個名字吧！" />
          </n-form-item-gi>
          <n-form-item-gi :span="2" label="上架" path="sell">
            <n-switch v-model:value="form.sell" />
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="商品售價" path="price">
            <n-input-number v-model:value="form.price" placeholder="賣多少錢？" />
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="商品分類" path="category">
            <n-select v-model:value="form.category" :options="categories" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="商品說明" path="description">
            <n-input
              v-model:value="form.description" type="textarea" :autosize="{ minRows: 3,maxRows: 5 } " placeholder="說說這個商品有多酷！"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" label="商品圖片" path="images">
            <n-upload
              v-model:value="form.images" list-type="image-card" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp"
              :default-file-list="originalImages" :multiple="true" :max="12" @change="handleChange"
            >
              上傳圖片
            </n-upload>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
  </n-modal>
  <n-divider />
  <n-data-table :columns="columns" :data="products" />
</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { apiAuth } from '@/plugins/axios'

import { useMessage, useDialog, NButton } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()
const loading = ref(false)

const originalImages = ref([])
const rules = {
  name: {
    required: true,
    message: '這一欄忘了填',
    trigger: ['input', 'blur']
  },
  price: {
    type: 'number',
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('請輸入售價')
      } else if (!/^[1-9]\d*$/.test(value)) {
        return new Error('請輸入正整數')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  description: {
    required: true,
    message: '這一欄忘了填',
    trigger: ['input', 'blur']

  },
  images: {
    required: true,
    message: '請上傳圖片'
  },
  category: {
    required: true,
    message: '請選擇分類'
  }
}
const categories = [
  {
    label: 'Clothing',
    value: 'clothing'
  }, {
    label: 'Rechords',
    value: 'rechords'
  }, {
    label: 'Accessories',
    value: 'accessories'
  }]
const fromRef = ref(null)
const products = reactive([])
const form = reactive({
  _id: '',
  name: '',
  price: 0,
  description: '',
  images: [],
  sell: false,
  category: '',
  loading: false,
  dialog: false,
  idx: -1
})

const openDialog = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.name = ''
    form.price = 0
    form.description = ''
    form.images = []
    form.sell = false
    form.category = ''
    form.valid = false
    form.loading = false
    form.idx = -1
  } else {
    form._id = products[idx]._id
    form.name = products[idx].name
    form.price = products[idx].price
    form.description = products[idx].description
    // form.images = products[idx].images
    form.sell = products[idx].sell
    form.category = products[idx].category
    form.valid = false
    form.loading = false
    form.idx = idx

    originalImages.value.push(...products[idx].images.map((image, idx) => {
      return {
        id: idx.toString(),
        name: idx.toString(),
        status: 'finished',
        url: image
      }
    }))
    form.images = originalImages.value
  }
  form.dialog = true
}

const handleChange = (options) => {
  let i = []
  let j = []
  i = options.fileList.map(image => image.url).filter(url => url !== null)
  j = options.fileList.map(image => image.file).filter(url => url !== null)
  form.images = [...i, ...j]
}
const closeForm = () => {
  originalImages.value = []
  form.dialog = false
}

const submitForm = async (e) => {
  fromRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true

      // fd.append(key, value)
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('price', form.price)
      fd.append('description', form.description)
      fd.append('sell', form.sell)
      fd.append('category', form.category)

      form.images = form.images.map(obj => {
        if (obj.url) { return obj.url }
        return obj
      })
      for (const i of form.images) {
        fd.append('images', i)
      }

      try {
        if (form._id.length === 0) {
          const { data } = await apiAuth.post('/products', fd)
          products.push(data.result)
          await dialog.success({
            title: '新增成功',
            content: '商品新增成功',
            positiveText: '確認'
          })
          closeForm()
        } else {
          const { data } = await apiAuth.patch('/products/' + form._id, fd)
          products[form.idx] = data.result
          await dialog.success({
            title: '編輯成功',
            content: '商品編輯成功',
            positiveText: '確認'
          })
          closeForm()
        }
        form.dialog = false
      } catch (error) {
        await dialog.error({
          title: '新增失敗',
          content: error?.response?.data?.message || '發生錯誤',
          positiveText: '確認'
        })
        console.log(error)
      }
      loading.value = false
    } else {
      message.error('請檢查資料是否完整')
    }
  })
  // 避免觸發預設dialog
  return false
}

// 商品列表

(async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
  } catch (error) {
    dialog.error({
      title: '載入失敗',
      content: error?.response?.data?.message || '發生錯誤',
      positiveText: '確認'
    })
  }
})()

const createColumns = ({ edit }) => {
  return [
    {
      title: '商品',
      key: 'name'
    },
    {
      title: '售價',
      key: 'price'
    },
    {
      title: '分類',
      key: 'category'
    },
    {
      title: '',
      key: 'edit',
      render (row, idx) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => edit(row, idx)
          },
          { default: () => '編輯' }
        )
      }
    }
  ]
}
const columns = createColumns({
  edit (row, idx) {
    openDialog(idx)
  }
})

</script>
<style scoped lang="scss">

</style>
