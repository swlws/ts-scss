<template>
  <el-popover placement="bottom-start" width="160" :visible-arrow="false">
    <article class="content-box">
      <section>
        <div
          v-for="(item, index) in options"
          :key="index"
          class="list-item"
          @click="toggleOption(item[config.prop || 'prop'])"
        >
          <span class="icon">
            <i
              v-show="pValue.indexOf(item[config.prop || 'prop']) > -1"
              class="el-icon-check"
            ></i>
          </span>

          <span> {{ item[config.label || "label"] }} </span>
        </div>
      </section>
    </article>

    <div slot="reference" class="title-box">
      <i class="el-icon-plus"></i>
      <span> 更多 </span>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "MoreField",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({
        prop: "prop",
        label: "label"
      })
    }
  },
  data() {
    const value = Array.isArray(this.value) ? this.value : [];

    return {
      pOldValue: [...value], // 旧值
      pValue: [...value] // 当前值
    };
  },
  methods: {
    toggleOption(prop) {
      const index = this.pValue.indexOf(prop);

      if (index === -1) {
        this.pValue.push(prop);
      } else {
        this.pValue.splice(index, 1);
      }

      this.$emit("change", this.pValue, this.pOldValue);
      this.$emit("update:value", this.pValue);

      this.pOldValue = [...this.pValue];
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin test-over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-box {
  color: #007aff;
  margin: 0px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
}

.content-box {
  header {
    padding: 10px 0px;
    border-bottom: 1px solid #e8e8e8;
  }

  section {
    padding: 10px 0px;
    max-height: 200px;

    > div {
      padding: 5px 0px;
      cursor: pointer;
      @include test-over;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      > .icon {
        display: inline-block;
        width: 20px;
      }
    }
  }
}
</style>
