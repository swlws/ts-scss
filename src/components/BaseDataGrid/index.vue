<template>
  <div class="com-data-grid-box">
    <section>
      <dg-section :config="bodyConfig" :index-begin="indexBegin" />
    </section>

    <footer>
      <dg-footer :config="pageConfig" @change="pageChangeEvent" />
    </footer>
  </div>
</template>

<script>
import DgSection from "./DgSection";
import DgFooter from "./DgFooter";

export default {
  name: "BaseDataGrid",
  props: {
    bodyConfig: {
      type: Object,
      default: () => ({
        height: "100%",
        data: [], // 表格数据
        columns: [] // 字段渲染方式定义
      })
    },
    pageConfig: {
      type: Object,
      default: () => ({
        show: true,
        total: 0,
        pageSize: 10,
        pageNum: 1
      })
    }
  },
  components: {
    DgSection,
    DgFooter
  },
  methods: {
    pageChangeEvent() {
      this.$nextTick(function() {
        const { pageNum, pageSize } = this.pageConfig;
        this.$emit("page-change", pageNum, pageSize);
      });
    }
  },
  computed: {
    indexBegin() {
      return (this.pageConfig.pageNum - 1) * this.pageConfig.pageSize;
    }
  }
};
</script>

<style lang="scss" scoped>
.com-data-grid-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > section {
    flex: auto;
  }
  > footer {
    text-align: right;
    padding-top: 5px;
    height: 40px;
  }
}
</style>
