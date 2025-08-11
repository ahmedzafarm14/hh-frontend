import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import EnterCode from "./Pages/ForgotPassword/EnterCode.jsx";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";
import Advertisement from "./Pages/Advertisement/Advertisement.jsx";
import HostelManagement from "./Pages/HostelManagement/HostelManagement.jsx";
import BookingsHistory from "./Pages/BookingsHistory/BookingsHistory.jsx";
import BookingsHistoryOwner from "./Pages/BookingsHistory/BookingsHistoryOwner.jsx";
import Chat from "./Pages/Chat/Chats.jsx";
import LandLayout from "./Layout/LandLayout.jsx";
import LandingPage from "./Pages/Landing Page/index.jsx";
import Hostels from "./Pages/Landing Page/Hostels.jsx";
import HostelDetails from "./Components/HostelDetails.jsx";
import RoomDetails from "./Components/RoomDetails.jsx";
import Reserve from "./Components/Reserve.jsx";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user);

  return (
    <Routes>
      {/* Public-facing routes (not for owners) */}
      {role !== "owner" && (
        <Route element={<LandLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route
            path="/contact"
            element={
              <div className="flex items-center justify-center text-white h-screen">
                contact
              </div>
            }
          />
          <Route path="/hostel-details" element={<HostelDetails />} />
          <Route path="/room-details" element={<RoomDetails />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/bookings-history" element={<BookingsHistory />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      )}

      {/* Auth routes - only when not logged in */}
      <Route
        path="/login"
        element={
          role === "owner" ? (
            <Navigate to="/management" replace />
          ) : role === "resident" ? (
            <Navigate to="/hostels" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/signup"
        element={
          role === "owner" ? (
            <Navigate to="/management" replace />
          ) : role === "resident" ? (
            <Navigate to="/hostels" replace />
          ) : (
            <Signup />
          )
        }
      />

      {/* Password reset routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/enter-code" element={<EnterCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Owner-specific routes */}
      {role === "owner" && (
        <>
          <Route
            path="/management"
            element={
              <Layout>
                <HostelManagement />
              </Layout>
            }
          />
          <Route path="/" element={<Navigate to={"/management"} replace />} />
          <Route
            path="/bookings"
            element={
              <Layout>
                <BookingsHistoryOwner />
              </Layout>
            }
          />
          <Route
            path="/advertising"
            element={
              <Layout>
                <Advertisement />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <Chat />
              </Layout>
            }
          />
        </>
      )}

      {/* Only for logged-in users */}
      {user && Object.keys(user).length > 0 && (
        <>
          <Route
            path="/edit-profile"
            element={
              <Layout>
                <EditProfile />
              </Layout>
            }
          />
        </>
      )}

      {/* Catch-all route (404) */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-2">Page Not Found</p>
            <p className="text-lg text-gray-400 mb-6">
              The page you're looking for doesn't seem to exist.
            </p>
            <Link
              to="/"
              className="bg-PrimaryColor text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition"
            >
              Go Home
            </Link>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
