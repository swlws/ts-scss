<template>
  <aside class="aside-info">
    <header>
      <i class="iconfont icon-map-filling"></i>
    </header>
    <section>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </section>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState({
    breadcrumb: state => (state as any).menuStore.breadCrumb
  })
})
export default class AsideInfo extends Vue {}
</script>

<style lang="scss" scoped>
.aside-info {
  padding: 10px 60px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  > header {
    width: 25px;

    > i {
      font-size: 20px;
      color: rgba($color: #000000, $alpha: 1);
    }
  }

  > section {
    flex: 1;
  }
}
</style>
