import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  [ADD_COUNTER](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  },
  addNum(state, payLoad) {
    for(let item of state.cartList) {
      if(item.iid === payLoad.id) {
        item.count++
      }
    }
  },
  reduceNum(state, payLoad) {
    for(let item of state.cartList) {
      if(item.iid === payLoad.id) {
        item.count--
      }
    }
  },
  deleteGoods(state, payLoad) {
    let index = state.cartList.findIndex(item => {
      return item.iid == payLoad.id
    })
    state.cartList.splice(index, 1)
  }
}