<template>
  <div class="menu-wrap-box">
    <section class="menu-box">
      <menu-item
        v-for="(item, index) in menu"
        :key="index"
        :info="item"
        :index="'' + index"
        :checked-index.sync="checkedIndex"
      />
    </section>
  </div>
</template>

<script>
import MenuItem from "./topMenuItem";

export default {
  name: "topMenu",
  components: {
    MenuItem
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedIndex: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu-wrap-box {
  height: 100%;

  .menu-box {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
