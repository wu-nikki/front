
  <template>
  <n-card title="带封面的卡片">
    <template #header-extra> #header-extra </template>
    <template #cover>
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    </template>
    卡片内容

    <template #footer> #footer </template>
    
  </n-card>
</template>
  <!-- <n-h2>{{ user.name }}</n-h2> -->


<style lang="scss">
.n-card {
  max-width: 300px;
}
</style>

<script setup>
import { useUserStore } from "@/stores/user";
const user = useUserStore();

// {
//   "_id": {
//     "$oid": "63d9172425a8467587909e3f"
//   },
//   "img": "https://www.pet.gov.tw/upload/pic/1675160685885.png",
//   "size": "中型",
//   "color": "黑黃色",
//   "variety": "米克斯",
//   "gender": "母",
//   "kind": "貓",
//   "opendate": "2023-01-18",
//   "sterilization": "已絕育",
//   "age": "成年",
//   "subid": "111112602",
//   "status": "開放認養",
//   "shelterName": {
//     "$oid": "63d9170ba38a09fc8c1ad9be"
//   },
//   "remark": "---"
// }

defineProps({
  /* eslint-disable */
  _id: {
    type: String,
    default: "",
  },
  /* eslint-enable */
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  sell: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: "",
  },
});
</script>
