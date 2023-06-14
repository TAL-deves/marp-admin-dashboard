import { useEffect } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userAccount';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './_mock/category';
import OrderListPage from './_mock/orderList';
import DashboardAppPage from './pages/DashboardAppPage';
import AddProduct from './pages/AddProduct';
import ProductReview from './pages/ProductReview';
import { getRequestHandler } from './apiHandler/customApiHandler';
// import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  async function handleAuthCheck() {

    try {
      const data = await getRequestHandler('https://marpapi.techanalyticaltd.com/auth/authcheck');
      // Handle the response data
      console.log("auth check response", data);
      if(data.error.code===401){
        localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      navigate("/")
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  useEffect(() => {
    handleAuthCheck()
  }, [])
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
        { path: 'product', element: <AddProduct />, },
        { path: 'product/:id', element: <AddProduct />, },
        { path: 'add-product-review', element: <ProductReview />, },
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
