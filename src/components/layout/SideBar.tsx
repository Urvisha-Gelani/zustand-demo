import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { commonUser } from "../../common/Common";

function SideBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);
  return (
    <>
      <div className="">
        <h1 className="text-3xl text-blue-950">Welcome</h1>
        <div className="my-2">
          <div className="w-[17vw] mx-auto">
            <Link
              to="/users"
              className={`pl-[10px] py-[10px] text-blue-900 text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white ${
                activeLink === "/users"
                  ? "bg-[#304463] text-white"
                  : "bg-[#6c52760a] text-blue-900"
              }`}
              onClick={() => setActiveLink("/users")}
            >
              <HiOutlineUserGroup />
              <p className="ml-3 font-normal ">Users</p>
            </Link>
            <Link
              to="/profile"
              className={`pl-[10px] py-[10px] text-blue-900 text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white ${
                activeLink === "/profile"
                  ? "bg-[#304463] text-white"
                  : "bg-[#6c52760a] text-blue-900"
              }`}
              onClick={() => setActiveLink("/profile")}
            >
              <MdOutlineDashboard />
              <p className="ml-3 font-normal ">Dashboard</p>
            </Link>
            <Link
              to={commonUser()?.gender === "F" ? "/female-user" : "/male-user"}
              className={`pl-[10px] py-[10px] text-blue-900 text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white ${
                activeLink === (commonUser()?.gender === "F" ? "/female-user" : "/male-user")
                  ? "bg-[#304463] text-white"
                  : "bg-[#6c52760a] text-blue-900"
              }`}
              onClick={() => setActiveLink(commonUser()?.gender === "F" ? "/female-user" : "/male-user")}
            >
              <MdOutlineDashboard />
              <p className="ml-3 font-normal ">
                {commonUser()?.gender === "F" ? "Female Users" : "Male Users"}
              </p>
            </Link>
            <Link
              to="/companies"
              className={`pl-[10px] py-[10px] text-blue-900 text-[14px] hover:bg-[#304463] mt-[10px] flex flex-wrap items-center rounded-lg hover:text-white ${
                activeLink === "/companies"
                  ? "bg-[#304463] text-white"
                  : "bg-[#6c52760a] text-blue-900"
              }`}
              onClick={() => setActiveLink("/companies")}
            >
              <FaLayerGroup />
              <p className="ml-3 font-normal ">Companies</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
