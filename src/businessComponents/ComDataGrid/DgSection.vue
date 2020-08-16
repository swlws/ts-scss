<template>
  <div style="box-si;width: 100%;height: 100%;">
    <base-data-grid
      :columns="realColumns"
      :data="realData"
      :height="realHeihgt"
    />
  </div>
</template>

<script>
export default {
  name: "DgSection",
  props: {
    config: {
      type: Object,
      default: () => ({
        height: "100%",
        data: [], // 表格数据
        columns: [] // 字段渲染方式定义
      })
    }
  },
  computed: {
    realData() {
      const { data = [] } = this.config || {};

      return Array.isArray(data) ? data : [];
    },
    realColumns() {
      const { columns = [] } = this.config || {};

      return Array.isArray(columns) ? columns : [];
    },
    realHeihgt() {
      const { height = "" } = this.config || {};

      return height || "100%";
    }
  }
};
</script>
