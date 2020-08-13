<template>
  <base-data-grid :data="data" :columns="columns" height="auto" />
</template>

<script>
export default {
  name: "Datagrid",
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 20
        },
        {
          type: "index",
          width: 20
        },
        {
          prop: "a",
          label: "Label A",
          width: 20
        },
        {
          prop: "b",
          label: "Label B",
          width: 80
        },
        {
          prop: "c",
          label: "Label C",
          width: 20
        }
      ],
      data: [
        { a: "a", b: "b", c: "c" },
        { a: "a", b: "b", c: "c" },
        { a: "a", b: "b", c: "c" }
      ]
    };
  }
};
</script>
