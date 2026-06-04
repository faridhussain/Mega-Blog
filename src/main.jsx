import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/About.jsx";
import "react-toastify/dist/ReactToastify.css";

// define all application routes in one place
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <MyPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/about",
        element: <About />,
      },
      
      // catch all unknown routes and show custom 404 page
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// render application with redux store and router support
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);