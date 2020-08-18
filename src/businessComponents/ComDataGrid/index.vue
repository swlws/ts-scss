<template>
  <div class="com-data-grid-box">
    <header>
      <DgHeader :config="pHeaderConfig" @change="searchChangeEvent" />
    </header>

    <section>
      <dg-section :config="pSectionConfig" :index-begin="indexBegin" />
    </section>

    <footer>
      <dg-footer :config="pFooterConfig" @change="pageChangeEvent" />
    </footer>
  </div>
</template>

<script>
import DgHeader from "./DgHeader";
import DgSection from "./DgSection";
import DgFooter from "./DgFooter";

export default {
  name: "ComDataGrid",
  props: {
    searchConfig: {
      type: Object,
      default: () => ({
        show: true,
        list: [] // 查询字段配置信息
      })
    },
    bodyConfig: {
      type: Object,
      default: () => ({
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
    DgHeader,
    DgSection,
    DgFooter
  },
  methods: {
    searchChangeEvent() {
      this.$nextTick(function() {
        console.log(
          `[From: Search Field] [Event: Change] [Next Action: Load data]`
        );
        const param = this.collectParam();
        console.log(`[Param: ${JSON.stringify(param)}]`);

        this.$emit("change");
      });
    },
    pageChangeEvent() {
      this.$nextTick(function() {
        console.log(
          `[From: Pagination] [Event: Change] [Next Action: Load data]`
        );

        const param = this.collectParam();
        console.log(`[Param: ${JSON.stringify(param)}]`);
        this.$emit("change");
      });
    },
    collectParam() {
      const list = (this.pHeaderConfig || {}).list || {};
      const param = list.reduce((pre, next) => {
        pre[next.id] = next.value || "";
        return pre;
      }, {});

      const { pageNum, pageSize } = this.pFooterConfig;

      return Object.assign({}, param, {
        pageNum,
        pageSize
      });
    }
  },
  computed: {
    pHeaderConfig() {
      let { show = true, list = [] } = this.searchConfig || {};

      show = typeof show === "boolean" ? show : true;
      list = Array.isArray(list) ? list : [];

      return {
        show,
        list
      };
    },
    pSectionConfig() {
      let { data = [], columns = [] } = this.bodyConfig || {};
      data = Array.isArray(data) ? data : [];
      columns = Array.isArray(columns) ? columns : [];

      return {
        data,
        columns
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
    indexBegin(){
      return ( this.pFooterConfig.pageNum -1 ) * this.pFooterConfig.pageSize;
    }
  }
};
</script>

<style lang="scss" scoped>
.com-data-grid-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  > header {
    margin: 10px 0px;
  }
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
