<template>
  <base-pagination
    :total="config.total"
    :page-size.sync="config.pageSize"
    :page-num.sync="config.pageNum"
    @change="changeEvent"
  />
</template>

<script>
export default {
  name: "DgFooter",
  props: {
    config: {
      show: true,
      total: 100,
      pageSize: 10,
      pageNum: 1
    }
  },
  methods: {
    changeEvent(pageNum, pageSize) {
      this.$emit("change", pageNum, pageSize);
    }
  }
};
</script>
