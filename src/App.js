import './assets/css/basic.css'
import Sidebar from './components/sidebar'
import Header from './components/header'
import { useRoutes } from 'react-router-dom'
import indexRouter from './router'
function App() {
  // 必须要用函数返回
  const Views = () => useRoutes(indexRouter)

  return (
    <div className="App">
      <Header />
      <Sidebar />
      {/* 路由页面 */}
      <Views />
    </div>
  )
}

export default App
