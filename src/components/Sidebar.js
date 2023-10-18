import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/4 flex flex-col p-10">
      <NavLink to="/dashboard">
        <div className="flex gap-x-4">
          {/* avatar */}
          <h1 className="font-bold">ZeeTask</h1>
        </div>
      </NavLink>

      {/* navigation tabs */}
      <nav className="flex flex-col gap-y-5 mt-10">
        <NavLink to="/dashboard/team">
          <div>
            <p>Team</p>
          </div>
        </NavLink>

        <NavLink to="/dashboard/tasks">
          <div>
            <p>Tasks</p>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
