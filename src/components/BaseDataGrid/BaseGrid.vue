<template>
  <div class="data-grid-body-wrap">
    <el-table
      ref="elTableRef"
      :data="data"
      :highlight-current-row="true"
      style="width:100%;"
      :height="height"
      @select="data => this.$emit('select', data)"
      @select-all="data => this.$emit('select-all', data)"
      @row-click="row => this.$emit('row-click', row)"
      @row-dblclick="row => this.$emit('row-db-click', row)"
      @sort-change="
        ({ column, prop, order }) =>
          this.$emit('sort-change', column, prop, order)
      "
      size="medium"
    >
      <!-- 遍历父组件传入的列属性 -->
      <template v-for="(item, index) of renderColumns">
        <!-- expand列 -->
        <component
          v-if="item.type === 'expand'"
          :key="index"
          :is="'el-table-column'"
          :type="item.type"
          :min-width="item.width"
          :label="item.label"
          :prop="item.prop"
          :formatter="item.formatter"
          :sortable="item.sortable"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="props">
            <slot name="expand" :row="props.row" />
          </template>
        </component>
        <!--普通列-->
        <component
          v-else
          :key="index"
          :is="'el-table-column'"
          :type="item.type"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :header-align="item.headerAlign"
          :formatter="item.formatter"
          :sortable="item.sortable"
          :show-overflow-tooltip="true"
          :index="indexFormatter"
          :min-width="item.width"
        ></component>
      </template>

      <el-table-column :min-width="50" header-align="right">
        <template slot="header">
          <column-control
            :control-columns="controlColumns"
            @toggle-field-event="toggleFieldEvent"
          />
        </template>
      </el-table-column>

      <template slot="empty">无数据</template>
    </el-table>
  </div>
</template>
<script>
import ColumnControl from "./ColumnControl";

export default {
  name: "BaseDataGrid",
  components: {
    ColumnControl
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number, null],
      default: "100%"
    },
    indexBegin: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      checkedProps: this.columns.reduce((pre, next) => {
        pre.push(next.prop);
        return pre;
      }, [])
    };
  },
  methods: {
    toggleFieldEvent(prop) {
      const checkedProps = this.checkedProps;
      const index = checkedProps.indexOf(prop);

      index > -1 ? checkedProps.splice(index, 1) : checkedProps.push(prop);
    },
    indexFormatter(index) {
      return this.indexBegin + index + 1;
    }
  },
  computed: {
    renderColumns() {
      const tmp = [...this.columns];
      return tmp.filter(item => {
        return !item.prop || this.checkedProps.indexOf(item.prop) > -1;
      });
    },
    controlColumns() {
      const tmp = [...this.columns];
      return tmp
        .map(({ prop, label }) => {
          return { prop, label };
        })
        .filter(({ prop }) => !!prop);
    }
  }
};
</script>
<style scoped lang="scss">
.data-grid-body-wrap {
  height: 100%;
  width: 100%;

  /deep/ .el-table th {
    height: 40px;
    color: #666666;
    background-color: #f6f6f8;
  }

  /deep/ .hover-row,
  /deep/ tr.hover-row > td {
    background-color: #d3ebff;
  }
  /deep/ .current-row {
    background-color: #4ea6ed;
  }
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .data-grid-body-wrap {
    position: absolute;
  }
}
</style>
