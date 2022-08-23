import './assets/css/basic.scss'
import './assets/css/common.scss'
import Sidebar from './components/sidebar'
import Header from './components/header'
import { useRoutes } from 'react-router-dom'
import indexRouter from './router'
import { useLocation } from 'react-router'

function App() {
  // 必须要用函数返回
  const Views = () => useRoutes(indexRouter)
  const location = useLocation()

  let onHeaderList = ['/login']
  let noSidebarList = ['/home', '/login']
  const routerName = () => {
    if (noSidebarList.includes(location.pathname)) {
      return (
        <div className="content-box flex-row">
          <Views />
        </div>
      )
    } else {
      return (
        <div className="content-box flex-row">
          <Sidebar />
          <Views />
        </div>
      )
    }
  }

  return (
    <div className="App">
      {onHeaderList.includes(location.pathname) ? '' : <Header />}
      {routerName()}
    </div>
  )
}

export default App
