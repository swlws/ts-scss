<template>
  <div class="menu-wrap-box">
    <section class="menu-box">
      <nav
        v-for="(item, index) in menu"
        :key="index"
        :class="{ 'nav-selected': index === selectedItemIndex }"
        @click="clickEvent(index)"
      >
        {{ item.label }}
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  name: "topMenu",
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    selectedItemIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    clickEvent(index) {
      this.$emit("change", index);
    }
  }
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

    nav {
      font-size: 16px;
      color: #fff;
      padding: 10px 20px;
      border-bottom: 2px solid transparent;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        color: #000;
      }
    }
    .nav-selected {
      border-color: #fff;
      color: #000;
    }
  }
}
</style>
