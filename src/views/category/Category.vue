<template>
  <div id="category">
    <nav-bar>
      <div slot="center" class="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <!-- 侧边栏 -->
      <slider-bar :categoryList="categoryList" @slideItemClick="slideItemClick"></slider-bar>
      <scroll class="scroll-content" ref="scroll">
        <sub-category :subCategory="subCategory"></sub-category>
        <tab-control :titles="title" @tabClick="tabClick" ref="tab"></tab-control>
        <goods-list :goods="recommendGoods"></goods-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import SliderBar from './childComponents/SlideBar.vue'
import SubCategory from './childComponents/SubCategory.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category.js'
export default {
  components: {
    NavBar,
    Scroll,
    SliderBar,
    SubCategory,
    TabControl,
    GoodsList
  },
  data() {
    return {
      // 侧边栏列表
      categoryList: [],
      title: ['流行', '新款', '精选'],
      // 侧边栏的当前索引
      currentIndex: 0,
      subCategory: [],
      recommendGoods: []
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {

  },
  methods: {
    getPageData() {
      getCategory().then(res => {
        this.categoryList = res.data.category.list
        this.$nextTick(() => {
          this.getSubCategory(this.categoryList[0].maitKey)
          this.getCategoryDetail(this.categoryList[0].miniWallkey, 'pop')
        })
      })
    },
    getSubCategory(maitKey) {
      getSubcategory(maitKey).then(
        res => {
          this.subCategory = res.data.list
        }
      )
    },
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then(res => {
        this.recommendGoods = res
      })
    },
    slideItemClick({index, maitKey}) {
      if(this.currentIndex == index) return
      this.currentIndex = index 

      // 请求不同的右侧数据
      this.$refs.scroll.scrollTo(0, 0)
      this.getSubCategory(maitKey)
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, 'pop')
      this.$refs.tab.curIndex = 0
    },
    tabClick(index) {
      let tabList = ['pop', 'new', 'sell']
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, tabList[index])
    }
  }
}
</script>

<style lang="less" scoped>
  .center{
    color: #fff;
  }

  .scroll-content {
    position: fixed;
    left: 100px;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
</style>

