import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import LoginPage from "./pages/LoginPage";
import TheaterOwnersList from "./pages/TheaterOwnersList";
import TheaterOwnerForm from "./pages/TheaterOwnerForm";
import TheaterForm from "./pages/TheaterForm";
import TheaterList from "./pages/TheaterList";
import ShowtimesList from "./pages/ShowtimesList";
import ShowtimesForm from "./pages/ShowtimesForm";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import ProtectedRoute from "./component/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import RouteNotFound from "./pages/RouteNotFound";
import PublicRoute from "./component/PublicRoute";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";

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
        path: "/movies",
        children: [
          { path: "", element: <HomePage /> },
          { path: ":movieId", element: <MovieDetails /> },
          { path: "book/:showtimeID", element: <BookingPage /> },
        ],
      },
      {
        path: "/payments",
        element: <PaymentPage />,},
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
            ],
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
              { path: ":theaterID/edit/:showtimeID", element: <ShowtimesForm /> },
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
