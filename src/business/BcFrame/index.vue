<template>
  <article>
    <header-info />

    <aside>
      面包屑
    </aside>

    <section>
      <router-view></router-view>
    </section>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from "vuex";
import HeaderInfo from "./HeaderInfo.vue";

@Component({
  components: {
    HeaderInfo
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
