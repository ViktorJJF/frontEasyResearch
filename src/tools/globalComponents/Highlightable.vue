<template>
  <div>
    <div
      v-show="showMenu"
      class="menu"
      :style="{        left: `${x}px`,        top: `${y}px`      }"
      @mousedown.prevent
    >
      <span class="item" @mousedown.prevent="handleAction('share')">Share</span>
      <span class="item" @mousedown.prevent="handleAction('highlight')">Highlight</span>
      <!-- You can add more buttons here -->
    </div>
    <!-- The insterted text should be displayed here -->
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return { x: 0, y: 0, showMenu: false, selectedText: "" };
  },
  computed: {
    highlightableEl() {
      return this.$slots.default[0].elm;
    }
  },
  mounted() {
    window.addEventListener("mouseup", this.onMouseup);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.onMouseup);
  },
  methods: {
    onMouseup() {
      const selection = window.getSelection();
      const startNode = selection.getRangeAt(0).startContainer.parentNode;
      const endNode = selection.getRangeAt(0).endContainer.parentNode;
      if (
        !startNode.isSameNode(this.highlightableEl) ||
        !startNode.isSameNode(endNode)
      ) {
        this.showTools = false;
        return;
      }
      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect();
      if (!width) {
        this.showTools = false;
        return;
      }
      this.x = x + width / 2;
      this.y = y + window.scrollY - 10;
      this.showTools = true;
      this.selectedText = selection.toString();
    },

    handleAction(action) {
      this.$emit(action, this.selectedText);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}
.item {
  color: #fff;
  cursor: pointer;
}
.item:hover {
  color: #1199ff;
}
.item + .item {
  margin-left: 10px;
}
</style>