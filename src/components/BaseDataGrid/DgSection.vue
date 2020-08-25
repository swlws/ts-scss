<template>
  <div style="width: 100%;height: 100%;">
    <base-grid
      :columns="config.columns"
      :data="config.data"
      :height="config.heihgt"
      :index-begin="indexBegin"
      @select="data => this.$emit('select', data)"
      @select-all="data => this.$emit('select-all', data)"
      @row-click="row => this.$emit('row-click', row)"
      @row-dblclick="row => this.$emit('row-db-click', row)"
      @sort-change="({ column, prop, order }) =>this.$emit('sort-change', column, prop, order)"
    />
  </div>
</template>

<script>
import BaseGrid from "./BaseGrid";

export default {
  name: "DgSection",
  components: {
    BaseGrid
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        height: "100%",
        data: [], // 表格数据
        columns: [] // 字段渲染方式定义
      })
    },
    indexBegin: {
      type: Number,
      default: 0
    }
  },
};
</script>
