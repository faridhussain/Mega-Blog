import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Header } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  // loading state used while checking if a user session already exists
  const [loading, setLoading] = useState(true);

  // dispatch is used to update authentication state in redux
  const dispatch = useDispatch();

  useEffect(() => {
    // check if user is already logged in when application starts
    authService
      .getCurrentUser()
      .then((userData) => {
        // store user data in redux if a session exists
        if (userData) {
          dispatch(login({ userData }));
        }

        // clear authentication state if no session exists
        else {
          dispatch(logout());
        }
      })

      // stop loading once authentication check is completed
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    // main application layout shown after authentication check
    <div className="min-h-screen bg-[#0A0A08] flex flex-col select-none">
      {/* application header shown on every page */}
      <Header />

      {/* renders the current route page */}
      <main className="grow">
        <Outlet />
      </main>

      {/* global toast notifications */}
      <ToastContainer />
    </div>
  ) : null;
}