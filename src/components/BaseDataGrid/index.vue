<template>
  <div class="data-grid-body-wrap">
    <el-table
      ref="elTableRef"
      :data="data"
      :highlight-current-row="true"
      style="width:100%;"
      :height="height"
      @select="(data) => this.$emit('select', data)"
      @select-all="(data) => this.$emit('select-all', data)"
      @row-click="(row) => this.$emit('row-click', row)"
      @row-dblclick="(row) => this.$emit('row-db-click', row)"
      @sort-change="({column, prop, order}) => this.$emit('sort-change', column, prop, order)"
      size="medium"
    >
      <!-- 遍历父组件传入的列属性 -->
      <template v-for="(item, index) of renderColumns">
        <!-- expand列 -->
        <component
          v-if="item.type==='expand'"
          :key="index"
          :is="'el-table-column'"
          :type="item.type"
          :min-width="item.width"
          :label="item.label "
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
          :label="item.label || 'index'"
          :prop="item.prop"
          :align="item.align"
          :header-align="item.header_align"
          :formatter="item.formatter"
          :sortable="item.sortable"
          :show-overflow-tooltip="true"
          :index="indexFormatter"
          :min-width="item.width"
        ></component>
      </template>

      <el-table-column fixed="right" :width="50">
        <template slot="header">
          <ColumnControl
            :control-columns="controlColumns"
            @toggle-field-event="toggleFieldEvent"
          />
        </template>
      </el-table-column>

      <template slot="empty">
        nothing
      </template>
    </el-table>
  </div>
</template>
<script>
import ColumnControl from './columnControl';

export default {
  name: 'BaseDataGrid',
  components: {
    ColumnControl,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [String, Number, null],
      default: '100%',
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
    	checkedProps: new Set(this.columns.reduce((pre, next) => {
    		pre.push(next.prop)
    	},[]));
    };
  },
  methods: {
    toggleFieldEvent(prop) {
    	let checkedProps = this.checkedProps;
      checkedProps.has(prop) ? checkedProps.delete(prop) : checkedProps.add(prop);
    },
    indexFormatter(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
  },
  computed: {
  	renderColumns(){
  		let tmp = {...this.columns};
  		return tmp.filter(item => {
  			return this.checkedProps.includes(item.prop)；
  		})
  	},
  	controlColumns(){
  		let tmp = {...this.columns};
  		return tmp.map(({prop, label}) => {
  			return {prop, label}
  		})
  	},
  }
};
</script>
<style scoped>
.data-grid-body-wrap {
  height: 100%;
  width: 100%;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .data-grid-body-wrap {
    position: absolute;
  }
}
.data-grid-table-expand {
  font-size: 0;
}
.data-grid-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.data-grid-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  font-weight: bold;
}
</style>
