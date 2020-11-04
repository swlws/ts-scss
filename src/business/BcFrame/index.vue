<template>
  <article class="bc-frame">
    <header-info />

    <aside-info />

    <section>
      <router-view></router-view>
    </section>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from "vuex";
import HeaderInfo from "./HeaderInfo.vue";
import AsideInfo from "./AsideInfo.vue";

@Component({
  components: {
    HeaderInfo,
    AsideInfo
  },
  methods: mapActions(["queryMenu"])
})
export default class BcFrame extends Vue {
  queryMenu!: (fn: Function) => {};

  created() {
    this.queryMenu(this.$api.home.menu);
  }
}
</script>

<style lang="scss" scoped>
.bc-frame {
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  > header {
    height: 60px;
  }
  > aside {
    height: 30px;
  }

  > section {
    padding: 5px 10px;

    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
