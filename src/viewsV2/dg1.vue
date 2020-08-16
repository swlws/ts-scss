<template>
  <div class="v2-datagrid-box">
    <header>
      <base-input
        :id="inputConfig.id"
        :value.sync="inputConfig.value"
        :name="inputConfig.name"
      />

      <base-input-scope
        :id="inputScopeConfig.id"
        :value.sync="inputScopeConfig.value"
        :name="inputScopeConfig.name"
      />

      <base-select
        :id="selectConfig.id"
        :value.sync="selectConfig.value"
        :name="selectConfig.name"
        :options="selectConfig.options"
      />

      <base-date
        :id="dateConfig.id"
        :value.sync="dateConfig.value"
        :name="dateConfig.name"
      />

      <base-date-scope
        :id="dateScopeConfig.id"
        :value.sync="dateScopeConfig.value"
        :name="dateScopeConfig.name"
      />
    </header>

    <section>
      <base-data-grid :data="data" :columns="columns" />
    </section>
    <base-pagination
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :page-num="pagination.pageNum"
    />
  </div>
</template>

<script>
import BaseInput from "@/components/BaseFormItem/BaseInput";
import BaseInputScope from "@/components/BaseFormItem/BaseInputScope";
import BaseSelect from "@/components/BaseFormItem/BaseSelect";
import BaseDate from "@/components/BaseFormItem/BaseDate";
import BaseDateScope from "@/components/BaseFormItem/BaseDateScope";
import BasePagination from "@/components/BasePagination";

export default {
  name: "Datagrid",
  components: {
    BaseInput,
    BaseInputScope,
    BaseSelect,
    BaseDate,
    BaseDateScope,
    BasePagination
  },
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
        id: "input",
        name: "输入框",
        value: ""
      },
      inputScopeConfig: {
        id: "inputScope",
        name: "输入范围框",
        value: []
      },
      selectConfig: {
        id: "select",
        name: "多选列表",
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
      },
      dateConfig: {
        id: "date",
        name: "日期",
        value: ""
      },
      dateScopeConfig: {
        id: "dateScope",
        name: "日期范围",
        value: []
      },
      pagination: {
        total: 100,
        pageSize: 5,
        pageNum: 1
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
