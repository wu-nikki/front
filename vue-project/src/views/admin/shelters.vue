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
            <td><n-image width="150" :src="shelter.img" /></td>
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
    <n-modal v-model:show="showModal" preset="card" title="收容所資料">
      <n-form
        ref="valid"
        :model="form"
        @submit.prevent="submit"
        label-placement="left"
      >
        <n-form-item-row label="排序: ">
          <n-input v-model:value="form.seq"></n-input>
        </n-form-item-row>

        <n-form-item-row>
          <n-form-item>
            <n-button
              :disabled="form.loading"
              quaternary
              type="primary"
              @click="submit"
            >
              送出
            </n-button>
            <n-button
              :disabled="form.loading"
              quaternary
              type="primary"
              @click="form.dialog = false"
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
import { useDialog } from "naive-ui";
import { apiAuth } from "@/plugins/axios";
import { reactive } from "vue";
import Swal from "sweetalert2";
// const dialog = useDialog()
const showModal = ref(false);

const shelters = reactive([]);
const form = reactive({
  _id: "",
  seq: "a",
  img: "",
  place: "",
  cityName: "",
  tel: "",
  add: "",
  openTime: "",
  lon: "",
  lat: "",
  valid: false,
  loading: false,
  // dialog: false,
});

const openDialog = (idx) => {
  // -1 代表目前要新增的東西不在陣列裡面

  form._id = shelters[idx]._id;
  form.seq = shelters[idx].seq;
  form.img = undefined;
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

//
const submit = async () => {
  if (!form.valid) return;

  const fd = new FormData();
  // fd.append(key,value)
  fd.append("seq", form.seq);
  fd.append("img", form.img);
  fd.append("place", form.place);
  fd.append("cityName", form.cityName);
  fd.append("tel", form.tel);
  fd.append("add", form.add);
  fd.append("openTime", form.openTime);
  fd.append("lon", form.lon);
  fd.append("lat", form.lat);

  try {
    if (form._id.length > 0) {
      const { data } = await apiAuth.patch("/shelters" + form._id, fd);
      products[form.idx] = data.result;
      Swal.fire({
        icon: "success",
        title: "成功",
        text: "編輯成功",
      });
    }
    form.dialog = false;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
  form.loading = false;
};

// 立即執行
(async () => {
  try {
    const { data } = await apiAuth.get("/shelters/");
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
