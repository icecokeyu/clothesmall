<template>
  <div class="slider-bar">
    <scroll class="scroll-height">
      <div class="bar" v-for="(item, index) in categoryList" :key="index">
        <div class="bar-item" @click="itemClick(index)" :class="currentIndex == index ? 'active' : ''">
          {{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll.vue"
  export default {
    components: {
      Scroll
    },
    props: {
      categoryList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 发送自定义事件，并传值给父组件 要传两个值 currentIndex 和 maitKey
        const maitKey = this.categoryList[this.currentIndex].maitKey
        let obj = {
          index,
          maitKey
        }
        this.$emit('slideItemClick', obj)
      }
    }
  }
</script>

<style lang="less" scoped>
  .scroll-height {
    position: fixed;
    top: 44px;
    bottom: 49px;
    left: 0;
    overflow: hidden;
  }
  .bar {
    box-sizing: border-box;
    width: 100px;
    height: 45px;
    .bar-item {
      background:rgba(0,0,0,0.1);
      line-height: 45px;
      text-align: center;
      color: #666;
      background-color: #f6f6f6;
    }
    .active {
      background-color: #fff!important;
      color: #ff8198;
      border-left: 2px solid #ff8198;
    }
  }



</style>