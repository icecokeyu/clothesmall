import axios from 'axios';

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  // 2.axios拦截器
  // 2.1请求拦截的作用
  // instance.interceptors.request.use(config => {
  //   // console.log(config);
  //   // 1.比如config中的一些信息不符合服务器的要求
  //   // 2.每次发送网络请求时，都希望在界面中显示一个图标
  //   // 3.某些网络请求(如登录的token),必须携带一些特殊信息
  //   return config;
  // }, err => {
  //   console.log(err);
  // })

  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.每次发送网络请求时，都希望在界面中显示一个图标
    // 3.某些网络请求(如登录的token),必须携带一些特殊信息
    return config;
    // console.log(1);
    // return;
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求 instance(config)返回的就是一个promise
  return instance(config)
}