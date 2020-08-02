<template>
  <div class="child-menu-box">
    <article>
      <section v-for="(group, gIndex) in menu" :key="gIndex">
        <header
          :class="{
            'second-menu-item': true,
            'selected-menu-item': groupIndex === gIndex
          }"
          @click="leafMenuItemClick(group, gIndex)"
        >
          {{ group.label }}
        </header>
        <aside
          v-if="group.child"
          :class="{ 'nav-group': true }"
          :style="{
            height:
              groupIndex === gIndex
                ? (group.child || []).length * 30 + 'px'
                : '0px'
          }"
        >
          <nav
            v-for="(nav, index) in group.child"
            :key="index"
            :class="{
              'third-menu-item': true,
              'selected-menu-item': itemIndex === index
            }"
            @click="leafMenuItemClick(nav, gIndex, index)"
          >
            {{ nav.label }}
          </nav>
        </aside>
      </section>
    </article>
    <footer>
      123
    </footer>
  </div>
</template>

<script>
export default {
  name: "childMenu",
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      groupIndex: 0,
      itemIndex: 0
    };
  },
  methods: {
    leafMenuItemClick(item, groupIndex, index) {
      this.groupIndex = this.groupIndex === groupIndex ? -1 : groupIndex;
      this.itemIndex = index;
    }
  },
  computed: {
    groupStyle(group, gIndex) {
      if (this.groupIndex !== gIndex || !group.child) {
        return {
          height: "0px"
        };
      }

      return {
        height: group.child.length * 30 + "px"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin menuItemHover {
  color: #00fa;
}
@mixin menuItem {
  font-size: 14px;
  color: #666666;
  padding: 5px 0px;
  height: 20px;
  @include overflowText;

  &:hover {
    cursor: pointer;
    @include menuItemHover;
  }
}
@mixin overflowText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.child-menu-box {
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  color: #333333;
  background-color: rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  > article {
    flex: 1;
    .second-menu-item {
      @include menuItem;
      padding: 0px 5px;
    }
    .third-menu-item {
      @include menuItem;
      padding-left: 20px;
    }
    .selected-menu-item {
      @include menuItemHover;
    }
    .nav-group {
      height: 0px;
      padding-top: 5px;
      overflow: hidden;
      transition: all 0.3s;
    }
  }

  > footer {
    height: 30px;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
