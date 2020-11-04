/**
 * 为DOM元素注册非当前元素及其子元素的点击事件
 *
 * @param {*} Vue
 */
function clickOutSide(Vue: any) {
  Vue.directive("click-out-side", {
    inserted(el: any, bindings: any) {
      // el真实的dom元素
      el.listener = function listener(e: any) {
        if (e.target === el || el.contains(e.target)) {
          return;
        }
        bindings.value(); // close事件
      };
      document.addEventListener("click", el.listener);
    },
    unbind(el: any) {
      document.removeEventListener("click", el.listener);
    }
  });
}

/**
 * 为DOM元素注册鼠标离开事件
 *
 * @param {*} Vue
 */
function mouseleave(Vue: any) {
  Vue.directive("mouse-leave", {
    inserted(el: any, bindings: any) {
      // el真实的dom元素
      el.listener = function listener() {
        bindings.value(); // close事件
      };
      el.addEventListener("mouseleave", el.listener);
    },
    unbind(el: any) {
      el.removeEventListener("mouseleave", el.listener);
    }
  });
}

function atuoResizeNode(Vue: any) {
  Vue.directive("auto-resize-node", {
    inserted(el: any) {
      const parentNode = el.parentNode;
      el.style.height = parentNode.offsetHeight - 10 + "px";
      el.style.width = parentNode.offsetWidth + "px";
    }
  });
}

/**
 * 输入框的默认选中
 *
 * @param {*} Vue
 */
function focus(Vue: any) {
  Vue.directive("focus", {
    inserted(el: any) {
      el.focus();
      el.getElementsByTagName("input")[0].focus();
    }
  });
}

function install(Vue: any) {
  clickOutSide(Vue);
  mouseleave(Vue);
  atuoResizeNode(Vue);
  focus(Vue);
}

export default {
  install
};
