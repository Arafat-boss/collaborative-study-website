import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
          ]
        },
        //--------------Dashboard--------------
        {
          path:'/dashboard',
          element:<Dashboard></Dashboard>,
          children:[
            {
              path:'/dashboard/viewBookedSession',
              element: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, distinctio?</p>
            }
          ]
        }
      ]);


export default router;