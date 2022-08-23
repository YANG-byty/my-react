/**
 * 业务配置
 * */

const Setting = {
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  // 应用的基路径
  routerBase: process.env.VUE_APP_PUBLIC_PATH,
  // 页面切换时，是否显示模拟的进度条
  showProgressBar: true,
  // 接口请求地址
  apiBaseURL: process.env.REACT_APP_BASE_URL,
  //认证回调地址
  OAUTH_REDIRECT_URI: process.env.VUE_APP_OAUTH_REDIRECT_URI,

  //token的默认前缀
  tokenDefaultKey: 'integration',

  modalDuration: 3,
  // 接口请求返回错误时，弹窗的类型，可选值为 Message 或 Notice
  errorModalType: 'Message',
  // Cookies 默认保存时间，单位：天
  cookiesExpires: 1,
}

export default Setting
