<template>
  <div class="member-img">
    <n-space>
      <n-avatar
        round
        :src="
          user.userImg ||
          `https://source.boringavatars.com/beam/512/${user.account}?colors=#FFF7C6,#FFC6A5,#E6324B,#093D64,#FEFF00`
        "
      />

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
          max="1"
          v-model:value="form.userImg"
          :default-file-list="originalImg"
          @change="handleChange"
        />
        <!--     accept=".jpg,.jpeg,.png,.gif,.tiff,.svg" -->
        <!-- @preview="handlePreview" -->
      </n-form-item-row>
      <n-button :disabled="form.loading" quaternary type="submit" @click="save"
        >上傳
      </n-button>
    </n-form>
  </n-modal>

  <div class="member-data">
    <n-form ref="valid" :model="form" :rules="rules">
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
          <n-input v-model:value="form.birthday" placeholder="生日xxxx/xx/xx"></n-input>
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
            :disabled="true"
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
  height: 55vh;
  .n-input {
    width: 27vw;
  }
  .n-input {
    --n-caret-color: #fd784eff !important;
    --n-border-hover: 1px solid #fd784eff !important;
    --n-border-focus: 1px solid #fd784eff !important;
    --n-box-shadow-focus: 0 0 0 2px rgba(254, 170, 145, 0.2) !important;
    --n-border-radius: 12px !important;
  }
  .n-form-item-feedback-wrapper {
    grid-area: none;
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
  margin-bottom: 100px;
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
    margin-top: 1vw;

    height: 25vh;
    justify-content: center;
    .n-space {
      align-items: flex-end;
    }
  }
  .member-data {
    margin-top: 50px;
  height: 50vh;

    .n-input {
      width: 35vw;
    }
  }
}
@media (max-width: 545px) {
  .member-img {
    margin-top: 1.5vw;
  }
}
</style>

<script setup>
import { CreateOutline } from "@vicons/ionicons5";
import { ref, reactive } from "vue";
import { apiAuth } from "@/plugins/axios";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import validator from "validator";

const valid = ref(null);

const user = useUserStore();
const router = useRouter();
const showModal = ref(false);
const originalImg = ref([]);
// console.log(user);

const form = reactive({
  loading: false,
  _id: null,
  name: null,
  account: null,
  email: null,
  birthday: null,
  cellPhone: null,
  userImg: [],
});

const rules = {
  name: [
    {
      required: true,
      message: "請輸入名稱",
    },
  ],
  email: [
    {
      required: true,
      message: "請輸入email",
    },
    {
      validator: validateEmail,
      message: "email格式錯誤",
      trigger: "input",
    },
  ],
  cellPhone: [
    {
      required: true,
      validator(rule, value) {
        return value.length == 10;
      },
      message: "請輸入10碼手機號碼",
      trigger: "input",
    },
  ],
};

function validateEmail(rule, value) {
  return validator.isEmail(value);
}

const handleChange = (options) => {
  form.userImg.length = 0;
  form.userImg.push(...options.fileList.map((image) => image.file));

};
const openDialog = () => {
  form.loading = false;
  showModal.value = !showModal.value;
};

const save = () => {
  originalImg.value.push(
    ...form.userImg.map((image, idx) => {
      return {
        id: idx.toString(),
        name: idx.toString(),
        status: "finished",
        url: image,
      };
    })
  );
  showModal.value = !showModal.value;
};

const submit = async () => {
  const fd = new FormData();
  if (form.birthday === null) {
    form.birthday = undefined;
  }
  if (form.userImg.length > 0) {
    fd.append("userImg", form.userImg[0]);
  }
  fd.append("name", form.name);
  fd.append("email", form.email);
  fd.append("birthday", form.birthday);
  fd.append("cellPhone", form.cellPhone);
  fd.append("account", form.account);

  try {
    const { data } = await apiAuth.patch("/users/me", fd);
    InatialForm(data);
    user.userImg = data.result.userImg;
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
    clearImgUrl();
  }

  form.loading = false;
};

// 立即執行
(async () => {
  try {
    const { data } = await apiAuth.get("/users/me");
    InatialForm(data);
    // console.log(data.result);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生錯誤",
    });
  }
})();
function clearImgUrl() {
  form.userImg.length = 0;
  originalImg.value.length = 0;
}
function InatialForm(data) {
  form._id = data.result._id;
  form.name = data.result.name;
  form.account = data.result.account;
  form.email = data.result.email;
  form.birthday = data.result.birthday;
  form.cellPhone = data.result.cellPhone;
  clearImgUrl();
  form.userImg.push(data.result.userImg);
}
</script>
