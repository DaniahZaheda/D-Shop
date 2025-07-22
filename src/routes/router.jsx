import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import DashboardLayout from "../DashboardLayout.jsx";
import Home from "../components/user/Home/Home.jsx";
import AdminHome from "../pages/dashboard/Home/Home.jsx";
import Login from "../pages/user/Login/Login.jsx";
import Register from "../pages/user/Register/Register.jsx";
import CategoryDetails from "../pages/user/CategoryDetails/CategoryDetails.jsx";
import Product from "../pages/user/Product/Product.jsx";
import Cart from "../pages/user/Cart/Cart.jsx";
import Index from "../pages/dashboard/category/Index.jsx";
import Creat from "../pages/dashboard/category/Creat.jsx";
import DashboardProtectedRouter from "../components/protectedRouter/DashboardProtectedRouter.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'categoryDetails/:categoryId',
        element: <CategoryDetails />
      },
      {
        path: 'product/:productId',
        element: <Product />
      },
      {
        path: 'cart',
        element: <Cart />
      }
    ]
  },
  {
    path: '/admin',
    element: 
    <DashboardProtectedRouter>
    <DashboardLayout />,
    </DashboardProtectedRouter>,
    
    children: [
      {
        path: '',
        element: <AdminHome />
      },
       {
        path: 'index',
        element: <Index/>
      },
        {
        path: 'creat',
        element: <Creat/>
      }
    ]
  }
]);


export default router;
