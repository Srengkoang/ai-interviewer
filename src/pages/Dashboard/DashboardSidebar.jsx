import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <div className="w-[20%] min-h-screen border-r">
      <div className="flex flex-col gap-4 pt-6 pl-[20%]">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-xl"
        >
          <img
            src=""
            alt=""
            className="w-6 h-6"
          />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
      </div>

      <div className="flex flex-col gap-4 pt-6 pl-[20%]">
        <NavLink
          to="/DashboardUsers"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-xl"
        >
          <img
            src=""
            alt=""
            className="w-6 h-6"
          />
          <p className="hidden md:block">Users</p>
        </NavLink>
      </div>

      <div className="flex flex-col gap-4 pt-6 pl-[20%]">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-xl"
        >
          <img
            src=""
            alt=""
            className="w-6 h-6"
          />
          <p className="hidden md:block">History</p>
        </NavLink>
      </div>

      <div className="flex flex-col gap-4 pt-6 pl-[20%]">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-xl"
        >
          <img
            src=""
            alt=""
            className="w-6 h-6"
          />
          <p className="hidden md:block">Setting</p>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;