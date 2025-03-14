/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import useAppStore from "../../store/AppStore";
import Spinner from "../Spinner/Spinner";
import { SlClose } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { UserType } from "./Update";

const Profile = () => {
  const localdata: any = localStorage.getItem("User");
  const localUser: UserType = JSON.parse(localdata);
  // const localUser = JSON.parse(localStorage.getItem("User"))
  const { getUser, loading } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      {console.log(localUser)}
      {loading ? (
        <div className=" absolute position-ab opacity-[1] z-[3]">
          <Spinner status={loading} />
        </div>
      ) : (
        <div className="w-[600px] mx-auto py-4 my-auto ">
          <div className="bg-[#cfcfcf7d] page-box-shadow py-5 rounded-xl">
            <div className="text-[#071952] flex flex-wrap items-center text-3xl">
              <h1 className=" text-center w-[90%]">Profile</h1>
              <SlClose
                onClick={() => navigate("/users")}
                className="w-[4%] text-right text-2xl"
              />
            </div>
            <div className="px-[20px] py-[3px] pb-[5px] flex flex-wrap justify-between items-center">
              <div className="w-[48%]">
                <p className="mt-[5px]">Username :</p>
                <p className="px-[10px] py-[6px] rounded-[8px] bg-[#ffffff] my-[5px] text-blue-900">
                  {localUser.username}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="mt-[5px]">First Name :</p>
                <p className="px-[10px] py-[6px] rounded-[8px] bg-[#ffffff] my-[5px] text-blue-900">
                  {localUser.first_name}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="mt-[5px]">Last Name :</p>
                <p className="px-[10px] py-[6px] rounded-[8px] bg-[#ffffff] my-[5px] text-blue-900">
                  {localUser.last_name}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="mt-[5px]">Gender :</p>
                <p className="px-[10px] py-[6px] rounded-[8px] bg-[#ffffff] my-[5px] text-blue-900">
                  {localUser.gender === "M" ? "Male" : "Female"}
                </p>
              </div>
              <div className="w-full">
                <p className="mt-[5px]">Email :</p>
                <p className="px-[10px] py-[6px] rounded-[8px] bg-[#ffffff] my-[5px] text-blue-900">
                  {localUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
