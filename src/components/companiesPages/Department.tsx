import { ReactNode, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCompanyStore } from "../../store/CompanyStore";
import { companyDepartmentType } from "../../interface/interface";
import { convertedDate } from "../../common/Common";
import Spinner from "../Spinner/Spinner";
import ComDepartment from "../popup/ComDepartment";
import Popup from "reactjs-popup";
import Success from "../popup/Success";

function Department() {
  const { companyId } = useParams();
  const {
    company,
    getCompanyDepartment,
    companyDepartment,
    compnayLoading,
    departmentSuccess,
  } = useCompanyStore();

  useEffect(() => {
    getCompanyDepartment(Number(companyId));
  }, [companyId, getCompanyDepartment]);

  return (
    <>
      {console.log(departmentSuccess, "***success789")}
      <div>
        <div className="w-[500px] mx-auto absolute top-0 left-[36vw]">
          {departmentSuccess ? (
            <Success sucessfullMsg="Department added successfully" />
          ) : (
            ""
          )}
        </div>
        <div className="w-4/5 mx-auto py-4">
          {compnayLoading ? (
            <Spinner status={compnayLoading} />
          ) : (
            <div>
              <div className="flex flex-wrap justify-between">
                <div>
                  <Link to={`/companies/${companyId}`}>
                    <button className="rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right">
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                  </Link>
                </div>
                <div className="text-3xl">
                  <p>{company.name}</p>
                </div>
                <div>
                  <Popup
                    trigger={
                      <button
                        type="button"
                        className="rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"
                      >
                        + Add
                      </button>
                    }
                  >
                    {
                      ((close: () => void) => (
                        <ComDepartment
                          close={close}
                          title="Add Department"
                          id={Number(companyId)}
                        />
                      )) as unknown as ReactNode
                    }
                  </Popup>
                </div>
              </div>
              {(companyDepartment as companyDepartmentType[]).length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                  <p>No Company departments Found</p>
                </div>
              ) : (
                <div className="mt-5">
                  <table className="w-full">
                    <thead>
                      <tr className="text-center bg-sky-900 text-white">
                        <td className="border-2 border-white pt-2 pb-2">
                          Department Name
                        </td>
                        <td className="border-2 border-white">
                          Department description
                        </td>
                        <td className="border-2 border-white">Added Time</td>
                        <td className="border-2 border-white">Updated Time</td>
                        <td colSpan={3} className="border-2 border-white">
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {(companyDepartment as companyDepartmentType[]).map(
                        (departm) => (
                          <tr
                            className="text-center even:bg-blue-50 odd:bg-blue-100"
                            key={departm.id}
                          >
                            <td className="border-2 border-white pt-2 pb-2">
                              {departm.name}
                            </td>
                            <td className="border-2 border-white pt-2 pb-2">
                              {departm.description}
                            </td>
                            <td className="border-2 border-white pt-2 pb-2">
                              {convertedDate(departm.created)}
                            </td>
                            <td className="border-2 border-white pt-2 pb-2">
                              {convertedDate(departm.updated)}
                            </td>
                            {/* <Popup trigger={<td className='border-2 border-white px-2 py-3'><button
                                                type="button"
                                                className="fa-solid fa-pen-to-square text-sky-900 "
                                            >
                                            </button></td>}>
                                                {close => (
                                                    <DepartmentPopUp close={close} data={ele} title="Update department" page={currentPage} />
                                                )}
                                            </Popup>
                                            <Popup trigger={<td className='border-2 border-white px-2 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                                                {close => (
                                                    <DeleteCompanyPopUp close={close} id={ele.id} comapny_id={company().id} message="Are you sure you want to delete department?" page={currentPage} />
                                                )}
                                            </Popup> */}
                            {/* <td className='border-2 border-white px-2 py-3'><Link to={`/companies/${companyId}/departments/${ele.id}/employees`}><i className="fa-solid fa-eye"></i></Link></td> */}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Department;
