import { Navigate } from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'

const indexRouter = [
  //使用Navigate进行重定向
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    //这里是你需要的路由组件
    element: <Login />,
  },
]

export default indexRouter
