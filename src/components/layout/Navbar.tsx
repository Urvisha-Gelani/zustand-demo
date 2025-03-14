import { useEffect, useState } from "react";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import useAppStore from "../../store/AppStore";
import { IoIosArrowDown, IoIosArrowUp, IoMdSettings } from "react-icons/io";
import { ImSwitch } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Delete from "../popup/Delete";

function Navbar() {
  const [dropDown, setDropdown] = useState<boolean>(false);
  const { getUser, user } = useAppStore();
  const navigate = useNavigate()
  const loggedInUser = Array.isArray(user) ? user[0] : user;
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/")
  };
  const handleClick = () => {
    setDropdown(!dropDown);
  };
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <div className="pl-4 page-box-shadow bg-white rounded-b-lg">
        <div className="w-full h-[60px] ">
          <div className="flex flex-wrap justify-end items-center h-full">
            <div className="w-[10vw]  bg-[#304463] text-[#ffffff] rounded-[8px] py-[5px]">
              <div className="flex flex-wrap w-full items-center justify-between">
                <div className="w-[25%] px-[5px]">
                  <div className="w-full  text-2xl">
                    <FaUserCircle />
                  </div>
                </div>
                <div
                  className="w-[75%] flex items-center justify-evenly cursor-pointer"
                  onClick={() => setDropdown(!dropDown)}
                >
                  <p className="">{loggedInUser?.first_name} </p>
                  {!dropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dropDown ? (
        <div
          className="w-[130px] bg-white box-shadow absolute top-[3.5vw] right-[0.25vw]"
          onClick={() => setDropdown(!dropDown)}
        >
          <div className="px-[3px] py-[6px] text-center text-[15px] bg-[#F4F6FF] hover:bg[#CDE8E5]">
            <Link
              to="/profile"
              className="mb-[3px] px-[3px] py-[3px] flex items-center justify-evenly w-[108px] mx-auto cursor-pointer"
              onClick={handleClick}
            >
              <FaRegUser />
              <p>Profile</p>
            </Link>
            <Link
              to="/settings"
              className="mb-[3px] px-[3px] py-[3px] flex items-center justify-evenly w-[108px] mx-auto cursor-pointer"
            >
              <IoMdSettings />
              <p>Setting</p>
            </Link>
            <Popup
              trigger={
                <div className="px-[3px] py-[3px] flex items-center justify-evenly w-[108px] mx-auto cursor-pointer">
                  <ImSwitch />
                  <p>Log out</p>
                </div>
              }
            >
              {
                ((close: () => void) => (
                  <Delete
                    close={close}
                    message="Are you sure you want to log out?"
                    deleteUse={logout}
                  />
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any
              }
            </Popup>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
