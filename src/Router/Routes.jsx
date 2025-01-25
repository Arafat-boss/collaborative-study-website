import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import CreateStudySession from "../Pages/Dashboard/TutorDashboard/CreateStudySession";
import PrivateRoute from "./PrivateRoute";
import ViewAllStudySessions from "../Pages/Dashboard/TutorDashboard/ViewAllStudySessions";
import UploadMaterials from "../Pages/Dashboard/TutorDashboard/UploadMaterials";
import ViewAllMaterials from "../Pages/Dashboard/TutorDashboard/ViewAllMaterials";
import ViewBookedSession from "../Pages/Dashboard/StudentDashboard/ViewBookedSession";
import CreateNote from "../Pages/Dashboard/StudentDashboard/CreateNote";
import ManagePersonalNotes from "../Pages/Dashboard/StudentDashboard/ManagePersonalNotes";
import ViewAllStudyMaterials from "../Pages/Dashboard/StudentDashboard/ViewAllStudyMaterials";
import UpdateMaterials from "../Pages/Dashboard/TutorDashboard/UpdateMaterials";
import ViewAllStudySession from "../Pages/Dashboard/AdminDashbord/ViewAllStudySession";
import ViewAllUser from "../Pages/Dashboard/AdminDashbord/ViewAllUser";
import ViewAllMaterialsAdmin from "../Pages/Dashboard/AdminDashbord/ViewAllMaterialsAdmin";
import Welcome from "../Components/Welcome";
import CardDetails from "../Pages/Home/CardDetails";
import BookedDetails from "../Components/StudySessionCard/BookedDetails";
import UpdateSuccessSession from "../Pages/Dashboard/AdminDashbord/UpdateSuccessSession";
import AdminPrivate from "./AdminPrivate";
import Payment from "../Pages/Home/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: '/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) =>
                  fetch(`https://collaborative-study-server.vercel.app/study/${params.id}`)
            },
            {
                path: '/cardDetails/:id',
                element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute>,
                loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/study/${params.id}`)
            },
            {
              path: '/bookedDetails/:id',
              element: <BookedDetails></BookedDetails>,
              loader: ({ params }) =>
                  fetch(`https://collaborative-study-server.vercel.app/bookedDetails/${params.id}`),
          }
          ]
        },
        //--------------Dashboard--------------
        {
          path:'/dashboard',
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children:[
            //student========================================================================
            {
              path:'/dashboard/viewBookedSession',
              element: <PrivateRoute><ViewBookedSession></ViewBookedSession></PrivateRoute>
            },
            {
              path:'/dashboard/createNote',
              element: <PrivateRoute><CreateNote></CreateNote></PrivateRoute>
            },
            {
              path:'/dashboard/personalNotes',
              element:<ManagePersonalNotes></ManagePersonalNotes>
            },
            {
              path:'/dashboard/studyMaterials',
              element:<PrivateRoute> <ViewAllStudyMaterials></ViewAllStudyMaterials></PrivateRoute>
            },
            //tutor===============================================================================
            {
              path:'/dashboard/createStudySession',
              element: <CreateStudySession></CreateStudySession>
            },
            {
              path:'/dashboard/viewAllStudySessions',
              element: <ViewAllStudySessions></ViewAllStudySessions>
            },
            {
              path:'/dashboard/uploadMaterials',
              element: <UploadMaterials></UploadMaterials>
            },
            {
              path:'/dashboard/viewAllMaterials',
              element: <ViewAllMaterials></ViewAllMaterials>
            },
            {
              //TODO: this route is not work try letter
              path:'/dashboard/updateMaterial/:id',
              element: <PrivateRoute><UpdateMaterials></UpdateMaterials></PrivateRoute>,
              loader:({params})=> fetch(`https://collaborative-study-server.vercel.app/materials/${params.id}`)
            },
            //admin=====================================================================================
            {
              path: '/dashboard/viewAllUser',
              element: <AdminPrivate><ViewAllUser></ViewAllUser></AdminPrivate>
            },
            {
              path:'/dashboard/viewAllStudySession',
              element: <AdminPrivate><ViewAllStudySession></ViewAllStudySession></AdminPrivate>
            },
            {
              path:'/dashboard/viewAllMaterialsAdmin',
              element: <AdminPrivate> <ViewAllMaterialsAdmin></ViewAllMaterialsAdmin></AdminPrivate>
            },
            {
              path:'/dashboard/viewAllStudySession/viewStudyUpdate/:id',
              element:<AdminPrivate><UpdateSuccessSession></UpdateSuccessSession></AdminPrivate>,
            }

          ]
        }
      ]);


export default router;