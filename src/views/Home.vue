<template>
  <div class="home">
    <h3 style="text-align: center;">首页</h3>
    <div>国际化： {{ $t("name") }}</div>
    <div>mapGetters: {{ cfg }}</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    this.$t("123");
  },
  methods: {
    ...mapMutations(["add"])
  },
  computed: {
    ...mapGetters(["cfg"])
  }
};
</script>
