<template>
  <h1>首頁管理</h1>
  <n-divider />
  <n-form ref="fromRef" :rules="rules" :model="form" :show-require-mark="false">
    <n-form-item label="About Us" path="intro">
      <n-input
        v-model:value="form.intro" type="textarea" :autosize="{ minRows: 3,maxRows: 5 } " placeholder="請輸入介紹文字"
      />
    </n-form-item>
    <n-form-item label="Banner" path="banners">
      <n-upload
        v-model:value="form.banners" list-type="image-card" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.webp" :default-file-list="originalBanners"
        @change="handleChange"
      >
        建議大小
        <br>
        1920 * 1080
      </n-upload>
    </n-form-item>
  </n-form>
  <n-button @click="cancel">
    取消
  </n-button>
  <n-button :loading="loading" type="primary" @click="submitForm">
    修改
  </n-button>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useMessage, useDialog } from 'naive-ui'

const dialog = useDialog()
const message = useMessage()

const loading = ref(false)
const rules = {
  intro: {
    required: true,
    message: '請輸入介紹文字'
  }
}
const fromRef = ref(null)
const form = reactive({
  intro: '',
  banners: []
})
const cancel = async () => {
  try {
    const { data } = await apiAuth.get('/intro')
    form.intro = data.result[0].intro
    originalBanners.value.push(...data.result[0].banners.map((image, idx) => {
      return {
        id: idx.toString(),
        name: idx.toString(),
        status: 'finished',
        url: image
      }
    }))
    form.banners = originalBanners.value
  } catch (error) {
    console.log(error)
    dialog.error({
      title: '載入失敗',
      content: error?.response?.data?.message || '發生錯誤',
      positiveText: '確認'
    })
  }
}

const originalBanners = ref([])
const handleChange = (options) => {
  let i = []
  let j = []
  i = options.fileList.map(image => image.url).filter(url => url !== null)
  j = options.fileList.map(image => image.file).filter(url => url !== null)
  form.banners = [...i, ...j]
}

const submitForm = async () => {
  fromRef.value?.validate(async (errors) => {
    if (!errors) {
      // fd.append(key, value)
      const fd = new FormData()
      fd.append('intro', form.intro)
      for (const i of form.banners) {
        fd.append('banners', i)
      }
      try {
        loading.value = true
        await apiAuth.patch('/intro', fd)
        dialog.success({
          title: '編輯成功',
          content: '首頁資訊編輯成功',
          positiveText: '確認'
        })
        loading.value = false
      } catch (error) {
        dialog.error({
          title: '新增失敗',
          content: error?.response?.data?.message || '發生錯誤',
          positiveText: '確認'
        })
        console.log(error)
        loading.value = false
      }
      loading.value = false
    } else {
      message.error('請檢查資料是否完整')
      loading.value = false
    }
  })
}
(async () => {
  try {
    const { data } = await apiAuth.get('/intro')
    form.intro = data.result[0].intro
    originalBanners.value.push(...data.result[0].banners.map((image, idx) => {
      return {
        id: idx.toString(),
        name: idx.toString(),
        status: 'finished',
        url: image
      }
    }))
    form.banners = originalBanners.value
  } catch (error) {
    console.log(error)
    dialog.error({
      title: '載入失敗',
      content: error?.response?.data?.message || '發生錯誤',
      positiveText: '確認'
    })
  }
})()
</script>
<style scoped lang="scss">

</style>
