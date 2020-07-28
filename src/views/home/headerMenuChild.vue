<template>
  <div class="child-wrap-box">
    <article v-for="(item, index) in menu" :key="index">
      <aside>{{ item.label }}</aside>
      <section>
        <nav v-for="(nav, i) in item.child" :key="i">
          {{ nav.label }}
        </nav>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: "headerMenuChild",
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.child-wrap-box {
  box-shadow: 0px 0px 10px 1px #ccc;
  width: 500px;
  padding: 5px 0px;
  article {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;

    &:last-child {
      border-bottom: none;
    }

    aside {
      width: 100px;
      font-weight: bold;
      color: #666666;
      cursor: pointer;
    }
    section {
      color: #999999;
      flex: 1;
      display: flex;
      flex-wrap: wrap;

      nav {
        cursor: pointer;
        margin: 0px 10px 5px;

        &:hover {
          color: rgba(0, 0, 255, 0.8);
        }
      }
    }
  }
}
</style>
