<template>
  <div class="dg2-box">
    <com-data-grid
      :search-config="searchConfig"
      :body-config="bodyConfig"
      :page-config="pageConfig"
    />
  </div>
</template>

<script>
import ComDataGrid from "@/businessComponents/ComDataGrid";

export default {
  name: "dg2",
  components: {
    ComDataGrid
  },
  data() {
    return {
      searchConfig: {
        show: true,
        list: [
          {
            type: 0,
            id: "input",
            name: "输入框",
            value: ""
          },
          {
            type: 1,
            id: "inputScope",
            name: "输入范围框",
            value: []
          },
          {
            type: 2,
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
          {
            type: 3,
            id: "date",
            name: "日期",
            value: ""
          },
          {
            type: 4,
            id: "dateScope",
            name: "日期范围",
            value: []
          }
        ]
      },
      bodyConfig: {
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
        ]
      },
      pageConfig: {
        show: true,
        total: 100,
        pageNum: 1,
        pageSize: 10
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.dg2-box {
  width: 100%;
  height: 100%;
}
</style>
