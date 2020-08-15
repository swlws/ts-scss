<template>
  <div class="svg-box">
    <div v-for="(icon, index) in svgList" :key="index">
      <base-svg-icon :icon="icon" class="icon" />
      <span> {{ icon }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "svgIcon",
  data() {
    return {
      svgList: []
    };
  },
  created() {
    this.readSvg();
  },
  methods: {
    readSvg() {
      const res = [];
      const requireComponent = require.context("@/assets/svg", false, /\.svg$/);
      requireComponent.keys().forEach(fileName => {
        const key = fileName.replace(/(\.\/|\.svg)/g, "");
        res.push(key);
      });
      this.svgList = res;
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-box {
  margin: 20px 10%;

  > div {
    display: inline-block;
    height: 20px;
    font-size: 16px;
    margin: 5px 10px;
    padding: 5px;
    box-shadow: 0px 0px 5px 1px #ccc;
  }
}
</style>
