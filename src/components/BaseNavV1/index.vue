<template>
  <div
    class="child-menu-box"
    v-if="menu.length > 0"
    :style="{ width: closed ? '40px' : '200px' }"
  >
    <article>
      <div v-show="!closed">
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
      </div>
    </article>
    <footer @click="closed = !closed"></footer>
  </div>
</template>

<script>
export default {
  name: "BaseNavV1",
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      groupIndex: 0,
      itemIndex: 0,
      closed: false
    };
  },
  methods: {
    leafMenuItemClick(item, groupIndex, index) {
      this.groupIndex =
        index === undefined && this.groupIndex === groupIndex ? -1 : groupIndex;
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
  padding: 5px 10px;
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
  transition: all 0.3s;

  > article {
    flex: 1;
    .second-menu-item {
      @include menuItem;
    }
    .third-menu-item {
      @include menuItem;
      padding-left: 30px;
    }
    .selected-menu-item {
      @include menuItemHover;
    }
    .nav-group {
      height: 0px;
      overflow: hidden;
      transition: all 0.3s;
    }
  }

  > footer {
    cursor: pointer;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
