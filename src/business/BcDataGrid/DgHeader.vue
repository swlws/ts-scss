<template>
  <div class="dg-header-box">
    <header>
      <div>
        <component
          v-for="(item, index) in realFixedList"
          :key="index"
          :is="item.$is"
          :id="item.id"
          :name="item.name"
          :value.sync="item.value"
          :options="item.options"
          :config="item.config"
          @change="changeEvent"
          @close="closeEvent"
        ></component>

        <more-field
          v-if="dyncList.length > 0"
          :value.sync="checkedFieldProps"
          :options="dyncList"
          :config="{ prop: 'id', label: 'name' }"
        />
      </div>
      <div>
        <op-group :data="realButtons" />
      </div>
    </header>

    <section>
      <component
        v-for="(item, index) in realDyncList"
        :key="index"
        :is="item.$is"
        :id="item.id"
        :name="item.name"
        :value.sync="item.value"
        :options="item.options"
        :config="item.config"
        @change="changeEvent"
        @close="closeEvent"
      ></component>
    </section>
  </div>
</template>

<script>
import MoreField from "./MoreField";
import OpGroup from "./OpGroup";
import BaseInput from "@/components/BaseFormItem/BaseInput";
import BaseInputScope from "@/components/BaseFormItem/BaseInputScope";
import BaseSelect from "@/components/BaseFormItem/BaseSelect";
import BaseDate from "@/components/BaseFormItem/BaseDate";
import BaseDateScope from "@/components/BaseFormItem/BaseDateScope";

export default {
  name: "DgHeader",
  components: {
    MoreField,
    OpGroup,
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
        list: [], // 查询字段配置信息
        buttons: [] // 操作按钮
      })
    }
  },
  data() {
    return {
      checkedFieldProps: [],
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
    },
    closeEvent(data) {
      const index = this.checkedFieldProps.indexOf(data.id);
      if (index !== -1) {
        this.checkedFieldProps.splice(index, 1);
      }
    },
    formatFields(list = []) {
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
  },
  computed: {
    fixedList() {
      const { list = [] } = this.config || {};
      return list.filter(item => item.fixed === true);
    },
    realFixedList() {
      return this.formatFields(this.fixedList);
    },
    dyncList() {
      const { list = [] } = this.config || {};
      return list.filter(item => item.fixed !== true);
    },
    realDyncList() {
      return this.formatFields(this.dyncList).filter(item =>
        this.checkedFieldProps.includes(item.id)
      );
    },
    realButtons() {
      const { buttons = [] } = this.config || {};

      return [...buttons];
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin horizontal-vertical-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin: 5px 0px;
  }
}

.dg-header-box {
  > header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    > div {
      @include horizontal-vertical-layout;
    }
  }

  > section {
    @include horizontal-vertical-layout;
  }
}
</style>
