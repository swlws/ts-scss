<template>
  <div>
    <div v-if="data.child">
      <el-popover
        v-model="show"
        width="100"
        trigger="hover"
        placement="bottom-start"
      >
        <base-list
          :data="data.child"
          :check-id="checkIds[2]"
          @click="handleClick"
        />

        <div class="header-wrap" slot="reference">
          <span :class="{ 'item-checked': checkIds[1] === pId }">
            {{ data.label }}
          </span>
        </div>
      </el-popover>
    </div>

    <div v-else>
      <div class="header-wrap" @click="handleClick(data)">
        <span :class="{ 'item-checked': checkIds[1] === pId }">
          {{ data.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class SecondNavItem extends Vue {
  @Prop(Object) data!: object;
  @Prop(String) pId!: string;
  @Prop(Array) checkIds!: string[];

  show = false;

  handleClick(item: FreeObject): void {
    // 路由存在时，进行路由跳转
    if (item.url && item.url !== this.$route.path) {
      console.log(item.url);
      this.$router.push(item.url);
    }

    this.$emit("leaf-click", this.pId, item.id);
    this.show = false;
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  padding: 0px 20px;
  font-size: 14px;
  color: #333;

  cursor: pointer;

  .item-checked {
    color: #409eff;
  }
}
</style>
