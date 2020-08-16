<template>
  <div class="dg-header-box">
    <component
      v-for="(item, index) in realFields"
      :key="index"
      :is="item.$is"
      :id="item.id"
      :name="item.name"
      :value.sync="item.value"
      :options="item.options"
      :config="item.config"
      @change="changeEvent"
    ></component>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseFormItem/BaseInput";
import BaseInputScope from "@/components/BaseFormItem/BaseInputScope";
import BaseSelect from "@/components/BaseFormItem/BaseSelect";
import BaseDate from "@/components/BaseFormItem/BaseDate";
import BaseDateScope from "@/components/BaseFormItem/BaseDateScope";

export default {
  name: "DgHeader",
  components: {
    BaseInput,
    BaseInputScope,
    BaseSelect,
    BaseDate,
    BaseDateScope
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        show: true,
        list: [] // 查询字段配置信息
      })
    }
  },
  data() {
    return {
      types: [
        "base-input",
        "base-input-scope",
        "base-select",
        "base-date",
        "base-date-scope"
      ]
    };
  },
  methods: {
    changeEvent() {
      this.$emit("change");
    }
  },
  computed: {
    realFields() {
      const { list = [] } = this.config || {};

      if (!Array.isArray(list) || list.length === 0) return [];

      const len = this.types.length;
      return list
        .filter(({ type }) => {
          const flag = typeof type;
          if (flag !== "number") return false;

          if (type < 0 || type >= len) return false;

          return true;
        })
        .map(item => {
          item.$is = this.types[item.type];
          return item;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.dg-header-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin: 5px 0px;
  }
}
</style>
