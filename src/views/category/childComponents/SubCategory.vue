<template>
  <div class="category-content">
    <div class="content-item" v-for="(item, index) in subCategory" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="分类图片" class="img">
      </a>
      <p class="title">{{item.title}}</p>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: {
      subCategory: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-item {
      text-align: center;
      .img {
        width: 60px;
        height: 60px;
      }
      .title {
        font-size: 12px;
      }
    }
  }
</style>