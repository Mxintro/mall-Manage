import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const WelCome = () => import(/* webpackChunkName: "home" */ 'views/home/WelCome')
const Home = () => import(/* webpackChunkName: "home" */ 'views/home/Home')
const Users = () => import(/* webpackChunkName: "users" */ 'views/users/Users')
const Login = () => import(/* webpackChunkName: "login" */ 'views/login/Login')
const Rights = () => import(/* webpackChunkName: "rights" */ 'views/rights/Rights')
const Roles = () => import(/* webpackChunkName: "roles" */ 'views/rights/Roles')
const Cate = () => import(/* webpackChunkName: "goods_cate" */ 'views/goods/Cate')
const Params = () => import(/* webpackChunkName: "goods_params" */ 'views/goods/Params')
const GoodsList = () => import(/* webpackChunkName: "goods_list" */ 'views/goods/GoodsList')
const AddGoods = () => import(/* webpackChunkName: "goods_add" */ 'views/goods/AddGoods')
const Order = () => import(/* webpackChunkName: "order" */ 'views/order/Order')
const Reports = () => import(/* webpackChunkName: "report" */ 'views/report/Reports')

const routes = [
  { path: '/', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '', component: WelCome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: AddGoods },
      { path: '/reports', component: Reports },
      { path: '/orders', component: Order }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to, from都是route对象
  const token = window.sessionStorage.getItem('token')
  if (to.name !== 'Login' && !token) return next({ name: 'Login' })
  return next()
})

export default router
