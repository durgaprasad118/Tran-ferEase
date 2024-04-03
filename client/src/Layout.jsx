import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import ProtectedRoute from "./hooks/AuthProvider";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SendMoney from "./pages/SendMoney";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainView />}>
          <Route
            path="/dash"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send/:id"
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const MainView = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
