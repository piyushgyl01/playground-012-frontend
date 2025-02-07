import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { Provider } from "react-redux";

import { store } from "./app/store.js";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Movies from "./pages/Movies.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import EditMovie from "./pages/EditMovie.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/add-movie",
        element: <AddMovie />,
      },
      {
        path: "/movies/:id/:movieName/edit-movie",
        element: <EditMovie />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
