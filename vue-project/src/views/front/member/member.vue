<template>

<n-h1>{{ user.name }}</n-h1>
name
  account
  cellPhone
  email
  birthday

會員資料頁面  
</template>

<style lang="scss">

</style>

<script setup>

import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";

const user = useUserStore();
const route = useRoute();
</script>
