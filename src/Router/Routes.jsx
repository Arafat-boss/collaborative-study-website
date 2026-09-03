import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import CreateStudySession from "../Pages/Dashboard/TutorDashboard/CreateStudySession";
import PrivateRoute from "./PrivateRoute";
import TutorPrivate from "./TutorPrivate";
import AdminPrivate from "./AdminPrivate";
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
import SalesAnalytics from "../Pages/Dashboard/AdminDashbord/SalesAnalytics";
import Welcome from "../Components/Welcome";
import CardDetails from "../Pages/Home/CardDetails";
import UpdateSuccessSession from "../Pages/Dashboard/AdminDashbord/UpdateSuccessSession";
import Payment from "../Pages/Home/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const apiUrl = import.meta.env.VITE_API_URL || "https://collaborative-study-server-az9x.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${apiUrl}/study/${params.id}`),
      },
      {
        path: "/cardDetails/:id",
        element: (
          <PrivateRoute>
            <CardDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${apiUrl}/study/${params.id}`),
      },
    ],
  },
  // -------------- Dashboard --------------
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      // student
      {
        path: "/dashboard/viewBookedSession",
        element: (
          <PrivateRoute>
            <ViewBookedSession />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/createNote",
        element: (
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/personalNotes",
        element: (
          <PrivateRoute>
            <ManagePersonalNotes />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/studyMaterials",
        element: (
          <PrivateRoute>
            <ViewAllStudyMaterials />
          </PrivateRoute>
        ),
      },
      // tutor
      {
        path: "/dashboard/createStudySession",
        element: (
          <TutorPrivate>
            <CreateStudySession />
          </TutorPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllStudySessions",
        element: (
          <TutorPrivate>
            <ViewAllStudySessions />
          </TutorPrivate>
        ),
      },
      {
        path: "/dashboard/uploadMaterials",
        element: (
          <TutorPrivate>
            <UploadMaterials />
          </TutorPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllMaterials",
        element: (
          <TutorPrivate>
            <ViewAllMaterials />
          </TutorPrivate>
        ),
      },
      {
        path: "/dashboard/updateMaterial/:id",
        element: (
          <TutorPrivate>
            <UpdateMaterials />
          </TutorPrivate>
        ),
        loader: ({ params }) => fetch(`${apiUrl}/materials/${params.id}`),
      },
      // admin
      {
        path: "/dashboard/salesAnalytics",
        element: (
          <AdminPrivate>
            <SalesAnalytics />
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllUser",
        element: (
          <AdminPrivate>
            <ViewAllUser />
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllStudySession",
        element: (
          <AdminPrivate>
            <ViewAllStudySession />
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllMaterialsAdmin",
        element: (
          <AdminPrivate>
            <ViewAllMaterialsAdmin />
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/viewAllStudySession/viewStudyUpdate/:id",
        element: (
          <AdminPrivate>
            <UpdateSuccessSession />
          </AdminPrivate>
        ),
      },
    ],
  },
]);

export default router;