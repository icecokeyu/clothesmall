<template>
  <div id="nav-bar">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-center">
      <slot name="center"></slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>  

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  #nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ff8198;
  }

  .nav-left,.nav-right {
    width: 60px;
  }

  .nav-center {
    flex: 1;
  }
</style>