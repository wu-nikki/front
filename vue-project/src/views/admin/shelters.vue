<template>
  <div id="admin-shelters">
    <n-h1>收容所資料管理</n-h1>

    <div class="table">
      <n-table :single-line="false" size="large" striped>
        <thead>
          <tr>
            <th>排序</th>
            <th>收容所名稱</th>
            <th>編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="shelter in shelters" :key="shelter._id">
            <td>{{ shelter.seq }}</td>
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
      width: 40vw;
    }
    .n-table th{
      font-weight: bolder !important;
      font-size: 20px;
    }
    .n-table tr{

      font-size: 16px;
    }
    tr {
      & :nth-child(1),
      :nth-child(3) {
        text-align: center;
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
}
</style>

<script setup>
import { CreateOutline } from "@vicons/ionicons5";

import { apiAuth } from "@/plugins/axios";
import { reactive } from "vue";
import Swal from "sweetalert2";

const shelters = reactive([]);
const form = reactive({
  _id: "",
  seq: "",
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
  dialog: false,
});

const openDialog = (idx) => {
  // -1 代表目前要新增的東西不在陣列裡面

  form._id = products[idx]._id;
  form.seq = products[idx].seq;
  form.img = undefined;
  form.place = products[idx].place;
  form.cityName = products[idx].cityName;
  form.tel = products[idx].tel;
  form.add = products[idx].add;
  form.openTime = products[idx].openTime;
  form.lon = products[idx].lon;
  form.lat = products[idx].lat;

  form.valid = false;
  form.loading = false;

  form.dialog = true;
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
