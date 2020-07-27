<template>
  <div class="menu-box">
    <nav v-for="item in data" :key="item.label">
      {{ item.label }}
    </nav>
  </div>
</template>

<script>
export default {
  name: "headerMenu",
  data() {
    return {
      data: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$api.home.menu().then(res => {
        if (res && res.r0 === true) {
          this.data = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-box {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  nav {
    font-size: 16px;
    color: #fff;
    padding: 10px 20px;
    transition: all 0.3s;

    &:hover {
      cursor: pointer;
      color: #000;
    }
  }
}
</style>
