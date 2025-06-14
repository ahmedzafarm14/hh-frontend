import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes.jsx";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {
        <AppRoutes
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      }
    </Router>
  );
}

export default App;
