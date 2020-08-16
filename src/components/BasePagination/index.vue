<template>
  <el-pagination
    class="pagination"
    size="mini"
    :page-sizes="pageSizes"
    :current-page="pageNum"
    :page-size="pageSize"
    :total="total"
    layout="prev, pager, next,sizes, jumper"
    @size-change="sizeChangeEvent"
    @current-change="currentChangeEvent"
  ></el-pagination>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100, 200]
    };
  },
  methods: {
    sizeChangeEvent(pageSize) {
      this.$emit("update:page-size", pageSize);
      this.$emit("change");
    },
    currentChangeEvent(pageNum) {
      this.$emit("update:page-num", pageNum);
      this.$emit("change");
    }
  }
};
</script>
