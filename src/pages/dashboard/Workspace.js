import React from "react";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Team from "./Team";
import Tasks from "./Tasks";

const Workspace = () => {
  return (
    <div className="min-h-screen flex">
      {/* sidebar */}
      <Sidebar />

      {/* workspace */}
      <div className="w-3/4 bg-white flex">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="tasks" element={<Tasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Workspace;
