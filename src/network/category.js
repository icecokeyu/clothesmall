import { request } from "./request";
// 分类侧边栏的数据
export function getCategory() {
  return request({
    url: "/category"
  })
}

// 二级分类
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

// 分类下面对应的tabcontrol展示
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  })
}