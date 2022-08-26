import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import messageLImit from './plugins/message/message-limit'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN'

// 全局挂载
React.$Message = messageLImit

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // 下面来对接react-redux与store，让全部组件都能方便引用store。
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
  // <App>的最外侧包襄了一个<BrowserRouter>或<HashRouter></HashRouter>
)
