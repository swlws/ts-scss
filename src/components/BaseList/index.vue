<template>
  <div class="base-list">
    <div
      v-for="item in data"
      :class="{ item: true, 'item-checked': item.id === checkId }"
      :key="item.id"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseList extends Vue {
  @Prop(Array) data!: FreeObject[];
  @Prop(String) checkId!: string;

  handleClick(item: FreeObject) {
    this.$emit("click", item);
  }
}
</script>

<style lang="scss" scoped>
.base-list {
  > .item {
    font-size: 14px;
    color: #666;
    padding: 5px 5px;

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 255, 0.1);
      color: #409eff;
    }

    &-checked {
      background-color: rgba(0, 0, 255, 0.1);
      color: #409eff;
    }
  }
}
</style>
