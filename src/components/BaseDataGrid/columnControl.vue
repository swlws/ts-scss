<template>
  <el-popover placement="bottom-end" width="160" :visible-arrow="false">
    <ul class="list-box">
      <li
        v-for="(item, index) in controlColumns"
        :key="index"
        @click="toggleFieldName(item.prop)"
      >
        <span style="width:14px;display: inline-block;">
          <i
            class="el-icon-check"
            size="mini"
            v-show="checkedProps.indexOf(item.prop) > -1"
          ></i>
        </span>

        <span>{{ item.label }}</span>
      </li>
    </ul>

    <base-svg-icon slot="reference" icon="menu" class="icon" />
  </el-popover>
</template>

<script>
export default {
  name: "columnControl",
  props: {
    controlColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedProps: this.controlColumns.reduce((pre, next) => {
        pre.push(next.prop);
        return pre;
      }, [])
    };
  },
  methods: {
    toggleFieldName(prop) {
      const checkedProps = this.checkedProps;

      const index = checkedProps.indexOf(prop);
      index > -1 ? checkedProps.splice(index, 1) : checkedProps.push(prop);

      this.$emit("toggle-field-event", prop);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-box {
  margin: 10px 0px;
  padding: 0px;
  li {
    list-style: none;
    cursor: pointer;

    &:hover {
      color: #001fae;
    }

    span {
      padding: 0px 3px;
    }
  }
}
.icon {
  font-size: 16px;
  cursor: pointer;
}
</style>
