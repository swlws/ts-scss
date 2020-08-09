<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "BaseSvgIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  created() {
    this.onload();
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgClass() {
      return "svg-icon";
    },
    svgColor() {
      return this.color;
    }
  },
  watch: {
    color() {
      this.onload();
    },
    icon() {
      this.onload();
    }
  },
  methods: {
    onload() {
      const req = require.context("../../assets/svg", false, /\.svg$/);
      const requireAll = requireContext =>
        requireContext.keys().map(requireContext);
      requireAll(req).forEach(item => {
        if (item.default.id === `icon-${this.icon}`) {
          if (this.svgColor !== "") {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
              for (let i = 0; i < item.default.node.childNodes.length; i++) {
                item.default.node.childNodes[i].setAttribute(
                  "fill",
                  this.svgColor
                );
              }
            } else {
              item.default.node.innerHTML = item.default.node.innerHTML.replace(
                /fill="#[a-zA-Z0-9]{0,6}"/g,
                `fill="${this.svgColor}"`
              );
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
