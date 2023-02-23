<template>
  <div id="admin-members">
    <n-h1>會員資料管理</n-h1>

    <div class="table">
      <n-table :single-line="false" size="large" striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>會員名稱</th>
            <th>帳號</th>
            <th>電子信箱</th>
            <th>手機號碼</th>
            <th>生日</th>
            <th>編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, idx) in displayusers" :key="user._id">
            <td>{{ user._id }}</td>

            <td>{{ user.name }}</td>
            <!-- <td><n-image width="150" :src="user.img[0]" /></td> -->
            <td>{{ user.account }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.cellPhone }}</td>
            <td>{{ user.birthday }}</td>
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

    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="pageCount"
      show-size-picker
      :page-sizes="[12]"
    />

    <!--  -->
    <!-- <n-dialog-provider v-model="form.dialog"> -->
    <n-modal
      class="admin-Members-card"
      v-model:show="showModal"
      preset="card"
      title="會員資料"
      :trap-focus="false"
    >
      <!-- 加上 @submit.prevent 後畫面不會重新載入。 -->
      <n-form
        ref="valid"
        :model="form"
        @submit.prevent="submit"
        label-placement="left"
      >
        <n-form-item-row label="會員名稱: " path="name">
          <n-input
            v-model:value="form.name"
            placeholder="修改會員名稱"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="帳號: " path="account">
          <n-input v-model:value="form.account" :disabled="true"></n-input>
        </n-form-item-row>

        <n-form-item-row label="手機號碼: " path="cellPhone">
          <n-input
            v-model:value="form.cellPhone"
            placeholder="修改手機號碼"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="電子信箱: " path="email">
          <n-input
            v-model:value="form.email"
            placeholder="修改電子信箱"
          ></n-input>
        </n-form-item-row>

        <n-form-item-row label="生日: " path="birthday">
          <n-input
            v-model:value="form.birthday"
            placeholder="修改生日"
          ></n-input>
        </n-form-item-row>

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
            <n-button :disabled="form.loading" quaternary @click="cancel()">
              取消
            </n-button>
          </n-form-item>
        </n-form-item-row>
      </n-form>
    </n-modal>
  </div>
</template>

<style lang="scss">
#admin-members {
  .n-h1 {
    margin: 1.5rem 0 1rem 0;
    text-align: center;
    font-weight: bolder;
  }
  .table {
    margin-bottom: 5vh;
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
.admin-Members-card {
  max-width: 60%;
  .n-card__content {
    padding: 0 var(--n-padding-left) var(--n-padding-bottom)
      var(--n-padding-left);
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
import { useRouter } from "vue-router";
import { apiAuth } from "@/plugins/axios";
import { reactive } from "vue";
import Swal from "sweetalert2";
// const dialog = useDialog()
const showModal = ref(false);
// const originalImg = ref([]);
const users = reactive([]);

const valid = ref(null);
const router = useRouter();

const page = ref(1);
const pageCount = ref(0);
const pageSize = ref(12);
const displayusers = computed(() => {
  const skipAmount = (page.value - 1) * pageSize.value;
  return users.slice(skipAmount, skipAmount + pageSize.value);
});

const form = reactive({
  _id: "",
  // userImg: [],
  name: "",
  account: "",
  cellPhone: "",
  email: "",
  birthday: "",

  // valid: false,
  loading: false,
  // dialog: false,
});
// const handleChange = (options) => {
//   console.log(options.fileList);
//   let i = [];
//   let j = [];
//   i = options.fileList.map((image) => image.url).filter((url) => url !== null);
//   j = options.fileList.map((image) => image.file).filter((url) => url !== null);
//   form.img = [...i, ...j];
// };

const openDialog = (idx) => {
  // originalImg.value.length = 0;

  form._id = users[idx]._id;
  // form.userImg = users[idx].userImg;
  form.name = users[idx].name;
  form.account = users[idx].account;
  form.cellPhone = users[idx].cellPhone;
  form.email = users[idx].email;
  form.birthday = users[idx].birthday;

  form.valid = false;
  form.loading = false;

  // originalImg.value.push(
  //   ...form.userImg.map((image, idx) => {
  //     return {
  //       id: idx.toString(),
  //       name: idx.toString(),
  //       status: "finished",
  //       url: image,
  //     };
  //   })
  // );

  showModal.value = !showModal.value;
};

const cancel = () => {
  showModal.value = false;
};
//
const submit = async () => {
  // fd.append(key,value)

  const fd = new FormData();

  fd.append("name", form.name);
  // if (form.userImg.length >= 1) {
  //   form.userImg.forEach((item) => {
  //     fd.append("userImg", item);
  //   });
  // }
  if (form.birthday === null) {
    form.birthday = undefined;
  }
  fd.append("account", form.account);
  fd.append("cellPhone", form.cellPhone);
  fd.append("email", form.email);
  fd.append("birthday", form.birthday);

  try {
    const { data } = await apiAuth.patch("/users/" + form._id, fd);
    users[form.idx] = data.result;
    Swal.fire({
      icon: "success",
      title: "成功",
      text: "編輯成功",
    });
    // form.dialog = false;
    router.go();
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
  form.loading = false;
  showModal.value = false;
};

// 立即執行
(async () => {
  try {
    const { data } = await apiAuth.get("/users");
    users.push(...data.result);

    pageCount.value = Math.ceil(users.length / pageSize.value);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
</script>
