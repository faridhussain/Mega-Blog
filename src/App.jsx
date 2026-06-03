import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Header } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-[#0A0A08] flex flex-col select-none">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  ) : null;
}
