<template>
  <div class="com-data-grid-box">
    <section>
      <dg-section
        :config="pSectionConfig"
        :index-begin="indexBegin"
        @select="checkEvent"
        @select-all="checkEvent"
        @row-click="row => this.$emit('row-click', row)"
        @row-dblclick="row => this.$emit('row-db-click', row)"
        @sort-change="
          ({ column, prop, order }) =>
            this.$emit('sort-change', column, prop, order)
        "
      />
    </section>

    <footer>
      <dg-footer :config="pFooterConfig" @change="pageChangeEvent" />
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
    checkEvent(data) {
      this.$emit("update:selection", data);
    },
    pageChangeEvent() {
      this.$nextTick(function() {
        const { pageNum, pageSize } = this.pageConfig;
        this.$emit("page-change", pageNum, pageSize);
      });
    }
  },
  computed: {
    pSectionConfig() {
      // eslint-disable-next-line
      let { data = [], columns = [], height = "100%" } = this.bodyConfig || {};
      data = Array.isArray(data) ? data : [];
      columns = Array.isArray(columns) ? columns : [];

      return {
        data,
        columns,
        height
      };
    },
    pFooterConfig() {
      let { show = true, total = 0, pageSize = 10, pageNum = 1 } =
        this.pageConfig || {};

      show = typeof show === "boolean" ? show : true;
      total = typeof total === "number" ? total : 0;
      pageSize = typeof pageSize === "number" ? pageSize : 10;
      pageNum = typeof pageNum === "number" ? pageNum : 1;

      return {
        show,
        total,
        pageSize,
        pageNum
      };
    },
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
