<template>
  <div id="admin-shelters">
    <n-h1>收容所資料管理</n-h1>

    <div class="table">
      <n-table :single-line="false" size="large" striped>
        <thead>
          <tr>
            <th>排序</th>
            <th>收容所圖片</th>
            <th>收容所名稱</th>
            <th>編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(shelter, idx) in shelters" :key="shelter._id">
            <td>{{ shelter.seq }}</td>
            <td><n-image width="150" :src="shelter.img[0]" /></td>
            <td>{{ shelter.place }}</td>
            <td>
              <n-button quaternary circle @click="openDialog(idx)">
                <template #icon>
                  <n-icon><CreateOutline /></n-icon>
                </template>
              </n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
    <!--  -->
    <!-- <n-dialog-provider v-model="form.dialog"> -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="收容所資料"
      :trap-focus="false"
    >
      <!-- 加上     @submit.prevent="submit" 後畫面不會重新載入。 -->
      <n-form ref="valid" :model="form" label-placement="left" :rules="rules">
        <n-form-item-row label="排序: " path="seq">
          <n-input v-model:value="form.seq" placeholder="修改排序"></n-input>
        </n-form-item-row>

        <n-form-item-row label="收容所名稱: " path="place">
          <n-input
            v-model:value="form.place"
            placeholder="修改收容所名稱"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="所在縣市: " path="cityName">
          <n-input
            v-model:value="form.cityName"
            placeholder="修改所在縣市"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="電話: " path="tel">
          <n-input v-model:value="form.tel" placeholder="修改電話"></n-input>
        </n-form-item-row>

        <n-form-item-row label="地址: " path="add">
          <n-input v-model:value="form.add" placeholder="修改地址"></n-input>
        </n-form-item-row>

        <n-form-item-row label="開放時間: " path="openTime">
          <n-input
            v-model:value="form.openTime"
            placeholder="修改開放時間"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="經度: " path="lon">
          <n-input v-model:value="form.lon" placeholder="修改經度"></n-input>
        </n-form-item-row>

        <n-form-item-row label="緯度: " path="lat">
          <n-input v-model:value="form.lat" placeholder="修改緯度"></n-input>
        </n-form-item-row>

        <n-form-item-row label="新增照片: " path="img">
          <n-upload
            v-model:value="form.img"
            list-type="image-card"
            accept=".jpg,.jpeg,.png,.gif,.tiff,.svg"
            :default-file-list="originalImg"
            @change="handleChange"
          />
          <!--     accept=".jpg,.jpeg,.png,.gif,.tiff,.svg" -->
          <!-- @preview="handlePreview" -->
        </n-form-item-row>

        <!-- <n-form-item-row  path="img" label="舊照片: ">
          <n-image :src="form.img[0]" width="100"></n-image>
          <n-image :src="form.img[1]" width="100"></n-image>
          <n-image :src="form.img[2]" width="100"></n-image>
          <n-image :src="form.img[3]" width="100"></n-image>
          <n-image :src="form.img[4]" width="100"></n-image>

        </n-form-item-row> -->

        <n-form-item-row>
          <n-form-item>
            <n-button
              :disabled="form.loading"
              quaternary
              type="submit"
              @click="submit"
            >
              送出
            </n-button>
            <n-button
              :disabled="form.loading"
              quaternary
              type="primary"
              @click="cancel"
            >
              取消
            </n-button>
          </n-form-item>
        </n-form-item-row>
      </n-form>
    </n-modal>
  </div>
</template>

<style lang="scss">
#admin-shelters {
  .n-h1 {
    margin: 1.5rem 0 1rem 0;
    text-align: center;
    font-weight: bolder;
  }
  .table {
    margin-bottom: 20vh;
    .n-table {
      --n-border-radius: 15px !important;
      width: 50vw;
    }
    .n-table th {
      font-weight: bolder !important;
      font-size: 20px;
    }
    .n-table tr {
      font-size: 16px;
    }
    tr {
      & :nth-child(1),
      :nth-child(2),
      :nth-child(4) {
        text-align: center;
      }
    }
    tbody tr {
      td:nth-child(2) {
        width: 200px !important;

        height: 200px !important;
      }
    }
  }

  .n-button {
    --n-color: rgba(255, 255, 255, 0.8) !important;
    --n-color-hover: #ffe3da !important;
    --n-text-color-hover: rgba(0, 0, 0, 0.8) !important;
  }
  .n-button__icon {
    font-size: 1.5rem;
  }
}

