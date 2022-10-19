<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">
          <button class="num-btn" @click="reduceNum">-</button>
          <span class="item-num">{{itemInfo.count}}</span>
          <button class="num-btn" @click="addNum">+</button>
        </div>
      </div>
    </div>
    <div class="delete">
      <button class="delete-btn" @click="deleteItem">删除</button>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue"
export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    },
    reduceNum() {
      if(this.itemInfo.count <= 1)  {
        this.$toast.show('商品数量已经为最小', 2000)
      } else {
        const id = this.itemInfo.iid
        this.$store.commit('reduceNum', { id })
      }
    },
    addNum() {
      const id = this.itemInfo.iid
      this.$store.commit('addNum', { id })
    },
    deleteItem() {
      console.log('删除商品')
      const id = this.itemInfo.iid
      this.$store.commit('deleteGoods', { id })
    }
  }
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 12px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    align-items: center;
  }

  .item-selector {
    /* width: 14%; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 60px;
    height: 80px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    width: 60%;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .num-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #ff8198;
    background-color: #fff;
  }

  .delete-btn {
    display: inline-block;
    width: 40px;
    height: 30px;
    border-radius: 5px;
    color: #fff;
    background-color: var(--color-tint);
    border: none;
  }

  .item-num {
    padding: 0 3px;
  }
</style>