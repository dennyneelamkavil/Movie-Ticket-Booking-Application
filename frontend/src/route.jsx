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

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
        ],
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
              { path: "", element: <ShowtimesList /> },
              { path: "add", element: <ShowtimesForm /> },
              { path: "edit/:id", element: <ShowtimesForm /> },
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