.n-modal {
  width: 60vw;
  .n-button {
    --n-color: rgba(255, 255, 255, 0.8) !important;
    --n-color-hover: #ffe3da !important;
    --n-text-color-hover: rgba(0, 0, 0, 0.8) !important;
    --n-text-color: #fd784eff !important;
  }
  .n-button__icon {
    font-size: 1.5rem;
  }
}
</style>

<script setup>
import { CreateOutline } from "@vicons/ionicons5";

import { apiAuth } from "@/plugins/axios";
import { reactive } from "vue";
import Swal from "sweetalert2";

const showModal = ref(false);
const originalImg = ref([]);
const shelters = reactive([]);
const valid = ref(null);
const form = reactive({
  _id: "",
  seq: "",
  img: [],
  place: "",
  cityName: "",
  tel: "",
  add: "",
  openTime: "",
  lon: "",
  lat: "",
  // valid: false,
  loading: false,
  // dialog: false,
});

const handleChange = (options) => {
  // form.img = options.fileList.map((img) => img.file);
  let i = [];
  let j = [];
  i = options.fileList.map((img) => img.url).filter((url) => url !== null);
  j = options.fileList.map((img) => img.file).filter((url) => url !== null);
  form.img = [...i, ...j];
};


const openDialog = (idx) => {
  // -1 代表目前要新增的東西不在陣列裡面

  form._id = shelters[idx]._id;
  form.seq = shelters[idx].seq;
  form.img = shelters[idx].img;
  form.place = shelters[idx].place;
  form.cityName = shelters[idx].cityName;
  form.tel = shelters[idx].tel;
  form.add = shelters[idx].add;
  form.openTime = shelters[idx].openTime;
  form.lon = shelters[idx].lon;
  form.lat = shelters[idx].lat;

  form.valid = false;
  form.loading = false;
  
  // form.dialog = true;
 



  showModal.value = !showModal.value;

};




const cancel = async () => {
  // showModal.value = false;
  try {
    const { data } = await apiAuth.get("/shelters");
    form.seq = data.result[0].seq;
    form.place = data.result[0].place;
    form.cityName = data.result[0].cityName;
    form.tel = data.result[0].tel;
    form.add = data.result[0].add;
    form.openTime = data.result[0].openTime;
    form.lon = data.result[0].lon;
    form.lat = data.result[0].lat;
    originalImg.value.push(
      ...data.result[0].img.map((image, idx) => {
        return {
          id: idx.toString(),
          name: idx.toString(),
          status: "finished",
          url: image,
        };
      })
    );
    console.log("1");
    form.img = originalImg.value;
    showModal.value = false;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
};


const rules = {
  seq: [
    {
      required: true,
      message: "請輸入排序",
    },
  ],
  place: [
    {
      required: true,
      message: "請輸入收容所名稱",
    },
  ],
  cityName: [
    {
      required: true,
      message: "請輸入所在縣市",
    },
  ],
  tel: [
    {
      required: true,
      message: "請輸入電話",
    },
  ],
  add: [
    {
      required: true,
      message: "請輸入地址",
    },
  ],
  openTime: [
    {
      required: true,
      message: "請輸入開放時間",
    },
  ],
  lon: [
    {
      required: true,
      message: "請輸入經度",
    },
  ],
  lat: [
    {
      required: true,
      message: "請輸入緯度",
    },
  ],
};


//
const submit = async () => {
  valid.value?.validate(async (errors) => {
    if (!errors) {
      const fd = new FormData();
      // fd.append(key,value)
      fd.append("seq", form.seq);

      // if (form.img.length >= 1) {
      //   form.img.forEach((item) => {
      //     fd.append("img", item);
      //   });
      // }
      for (const i of form.img) {
        fd.append("img", i);
      }

      fd.append("place", form.place);
      fd.append("cityName", form.cityName);
      fd.append("tel", form.tel);
      fd.append("add", form.add);
      fd.append("openTime", form.openTime);
      fd.append("lon", form.lon);
      fd.append("lat", form.lat);

      try {
        const { data } = await apiAuth.patch("/shelters/" + form._id, fd);

        shelters[form.idx] = data.result;
        Swal.fire({
          icon: "success",
          title: "成功",
          text: "編輯成功",
        });

        form.dialog = false;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "失敗",
          text: error?.response?.data?.message || "發生錯誤",
        });
      }
      form.loading = false;
      showModal.value = false;
    }
  });
};

// 立即執行
(async () => {
  try {
    const { data } = await apiAuth.get("/shelters");
    shelters.push(...data.result);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
</script>
