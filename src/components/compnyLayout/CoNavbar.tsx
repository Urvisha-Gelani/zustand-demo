import { ReactNode } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import Delete from "../popup/Delete";

function CoNavbar() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/Signin");
    localStorage.clear();
  };
  return (
    <>
      <div className="w-full bg-blue-950 sticky top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              <li>
                <Link
                  to={`/companies/${companyId}`}
                  className="text-sm font-semibold  hover:text-white-900 text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/companies/${companyId}/departments`}
                  className="text-sm font-semibold hover:text-white-900 text-white"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  to={`/companies/${companyId}/employees`}
                  className="text-sm font-semibold hover:text-white-900 text-white"
                >
                  Employees
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Popup
              trigger={
                <button
                  type="button"
                  className="rounded-md px-5 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                >
                  Log Out
                </button>
              }
            >
              {
                ((close: () => void) => (
                  <Delete
                    close={close}
                    message="Are you sure you want to logout?"
                    deleteUse={() => logout()}
                    id={0}
                  />
                )) as unknown as ReactNode
              }
            </Popup>
          </div>
        </div>
      </div>
      <div className="my-[20px]">
        <Outlet />
      </div>
    </>
  );
}

export default CoNavbar;
