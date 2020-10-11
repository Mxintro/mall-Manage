import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Users = () => import('views/users/Users')
const Login = () => import('views/login/Login')
const Rights = () => import('views/rights/Rights')
const Roles = () => import('views/rights/Roles')
const Cate = () => import('views/goods_cate/Cate')

const routes = [
  { path: '/', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/users', component: Users},
      { path: '/rights', component: Rights},
      { path: '/roles', component: Roles},
      { path: '/categories', component: Cate}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
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
