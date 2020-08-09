<template>
  <div class="menu-item-box">
    <header :class="{ 'selected-nav': itemChecked }" @click="itemCheckedEvent">
      <span> {{ info.label }} </span>
      <base-svg-icon icon="arrow-down-bold" class="icon" />
    </header>
    <section v-if="itemChecked">
      <div class="recommend-box">
        <nav
          v-for="(item, index) in info.recommendList"
          :key="index"
          class="list-item"
          @click="navClick(item)"
        >
          <span> {{ item.label }} </span>
        </nav>
      </div>
      <div class="op-box">
        <nav
          v-for="(item, index) in info.opList"
          :key="index"
          class="list-item"
          @click="navClick(item)"
        >
          <span> {{ item.label }} </span>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import BaseSvgIcon from "@/components/BaseSvgIcon/index";

export default {
  name: "topMenuItem",
  components: { BaseSvgIcon },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: String,
      default: ""
    },
    checkedIndex: {
      type: String,
      default: ""
    }
  },
  methods: {
    itemCheckedEvent() {
      const { index, checkedIndex } = this;
      const checked = index === checkedIndex ? "" : index;

      this.$emit("update:checked-index", checked);
    },
    navClick(item) {
      console.log(item);
      this.$emit("update:checked-index", "");
    }
  },
  computed: {
    itemChecked() {
      return this.index === this.checkedIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-item-box {
  height: 100%;
  position: relative;

  header {
    height: 100%;
    line-height: 50px;
    margin: 0px 10px;
    font-size: 16px;
    color: #333333;
    cursor: pointer;

    .icon {
      font-size: 14px;
    }
  }

  section {
    position: absolute;
    top: 50px;
    left: 0px;
    width: 200px;
    margin: 5px 10px;
    padding: 10px 0px;
    box-shadow: 0px 0px 10px 1px #e8e8e8;
    transition: all 0.3s;

    .recommend-box {
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e8e8;
    }
    .op-box {
      padding-top: 10px;
    }

    .list-item {
      padding: 5px 0px;
      span {
        font-size: 14px;
        color: #333333;
        padding: 0px 20px;
      }

      &:hover {
        color: #999999;
        background-color: #f4f5f7;
        cursor: pointer;
      }
    }
  }
}
</style>
