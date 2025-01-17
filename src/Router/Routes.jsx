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
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children:[
            //student--------------------
            {
              path:'/dashboard/viewBookedSession',
              element: <ViewBookedSession></ViewBookedSession>
            },
            {
              path:'/dashboard/createNote',
              element: <CreateNote></CreateNote>
            },
            {
              path:'/dashboard/personalNotes',
              element: <ManagePersonalNotes></ManagePersonalNotes>
            },
            {
              path:'/dashboard/studyMaterials',
              element: <ViewAllStudyMaterials></ViewAllStudyMaterials>
            },
            //tutor----------------------
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
              loader:({params})=> fetch(`http://localhost:9000/materials/${params.id}`)
            },

          ]
        }
      ]);


export default router;