import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TheaterOwnersList from "./pages/TheaterOwnersList.jsx";
import TheaterOwnerForm from "./pages/TheaterOwnerForm.jsx";
import TheaterForm from "./pages/TheaterForm.jsx";
import TheaterList from "./pages/TheaterList.jsx";
import ShowtimesList from "./pages/ShowtimesList.jsx";
import ShowtimesForm from "./pages/ShowtimesForm.jsx";
import MovieList from "./pages/MovieList.jsx";
import MovieForm from "./pages/MovieForm.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RouteNotFound from "./pages/RouteNotFound.jsx";
import PublicRoute from "./component/PublicRoute.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PaymentSuccessPage from "./pages/PaymentSuccessPage.jsx";
import PaymentCancelPage from "./pages/PaymentCancelPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Terms from "./pages/Terms.jsx";
import TheaterOwnerRequest from "./pages/TheaterOwnerRequest.jsx";
import RequestsList from "./pages/RequestsList.jsx";
import UserDashboard from "./component/UserDashboard.jsx";
import ContactMessages from "./pages/ContactMessages.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/movies",
        children: [
          { path: "", element: <UserDashboard /> },
          { path: ":movieId", element: <MovieDetails /> },
          { path: "book/:showtimeID", element: <BookingPage /> },
        ],
      },
      {
        path: "/payments",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin", "theaterOwner"]} />
        ),
        children: [
          { path: "", element: <PaymentPage /> },
          { path: "success", element: <PaymentSuccessPage /> },
          { path: "cancel", element: <PaymentCancelPage /> },
        ],
      },
      {
        path: "/partner",
        element: <TheaterOwnerRequest />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute allowedRoles={["admin", "theaterOwner"]} />,
        children: [
          {
            path: "theaterOwnersList",
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              { path: "", element: <TheaterOwnersList /> },
              { path: "add", element: <TheaterOwnerForm /> },
              { path: "edit/:id", element: <TheaterOwnerForm /> },
              { path: "requests", element: <RequestsList /> },
            ],
          },
          {
            path: "contactmessages",
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [{ path: "", element: <ContactMessages /> }],
          },
          {
            path: "theaters",
            children: [
              { path: "", element: <TheaterList /> },
              { path: "add", element: <TheaterForm /> },
              { path: "edit/:id", element: <TheaterForm /> },
            ],
          },
          {
            path: "showtimes",
            children: [
              { path: ":id", element: <ShowtimesList /> },
              { path: ":theaterID/add", element: <ShowtimesForm /> },
              {
                path: ":theaterID/edit/:showtimeID",
                element: <ShowtimesForm />,
              },
            ],
          },
          {
            path: "movies",
            children: [
              { path: "", element: <MovieList /> },
              { path: "add", element: <MovieForm /> },
              { path: "edit/:id", element: <MovieForm /> },
            ],
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "*",
        element: <RouteNotFound />,
      },
    ],
  },
]);

export default router;
