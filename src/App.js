import './assets/css/common.scss'
import './assets/icon-font/iconfont.css'
import { useRoutes } from 'react-router-dom'
import indexRouter from './router'
import { useLocation } from 'react-router'

function App() {
  // 必须要用函数返回
  const Views = () => useRoutes(indexRouter)
  // 获取当前路由
  const location = useLocation()

  return (
    <div className="App">
      <div></div>
      <Views />
    </div>
  )
}

export default App
