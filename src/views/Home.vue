<template>
  <div class="home">
    <h3 style="text-align: center;">首页</h3>
    <div>国际化： {{ $t("name") }}</div>
    <div a="123" b="c">mapGetters: {{ cfg }}</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { post as axiosPost } from "@/api/httplib";

export default {
  name: "Home",
  created() {
    this.$t("123");
    this.$api.home.getName();
    this.$api.home.getAge({ name: "swl" });
    this.$api.home.userList();

    this.$api.home.getTest();
  },
  methods: {
    ...mapMutations(["add"])
  },
  computed: {
    ...mapGetters(["cfg"])
  }
};
</script>
