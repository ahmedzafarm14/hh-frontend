import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import EnterCode from "./Pages/ForgotPassword/EnterCode.jsx";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import Chat from "./Pages/Chat/Chats.jsx";
import Advertising from "./Pages/Chat/Chats.jsx";
import Management from "./Pages/Management/Management.jsx";
import { Role } from "./Utlis/constants.js";
import LandLayout from "./Layout/LandLayout.jsx";
import LandingPage from "./Pages/Landing Page/index.jsx";
import Hostels from "./Pages/Landing Page/Hostels.jsx";
import HostelDetails from "./Components/HostelDetails.jsx";
import RoomDetails from "./Components/RoomDetails.jsx";
import Reserve from "./Components/Reserve.jsx";

const AppRoutes = ({ isSidebarOpen, toggleSidebar, role = Role }) => {
  return (
    <Routes>
      {/* Common routes */}
      <Route element={<LandLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/contact" element={<div>contact</div>} />
        <Route path="/hostel-details" element={<HostelDetails />} />
        <Route path="/room-details" element={<RoomDetails />} />
        <Route path="/reserve" element={<Reserve />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/enter-code" element={<EnterCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Conditional rendering based on user role */}
      {role === "owner" ? (
        <React.Fragment>
          <Route
            path="/registration"
            element={
              <Layout
                layoutType="owner"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Registration />
              </Layout>
            }
          />
          <Route
            path="/management"
            element={
              <Layout
                layoutType="owner"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Management />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout
                layoutType="owner"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Chat />
              </Layout>
            }
          />
          <Route
            path="/advertising"
            element={
              <Layout
                layoutType="owner"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Advertising />
              </Layout>
            }
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route
            path="/registration"
            element={
              <Layout
                layoutType="client"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Registration />
              </Layout>
            }
          />
          <Route
            path="/management"
            element={
              <Layout
                layoutType="client"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Management />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout
                layoutType="client"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Chat />
              </Layout>
            }
          />
          <Route
            path="/advertising"
            element={
              <Layout
                layoutType="client"
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              >
                <Advertising />
              </Layout>
            }
          />
        </React.Fragment>
      )}

      {/* Catch-all route for 404 error page */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
