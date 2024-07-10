import React from "react";
import { SlClose } from "react-icons/sl";
import { User } from "../../interface/interface";
import { convertedDate } from "../../common/Common";

export interface UserProfileProps {
  title: string;
  close?: (() => void) | undefined;
  data: User;
}
const UserProfile: React.FC<UserProfileProps> = ({ close, title, data }) => {
  return (
    <>
      <div className="">
        <div className="px-[15px] py-[15px]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-center w-[89%]">{title}</h1>
            <div className="text-3xl w-[4%] text-right">
              <SlClose onClick={() => close?.()} className="  text-2xl" />
            </div>
          </div>
          <div className="mt-[10px]">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Username :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {data.username}
                </p>
              </div>
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">First Name :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {data.first_name}
                </p>
              </div>
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Last Name :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {data.last_name}
                </p>
              </div>
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Gender :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {data.gender === "M"
                    ? "Male"
                    : data.gender === "F"
                    ? "Female"
                    : ""}
                </p>
              </div>
              <div className="w-[100%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Email :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {data.email}
                </p>
              </div>
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Created Date :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {convertedDate(data.created)}
                </p>
              </div>
              <div className="w-[45%] mt-[10px]">
                <p className=" px-[15px] text-[#304463]">Created Date :</p>
                <p className="py-[10px]  px-[15px] bg-[#6c52760a] text-blue-900 rounded-[8px]">
                  {convertedDate(data.updated)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
