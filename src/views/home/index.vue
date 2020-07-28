<template>
  <div class="home-box">
    <header>
      <header>
        <header-logo />
      </header>
      <section>
        <header-menu />
      </section>
      <footer></footer>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import HeaderLogo from "./headerLogo";
import HeaderMenu from "./headerMenu";

export default {
  name: "home",
  components: {
    HeaderLogo,
    HeaderMenu
  }
};
</script>

<style lang="scss" scoped>
.home-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > header {
    height: 50px;
    background: #00b1fd linear-gradient(-90deg, #0072f3, #00b1fd);
    display: flex;

    header {
      width: 200px;
      height: 100%;
    }
    section {
      flex: 1;
    }
    footer {
      width: 200px;
      height: 100%;
    }
  }

  > section {
    flex: 1;
  }
}
</style>
