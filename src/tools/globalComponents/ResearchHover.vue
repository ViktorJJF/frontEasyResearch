<template>
  <div class="hoverContainer">
    <div class="element">
      <slot name="element"></slot>
    </div>
    <div class="topElement">
      <slot name="options" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hoverContainer {
  position: relative;
}
.hoverContainer:hover .element {
  outline: 1px #bbdefb dashed;
  background-color: #e3f2fd;
}
.hoverContainer:hover .topElement {
  opacity: 1;
}
.element {
  padding: 15px;
  transition: 0.3s ease;
}
.topElement {
  transition: 0.3s ease;
  opacity: 0;
  position: absolute;
  bottom: 100%;
  right: 0;
}
</style>