<template>
  <div class="base-input-box">
    <el-date-picker
      v-model="pValue"
      type="date"
      size="mini"
      style="min-width: 50px;max-width:125px;"
      :placeholder="name"
      :format="format"
      :value-format="format"
      @change="changeEvent"
    />
    <i @click.stop="closeEvent" class="icon el-icon-circle-close"></i>
  </div>
</template>

<script>
export default {
  name: "BaseDate",
  props: {
    id: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      format: "yyyy-MM-dd",
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
