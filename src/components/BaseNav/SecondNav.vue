<template>
  <section class="second-nav">
    <div v-for="item in data" :key="item.id">
      <second-nav-item
        :data="item"
        :p-id="item.id"
        :check-ids="checkIds"
        @leaf-click="handleLeafClick"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SecondNavItem from "./SecondNavItem.vue";

@Component({
  components: { SecondNavItem }
})
export default class SecondNav extends Vue {
  @Prop(Array) data!: any[];
  @Prop(Array) checkIds!: string[];

  handleLeafClick(secondId = "", thirdId = ""): void {
    this.$emit("nav-change", secondId, thirdId);
  }
}
</script>

<style lang="scss" scoped>
.second-nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
