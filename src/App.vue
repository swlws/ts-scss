<template>
  <div id="app">
    <!-- <header>
      <nav>
        <router-link :to="{ path: '/' }">home</router-link>
      </nav>
      <nav>
        <router-link :to="{ path: '/scss' }">scss</router-link>
      </nav>
    </header> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid #e8e8e8;
    nav {
      margin: 0px 10px;
      font-size: 16px;
      font-weight: bolder;
    }
  }
}
</style>
