<template>
  <div>
    <el-button
      v-for="(item, index) in data"
      :key="index"
      @click="clickEvent(item)"
      type="primary"
      size="mini"
      >{{ item.label }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: "OpGroup",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickEvent(item) {
      typeof item.handler === "function" ? item.handler.call(null) : "";
    }
  }
};
</script>
