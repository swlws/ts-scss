<template>
  <base-pagination
    :total="config.total"
    :page-size.sync="config.pageSize"
    :page-num.sync="config.pageNum"
    @change="changeEvent"
  />
</template>

<script>
import BasePagination from './BasePagination';

export default {
  name: "DgFooter",
  components: {
    BasePagination
  },
  props: {
    config: {
      show: true,
      total: 100,
      pageSize: 10,
      pageNum: 1
    }
  },
  methods: {
    changeEvent( ) {
      this.$emit("change");
    }
  }
};
</script>
