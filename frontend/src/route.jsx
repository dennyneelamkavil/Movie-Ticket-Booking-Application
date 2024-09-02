import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element:<LoginPage/>
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
        element: <HomePage />,
      },
      {
        path: "movies/:movieId", // Dynamic route for movie details
        element: <MovieDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Route not found</div>,
  },
]);

export default router;
