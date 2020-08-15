<template>
  <div class="base-input-box">
    <el-input
      v-model="pValue"
      size="mini"
      style="width: 100px;"
      :placeholder="name"
      @change="changeEvent"
    />
    <i @click.stop="closeEvent" class="icon el-icon-circle-close"></i>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pOldValue: this.value, // 旧值
      pValue: this.value // 当前值
    };
  },
  methods: {
    closeEvent() {
      this.$emit("close", Object.freeze(this.$props));
    },
    changeEvent(value) {
      this.$emit("change", value, this.pOldValue);
      this.$emit("update:value", value);

      this.pOldValue = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.base-input-box {
  font-size: 12px;

  .icon {
    display: inline-block;
    margin: 0px 0px 0px 10px;
    width: 20px;
    cursor: pointer;
  }
}
</style>
