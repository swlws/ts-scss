<template>
  <article class="base-nav">
    <aside>
      <i class="iconfont icon-home-filling" />
    </aside>

    <section>
      <first-nav
        :data="firstLevelMenuData"
        :check-id="firstLevelCheckId"
        @click="firstNavChangeEvent"
      />
    </section>

    <footer>
      <second-nav
        :data="secondLevelMenuData"
        :check-ids="checkIds"
        @nav-change="childNavChangeEvent"
      />
    </footer>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FirstNav from "./FirstNav.vue";
import SecondNav from "./SecondNav.vue";

@Component<BaseNav>({
  components: {
    FirstNav,
    SecondNav
  },
  watch: {
    secondLevelMenuData(newValue) {
      if (!newValue) return;
      if (!newValue[0]) return;

      let url = "";
      if (!newValue[0].child) {
        url = newValue[0].url;
      } else {
        url = (newValue[0].child[0] || {}).url;
      }

      // 需要判断当前路由与带跳转路由是否一样，否则会抱路由重复
      url && this.$route.path !== url ? this.$router.push(url) : "";
    },
    checkIds(newV) {
      this.$emit("change", newV);
    }
  }
})
export default class BaseNav extends Vue {
  @Prop(Array) data!: Menu[];

  // 一级菜单选中的索引
  firstLevelCheckId = "";
  // 二级菜单选中的索引
  secondLevelCheckId = "";
  // 三级菜单选中的索引
  thirdLevelCheckId = "";

  /**
   * 切换一级菜单时，重新计算默认选中的二级、三级菜单
   */
  initAllMenuByFirstLevelMenu(firstLevelCheckId = ""): string[] {
    if (!Array.isArray(this.data)) return ["", "", ""];

    let first;
    if (!firstLevelCheckId) {
      first = this.data[0] || {};
    } else {
      first = this.data.find(item => item.id === firstLevelCheckId) || {};
    }
    const second = (first.child || [])[0] || {};
    const third = (second.child || [])[0] || {};

    return [first.id || "", second.id || "", third.id || ""];
  }

  /**
   * 一级菜单切换时的响应事件
   */
  firstNavChangeEvent(firstLevelCheckId = ""): void {
    if (firstLevelCheckId === this.firstLevelCheckId) return;

    const ids = this.initAllMenuByFirstLevelMenu(firstLevelCheckId);
    this.firstLevelCheckId = ids[0];
    this.secondLevelCheckId = ids[1];
    this.thirdLevelCheckId = ids[2];
  }

  /**
   * 字菜单的点击响应事件
   */
  childNavChangeEvent(secondLevelCheckId = "", thirdLevelCheckId = "") {
    this.thirdLevelCheckId = thirdLevelCheckId;
    this.secondLevelCheckId = secondLevelCheckId;
  }

  /**
   * 过滤出一级菜单项
   */
  get firstLevelMenuData() {
    if (!Array.isArray(this.data)) return [];

    const arr: FreeObject[] = [];
    return this.data.reduce((arr, next) => {
      const { label, id } = next;

      arr.push({ label: label, id: id });
      return arr;
    }, arr);
  }

  /**
   * 过滤出子菜单项
   */
  get secondLevelMenuData() {
    if (!Array.isArray(this.data)) return [];

    const obj = this.data.find(item => item.id === this.firstLevelCheckId);

    return obj ? obj.child : [];
  }

  /**
   * 拼接当前处于选中的一级、二级、三级菜单的ID
   */
  get checkIds() {
    return [
      this.firstLevelCheckId,
      this.secondLevelCheckId,
      this.thirdLevelCheckId
    ];
  }
}
</script>

<style lang="scss" scoped>
.base-nav {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > aside {
    width: 50px;

    text-align: center;

    > i {
      font-size: 30px;
      color: #409eff;
    }
  }

  > section {
    width: 150px;
  }

  > footer {
    flex: 1;
  }
}
</style>
