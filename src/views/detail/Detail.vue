<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :images-info="imagesInfo" @imgLoad="imgLoad"/>
      <detail-params-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamsInfo from './childComps/DetailParamsInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import BackTop from "components/content/backTop/BackTop.vue";

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail.js"

import {debounce} from "common/utils.js"
import {backTopMixin} from "common/mixin.js"

import {mapActions} from 'vuex'



export default {
  name: "Detail",
  mixins: [backTopMixin],
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      imagesInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.???????????????iid
    this.iid = this.$route.params.iid;
    // 2.??????iid??????????????????
    getDetail(this.iid).then((res) => {
      // 1.?????????????????????
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;

      //3.??????????????????
      const data = res.result;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.???????????????????????????
      this.shop = new Shop(data.shopInfo);

      // 5.????????????????????????
      this.imagesInfo = data.detailInfo;

      // 6.????????????????????????
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7.????????????????????????
      // ????????????????????????????????????????????????
      if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
    })
     // 8.??????????????????
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  }, 
  mounted() {
    // ??????tabControl???offsetTop??? ???????????????offsetTop???????????????????????????????????????????????????????????????
    // console.log(this.$refs.tabControl.$el.offsetTop);

    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // ??????this.$refs ??????document.querySeletor???????????? ????????????mounted????????????
    this.$bus.$on("detailItemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
      this.getThemeTopYs()
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(position) {
      // console.log(position);
      // 1.??????Y???

      const positionY = -position.y;
      // console.log(positionY);
      // 2.positionY????????????????????????
      // [0, 11251, 11843, 12037, Number.MAX_VALUE]
    
      // positionY???0 ??? 11251?????????index = 0
      // positionY???11251 ??? 11843?????????index = 1
      // positionY???11843 ??? 12037?????????index = 2
      // positionY????????????12027???index = 3
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++ ) {
        // ?????????
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // ?????????
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1.??????????????????????????????????????? ????????????????????????????????????????????????iid
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid

      // 2.??????????????????????????????
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.message = ''
        //   this.show = false
        // }, 2000)
        this.$toast.show(res, 2000)
      })
    }
  }
};
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 60px;
  }
</style>