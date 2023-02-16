<template>
  <div class="member-img">
    <n-space>
      <n-avatar round :src="showImg()" />

      <n-button quaternary circle @click="openDialog()">
        <template #icon>
          <n-icon><CreateOutline /></n-icon>
        </template>
      </n-button>
    </n-space>
  </div>

  <n-modal
    style="width: 20vw"
    v-model:show="showModal"
    preset="card"
    title="會員圖片"
    :trap-focus="false"
  >
    <n-form ref="valid" :model="form">
      <n-form-item-row label="新增照片: " path="img">
        <n-upload
          list-type="image-card"
          v-model:value="form.userImg"
          :default-file-list="originalImg"
          @change="handleChange"
        />
        <!--     accept=".jpg,.jpeg,.png,.gif,.tiff,.svg" -->
        <!-- @preview="handlePreview" -->
      </n-form-item-row>
      <n-button
        :disabled="form.loading"
        quaternary
        type="submit"
        @click="submit"
        >儲存
      </n-button>
    </n-form>
  </n-modal>

  <div class="member-data">
    <n-form ref="valid" :model="form">
      <n-form-item-row>
        <n-form-item label="會員名稱: " path="name">
          <n-input v-model:value="form.name" placeholder="會員名稱"></n-input>
        </n-form-item>

        <n-form-item label="電子信箱: " path="email">
          <n-input v-model:value="form.email" placeholder="電子信箱"></n-input>
        </n-form-item>
      </n-form-item-row>

      <n-form-item-row>
        <n-form-item label="生日: " path="birthday">
          <n-input v-model:value="form.birthday" placeholder="生日"></n-input>
        </n-form-item>

        <n-form-item label="手機號碼: " path="cellPhone">
          <n-input
            v-model:value="form.cellPhone"
            placeholder="手機號碼"
          ></n-input>
        </n-form-item>
      </n-form-item-row>

      <n-form-item-row class="account">
        <n-form-item label="帳號: " path="account">
          <n-input
            v-model:value="form.account"
            placeholder="帳號不可改"
            :disabled="!active"
          ></n-input>
        </n-form-item>
        <n-form-item label="為了排版: " style="visibility: hidden">
          <n-input placeholder="為了排版"></n-input>
        </n-form-item>
      </n-form-item-row>
    </n-form>
  </div>
  <n-button
    :disabled="form.loading"
    ghost
    class="finish"
    @click="submit"
    type="submit"
  >
    確認修改
  </n-button>
</template>

<style lang="scss">
.member-img {
  margin-top: 1vw;
  margin-bottom: 5vw;

  height: calc(30vh - 5vw);
  display: flex;
  justify-content: center;
  .n-space {
    align-items: flex-end;
  }
  .n-avatar {
    width: 13vw;
    height: 13vw;
    min-width: 180px;
    min-height: 180px;
    max-width: 280px;
    max-height: 280px;
  }

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
.member-data {
  margin: 2vw 10vw 0 10vw;
  height: 45vh;
  .n-input {
    width: 27vw;
  }
  .n-form-item-blank {
    justify-content: space-around;
  }
}

.finish {
  display: flex;
  margin: auto;
  width: 100px;
  height: 40px;
  font-size: 18px;
  border-radius: 20px;
  --n-text-color-hover: rgb(252, 170, 145) !important;
  --n-text-color-pressed: #fd784eff !important;
  --n-text-color-focus: rgb(0, 0, 0) !important;

  --n-ripple-color: rgb(139, 38, 4) !important;
  --n-border: 3px solid rgb(255, 227, 218) !important;
  --n-border-hover: 3px solid rgb(252, 170, 145) !important;
  --n-border-pressed: 3px solid #fd784e !important;
  --n-border-focus: 2px solid rgb(255, 227, 218) !important;
}

@media (max-width: 768px) {
  .member-img {
    margin-top: 0px;
    height: 25vh;
    justify-content: center;
    .n-space {
      align-items: flex-end;
    }
  }
  .member-data {
    margin-top: 50px;
    .n-input {
      width: 35vw;
    }
  }
}
@media (max-width: 545px) {
}
</style>

<script setup>
import { CreateOutline } from "@vicons/ionicons5";
import { ref, reactive } from "vue";
import { apiAuth } from "@/plugins/axios";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const users = reactive([]);
const valid = ref(null);

const user = useUserStore();
const route = useRouter();
const showModal = ref(false);
const originalImg = ref([]);
// console.log(user);

const showImg = () => {
  if ((user.userImg = [])) {
    return (user.userImg = `https://source.boringavatars.com/beam/512/${user.account}?colors=#FFF7C6,#FFC6A5,#E6324B,#093D64,#FEFF00`);
  }
};

const form = reactive({

  name: user.name,
  email: user.email,
  birthday: user.birthday,
  cellPhone: user.cellPhone,
  account: user.account,
  userImg: [],
  loading: false,
});
const handleChange = (o) => {
  form.userImg = o.fileList.map((userImg) => userImg.file);
};
const openDialog = () => {
  form.userImg = users.userImg;
  form.loading = false;
  showModal.value = !showModal.value;
};

const submit = async () => {}


// 立即執行
// (async () => {
//   try {
//     const { data } = await apiAuth.get("/users/me");
//     users.push(...data.result);
//     // console.log(data.result);
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "失敗",
//       text: error?.response?.data?.message || "發生錯誤",
//     });
//   }
// })();
</script>
