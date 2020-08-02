<template>
  <div class="home-box">
    <header>
      <header>
        <header-logo />
      </header>
      <section>
        <top-menu
          :menu="topMenu"
          :selected-item-index.sync="selectedTopMenuItemIndex"
          @change="topMenuChange"
        />
      </section>
      <footer></footer>
    </header>
    <article>
      <aside>
        <child-menu :menu="childMenuInfo" />
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderLogo from "./headerLogo";
import TopMenu from "./topMenu";
import ChildMenu from "./childMenu";

export default {
  name: "home",
  components: {
    HeaderLogo,
    TopMenu,
    ChildMenu
  },
  data() {
    return {
      selectedTopMenuItemIndex: 0
    };
  },
  created() {
    this.queryMenu(this.$api.home.menu);
  },
  methods: {
    ...mapActions(["queryMenu"]),
    topMenuChange(selecedItemIndex) {
      this.selectedTopMenuItemIndex = selecedItemIndex;
    }
  },
  computed: mapState({
    menu: state => state.appStore.menu,
    topMenu() {
      return this.menu.map(item => {
        const menu = { ...item };
        delete menu.child;

        return menu;
      });
    },
    childMenuInfo() {
      return (this.menu[this.selectedTopMenuItemIndex] || {}).child;
    }
  })
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
    z-index: 10;

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

  > article {
    z-index: 1;
    flex: 1;
    display: flex;
    overflow: auto;

    aside {
      height: 100%;
      width: 200px;
      overflow: auto;
    }
    section {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
