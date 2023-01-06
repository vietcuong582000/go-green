import DashboardLayout from '../layout/DashboardLayout.vue'
import ClientViewLayout from '../layout/ClientViewLayout.vue'
import Login from '../pages/Login'
import firebase from "firebase"
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import ProductList from '@/pages/Products/ProductList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import OrderList from "@/pages/Orders/OrderList";
import CategoryList from "@/pages/Categories/CategoryList";
import CustomerList from "@/pages/Customers/CustomerList";
import Home from "@/pages/Client/Home";
import ProductDetail from "@/pages/Client/ProductDetail";
import VueRouter from 'vue-router'
import ShoppingCart from "@/pages/Client/ShoppingCart";
import HomeProductList from "@/pages/Client/HomeProductList";
import PaymentStatus from "@/pages/PaymentStatus";

const routes = [
  {
    path: '/',
    component: ClientViewLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'product-list',
        name: 'homeProductList',
        component: HomeProductList
      },
      {
        path: 'product/:id',
        component: ProductDetail,
        name: 'product',
        props: true
      },
      {
        path: 'cart',
        name: 'cart',
        component: ShoppingCart
      },
      {
        path: 'payment-status',
        name: 'payment-status',
        component: PaymentStatus,
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Overview',
        component: Overview,
        meta: { authRequired: true }
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
        meta: { authRequired: true }
      },
      {
        path: 'product-list',
        name: 'Danh sách sản phẩm',
        component: ProductList,
        meta: { authRequired: true }
      },
      {
        path: 'order-list',
        name: 'Danh sách đơn hàng',
        component: OrderList,
        meta: { authRequired: true }
      },
      {
        path: 'category-list',
        name: 'Danh mục sản phẩm',
        component: CategoryList,
        meta: { authRequired: true }
      },
      {
        path: 'customer-list',
        name: 'Danh sách khách hàng',
        component: CustomerList,
        meta: { authRequired: true }
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps,
        meta: { authRequired: true }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications,
        meta: { authRequired: true }
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade,
        meta: { authRequired: true }
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
