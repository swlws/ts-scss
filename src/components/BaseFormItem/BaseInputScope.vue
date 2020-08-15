<template>
  <el-popover placement="bottom-start" :visible-arrow="false">
    <article class="content-box">
      <el-input
        v-model="pStartValue"
        size="mini"
        style="width:80px;"
        placeholder="Start"
        @change="startValueChangeEvent"
      />
      <span> - </span>
      <el-input
        v-model="pEndValue"
        size="mini"
        style="width:80px;"
        placeholder="End"
        @change="endValueChangeEvent"
      />
    </article>

    <div slot="reference" class="title-box">
      <p>{{ realTitle }}</p>
      <i class="el-icon-arrow-down"></i>
      <i @click.stop="closeEvent" class="el-icon-circle-close"></i>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "BaseInputScope",
  props: {
    id: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const value = Array.isArray(this.value) ? this.value : [];

    return {
      pOldStartValue: value[0] || "", // 旧值
      pOldEndValue: value[1] || "", // 旧值
      pStartValue: value[0] || "", // 当前值
      pEndValue: value[1] || "" // 当前值
    };
  },
  methods: {
    closeEvent() {
      this.$emit("close", Object.freeze(this.$props));
    },
    startValueChangeEvent(value) {
      this.$emit(
        "change",
        [value, this.pNewEndValue],
        [this.pOldStartValue, this.pOldEndValue]
      );
      this.$emit("update:value", [value, this.pNewEndValue]);

      this.pOldStartValue = value;
    },
    endValueChangeEvent(value) {
      this.$emit(
        "change",
        [this.pOldStartValue, value],
        [this.pOldStartValue, this.pOldEndValue]
      );
      this.$emit("update:value", [this.pOldStartValue, value]);

      this.pOldEndValue = value;
    }
  },
  computed: {
    realTitle() {
      if (!this.pStartValue && !this.pEndValue) return `${this.name}: All`;

      return `${this.pStartValue} - ${this.pEndValue}`;
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
  color: #666666;
  margin: 0px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  p {
    margin: 0px 10px 0px 0px;
    padding: 0px;
    max-width: 100px;
    @include test-over;
  }
  i {
    padding: 0px 2px;
  }
}
</style>
