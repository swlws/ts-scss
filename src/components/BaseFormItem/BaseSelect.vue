<template>
  <el-popover placement="bottom-start" width="160" :visible-arrow="false">
    <article class="content-box">
      <header>
        <el-input v-model="pSearchValue" placeholder="Search" size="mini" />
      </header>
      <section>
        <div
          v-for="(item, index) in realOptions"
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
      <p>{{ realTitle }}</p>
      <i class="icon el-icon-arrow-down"></i>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "BaseSelect",
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
      pValue: [...value], // 当前值
      pSearchValue: "" // 搜索的值
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
  },
  computed: {
    realTitle() {
      if (this.pValue.length === 0) {
        return `${this.name}: All`;
      }

      const { prop = "prop", label = "label" } = this.config;

      return this.options
        .filter(item => {
          return this.pValue.includes(item[prop]);
        })
        .reduce((pre, next) => {
          pre.push(next[label]);
          return pre;
        }, [])
        .join(",");
    },
    realOptions() {
      const pSearchValue = this.pSearchValue.trim();
      if (!pSearchValue) return [...this.options];

      const label = this.config.label || "label";
      return this.options.filter(item => {
        return (item[label] || "")
          .toLowerCase()
          .includes(pSearchValue.toLowerCase());
      });
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
  cursor: pointer;
  p {
    display: inline-block;
    font-size: 12px;
    line-height: 12px;
    margin: 0px 10px 0px 0px;
    padding: 0px;
    max-width: 100px;
    @include test-over;
  }
  .icon {
    font-size: 12px;
  }
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
