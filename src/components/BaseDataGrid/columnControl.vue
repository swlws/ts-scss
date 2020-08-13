<template>
  <el-popover placement="bottom-end" width="160" :visible-arrow="false">
    <ul class="sims-list">
      <li
        v-for="(item, index) in controlColumns"
        :key="index"
        @click="toggleFieldName(item.prop)"
      >
        <span style="width:14px;display: inline-block;">
          <i class="el-icon-check" size="mini" v-show="checkedProps.indexOf(item.prop) > -1"></i>
        </span>

        <span>{{item.label}}</span>
      </li>
    </ul>

    <base-svg-icon icon="arrow-down-bold" class="icon" />
  </el-popover>
</template>

<script>
export default {
  name: 'columnControl',
  props: {
    controlColumns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkedProps: new Set(this.controlColumns.reduce((pre, next) => {
        pre.push(next.prop)
      },[]));
    };
  },
  methods: {
    toggleFieldName(prop) {
      let checkedProps = this.checkedProps;
      checkedProps.has(prop) ? checkedProps.delete(prop) : checkedProps.add(prop);

      this.$emit('toggle-field-event', prop)
    },
  },
};
</script>
