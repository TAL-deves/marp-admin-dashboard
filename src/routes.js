import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userAccount';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './_mock/category';
import OrderListPage from './_mock/orderList';
import DashboardAppPage from './pages/DashboardAppPage';
// import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
// const AccessToken=localStorage.getItem("accessToken");
// console.log("accessToken-------", AccessToken
// );
// const navigate = useNavigate();
// if(AccessToken){
//   navigate("/login")
// }

  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'orderList', element: <OrderListPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'profile', element: <UserProfile />, },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
