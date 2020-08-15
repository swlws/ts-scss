<template>
  <el-input
    class="base-input-box"
    v-model="pValue"
    size="mini"
    :placeholder="name"
    @change="changeEvent"
  />
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
  width: 150px;
}
</style>
