import DashboardLayout from '../layout/DashboardLayout.vue'
import ClientViewLayout from '../layout/ClientViewLayout.vue'
import ClientHome from '../pages/Client/ClientContainer.vue'
import Login from '../pages/Login'
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

const routes = [
  {
    path: '/',
    component: ClientViewLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'product',
        component: ProductDetail,
        name: 'product',
        props: true
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
    redirect: '/login',
    children: [
      {
        path: 'dashboard',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'product-list',
        name: 'Danh sách sản phẩm',
        component: ProductList
      },
      {
        path: 'order-list',
        name: 'Danh sách đơn hàng',
        component: OrderList
      },
      {
        path: 'category-list',
        name: 'Danh mục sản phẩm',
        component: CategoryList
      },
      {
        path: 'customer-list',
        name: 'Danh sách khách hàng',
        component: CustomerList
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
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
