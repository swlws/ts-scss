<template>
  <header class="frame-header">
    <div class="nav-wrap">
      <base-nav :data="menu" />
    </div>

    <div class="alert-wrap">
      <el-badge :value="12" class="item">
        <i class="iconfont icon-notification-filling" />
      </el-badge>
    </div>

    <div class="user-wrap">
      <i class="iconfont icon-account" />
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState({
    menu: (state: any) => state.appStore.menu
  })
})
export default class HeaderInfo extends Vue {}
</script>

<style lang="scss" scoped>
.frame-header {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e8e8e8;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > .nav-wrap {
    flex: 1;
  }

  > .alert-wrap,
  > .user-wrap {
    width: 50px;

    > .item > i,
    > i {
      font-size: 25px;
    }
  }
}
</style>
