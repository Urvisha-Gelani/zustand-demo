/* eslint-disable @typescript-eslint/no-explicit-any */
import Popup from "reactjs-popup";
import { FaLayerGroup, FaRegTrashAlt } from "react-icons/fa";
import { ReactNode, useEffect, useState } from "react";
import { useCompanyStore } from "../../store/CompanyStore";
import { companyType } from "../../interface/interface";
import Spinner from "../Spinner/Spinner";
import { convertedDate } from "../../common/Common";
import Company from "../popup/Company";
// import ReactPaginate from 'react-paginate';
import Success from "../popup/Success";
import { BiEdit, BiShow } from "react-icons/bi";
import Delete from "../popup/Delete";
// import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Link } from "react-router-dom";

function Companies() {
  const [currentPage] = useState<number>(1);
  const {
    getAllComapnies,
    allCompanies,
    compnayLoading,
    success,
    hideCompanyPopUp,
    companyDelete,
  } = useCompanyStore();
  const deleteCompanies = (id: any) => {
    companyDelete(id, currentPage);
  };
  if (success) {
    setTimeout(() => {
      hideCompanyPopUp();
    }, 2000);
  }
  // const handlePagination = (data: any) => {
  //   setCurrentPage(data.selected + 1)
  //   getAllComapnies(data.selected + 1)
  // }
  useEffect(() => {
    getAllComapnies(currentPage);
  }, [getAllComapnies, currentPage]);

  return (
    <>
      <div>
        <div className="w-[500px] mx-auto absolute top-0 left-[36vw]">
          {success ? (
            <Success sucessfullMsg="Company added successfully" />
          ) : (
            ""
          )}
        </div>
        <div className="px-[10px] py-[10px]">
          <div className="flex flex-wrap justify-between items-center ">
            <div className="w-[25%] text-3xl text-[#304463]">
              <h1>Companies</h1>
            </div>
            {/* <div className='w-[60%]'>
                            <input className='flex h-10 w-11/12 rounded-md border  bg-[#f7f6e8] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                placeholder='Search...' />
                        </div> */}
            <div
              className={`w-[10%] ${
                allCompanies.length === 0 && currentPage > 1
                  ? "hidden"
                  : "block"
              }`}
            >
              <Popup
                trigger={
                  <button className="px-[10px] py-[9px] w-full bg-[#304463] text-white rounded-[8px] flex items-center justify-center gap-[8px] text-[15px]">
                    <span> Add </span>
                    <FaLayerGroup className=" text-[20px]" />
                  </button>
                }
              >
                {
                  ((close: () => void) => (
                    <Company
                      close={close}
                      title="Add Company"
                      page={currentPage}
                    />
                  )) as any
                }
              </Popup>
            </div>
          </div>
          <div className="">
            <div className="overflow-x-auto  scrollbar-custom w-[95%] mx-auto">
              {compnayLoading ? (
                <div className=" absolute position-ab opacity-[1] z-[3]">
                  <Spinner status={compnayLoading} />
                </div>
              ) : (
                <div className="mt-[20px]">
                  {allCompanies.length === 0 ? (
                    <div className="text-center  text-gray-400">
                      <p>No Companies Found</p>
                    </div>
                  ) : (
                    <table className="w-[70vw] px-[10px] mx-auto text-center table-striped border mt-[15px]">
                      <thead className="">
                        <tr className="">
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            Name
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            Type
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            Location
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            About
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            Created
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px]">
                            Updated
                          </th>
                          <th className="border-b-2 border-gray-300 border-2 px-[5px] py-[15px] sticky top-0 right-[-9px]  bg-white ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(allCompanies as companyType).map(
                          (company: companyType) => {
                            return (
                              <tr key={company.id} className="py-[15px]">
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {company.name}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {company.type}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {company.location}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {company.about}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {convertedDate(company.created)}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px]">
                                  {convertedDate(company.updated)}
                                </td>
                                <td className="border-b border-gray-300 border-2  px-px-[5px] py-[15px] text-[18px] sticky top-0 right-[-9px] bg-inherit">
                                  <Popup
                                    trigger={
                                      <button className="px-[10px] ">
                                        <BiEdit />
                                      </button>
                                    }
                                  >
                                    {
                                      ((close: () => void) => (
                                        <Company
                                          close={close}
                                          title="Update User"
                                          data={company}
                                          page={currentPage}
                                        />
                                      )) as unknown as ReactNode
                                    }
                                  </Popup>

                                  <Link to={`/companies/${company.id}`}>
                                    <button className="px-[10px]">
                                      <BiShow />
                                    </button>
                                  </Link>

                                  <Popup
                                    trigger={
                                      <button className="px-[10px]">
                                        <FaRegTrashAlt />
                                      </button>
                                    }
                                  >
                                    {
                                      ((close: () => void) => (
                                        <Delete
                                          close={close}
                                          message="Are you sure you want to delete user?"
                                          id={Number(company.id)}
                                          deleteUse={() =>
                                            deleteCompanies(company.id)
                                          }
                                        />
                                      )) as unknown as ReactNode
                                    }
                                  </Popup>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className='w-3/5 mx-auto mt-5'>

          <ReactPaginate
            nextLabel={<MdSkipNext />}
            previousLabel={<MdSkipPrevious />}
            breakLabel={'...'}
            pageCount={5}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePagination}
            previousClassName={'mx-1 flex items-center text-[20px] rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 bg-[#304463] text-white'}
            nextClassName={'mx-1 flex items-center text-[20px] rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 bg-[#304463] text-white'}
            activeLinkClassName={'bg-blue-600 text-white'}
            containerClassName={'flex items-center justify-center'}
            pageLinkClassName={'mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'}

          />
        </div> */}
      </div>
    </>
  );
}

export default Companies;
