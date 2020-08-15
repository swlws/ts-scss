<template>
  <div class="logo-box"></div>
</template>

<script>
export default {
  name: "headerLogo"
};
</script>

<style lang="scss" scoped>
.logo-box {
  height: 100%;
  width: 100%;
  background-image: url("/imgs/logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
