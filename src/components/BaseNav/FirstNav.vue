<template>
  <el-popover
    v-model="show"
    width="100"
    trigger="click"
    placement="bottom-start"
  >
    <base-list :data="data" :check-id="checkId" @click="handleClick" />

    <div class="header-wrap" slot="reference">
      <span> {{ title }} </span>
      <i class="iconfont icon-arrow-down-bold1"></i>
    </div>
  </el-popover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component<FirstNav>({
  watch: {
    data() {
      if (!this.checkId) {
        this.handleClick(this.data[0]);
      }
    }
  }
})
export default class FirstNav extends Vue {
  @Prop(Array) data!: any[];
  @Prop(String) checkId!: string;

  show = false;

  handleClick(item: FreeObject) {
    this.$emit("click", item.id);
    this.show = false;
  }

  get idToLabel() {
    if (!Array.isArray(this.data)) return {};

    const obj = {};
    return this.data.reduce((obj, next) => {
      obj[next.id] = next.label;
      return obj;
    }, obj);
  }

  get title() {
    return this.idToLabel[this.checkId] || "";
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 40px;
  margin: 0px 10px;
  padding: 0px 0px 0px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;

  color: #666;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  i {
    margin: 0px 10px;
  }
}
</style>
