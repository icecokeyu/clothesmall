<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item"
    :class="{active: index  === curIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.curIndex = index;
      // 子组件向父组件传递数据 用自定义事件this.$emit
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>