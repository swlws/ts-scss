<template>
  <div class="v2-datagrid-box">
    <header>
      <base-input
        :id="inputConfig.id"
        :value.sync="inputConfig.value"
        :name="inputConfig.name"
      />

      <base-select
        :id="selectConfig.id"
        :value.sync="selectConfig.value"
        :name="selectConfig.name"
        :options="selectConfig.options"
      />
    </header>

    <section>
      <base-data-grid :data="data" :columns="columns" />
    </section>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseFormItem/BaseInput";
import BaseSelect from "@/components/BaseFormItem/BaseSelect";

export default {
  name: "Datagrid",
  components: { BaseInput, BaseSelect },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 20
        },
        {
          type: "index",
          width: 80
        },
        {
          prop: "a",
          label: "Label A",
          width: 80
        },
        {
          prop: "b",
          label: "Label B",
          width: 200
        },
        {
          prop: "c",
          label: "Label C",
          width: 80
        }
      ],
      data: [
        { a: "a", b: "b", c: "c" },
        { a: "a", b: "b", c: "c" },
        { a: "a", b: "b", c: "c" }
      ],
      inputConfig: {
        id: "name",
        name: "姓名",
        value: ""
      },
      selectConfig: {
        id: "name",
        name: "属性",
        value: [],
        options: [
          {
            prop: 0,
            label: "name"
          },
          {
            prop: 1,
            label: "sex"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.v2-datagrid-box {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  header {
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  section {
    flex: 1;
  }
}
</style>
