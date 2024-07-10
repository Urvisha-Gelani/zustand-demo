/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AllDepartmentSchema,
  DepartmentSchema,
} from "../../vallidation/errorsSchema";
import { useFormik } from "formik";
import Select from "react-select";
import {
  companyDepartmentType,
  companyType,
  departmentCompanies,
} from "../../interface/interface";
import { useCompanyStore } from "../../store/CompanyStore";
interface ComDepartmentProps {
  close: () => void;
  data?: companyDepartmentType | undefined;
  id: number | string;
  title: string;
  companies?: companyType;
}
const ComDepartment: React.FC<ComDepartmentProps> = ({
  close,
  data,
  id,
  title,
  companies,
}) => {
  // if(data === undefined) {
  //     localStorage.setItem("department" , JSON.parse(""))
  // }else {
  // localStorage.setItem("deparment" , JSON.stringify(data))
  // }

  const options = [
    { value: "Human Resources", label: "Human Resources" },
    { value: "Marketing and Sales", label: "Marketing and Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Production/Operations", label: "Production/Operations" },
    { value: "Research and Development", label: "Research and Development" },
    { value: "Customer Service", label: "Customer Service" },
  ];
  const initialValues: departmentCompanies = {
    name: data === undefined ? "" : data.name,
    description: data === undefined ? "" : data.description,
    company_id: id,
  };
  const { addCompanyDepartment, companyError } = useCompanyStore();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema:
      companies === undefined ? DepartmentSchema : AllDepartmentSchema,
    onSubmit: (values) => {
      console.log(values);
      addCompanyDepartment(values, Number(values.company_id));
      // const departments = (companies === undefined) ? {
      //     name: values.name,
      //     description: values.description,
      //     company_id: id
      // } : {
      //     name: values.name,
      //     description: values.description,
      //     company_id: values.company_id
      // };
      // if (data === undefined) {
      //     dispatch(departmentAPI({ value: departments, page: props.page, companies: props.companies }))
      // } else {
      //     dispatch(updateDepartAPI({ id: props.data.id, value: departments, page: props.page, companies: props.companies }))
      // }
    },
  });

  // useEffect(() => {
  //     if (departmentSuccess && data === undefined) {
  //         close()
  //     }
  // }, [departmentSuccess])
  return (
    <>
      {/* {console.log(departmentSuccess , "***success")} */}
      <div className="modal w-full">
        <div>
          <div className="flex justify-between text-center">
            <h1 className="w-11/12 text-center text-2xl">
              <b>{title}</b>
            </h1>
          </div>
          <div>
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="space-y-5 pb-3">
                <div>
                  <label
                    htmlFor="address"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Department Name{" "}
                  </label>
                  <div className="mt-1">
                    <Select
                      options={options}
                      // type={"text"}
                      name="name"
                      value={values.FieldValue}
                      onChange={(selectedOption) => {
                        setFieldValue(
                          "name",
                          selectedOption.value ? selectedOption.value : ""
                        );
                      }}
                      // onFocus={() => dispatch(clearComapnyError())}
                      defaultValue={
                        data !== undefined
                          ? options
                            ? options.find(
                                (option) => option.value === data.name
                              )
                            : ""
                          : ""
                      }
                    />
                    {errors.name && touched.name ? (
                      <p className=" text-red-600">{errors.name}</p>
                    ) : null}
                    {companyError !== "" && data === undefined ? (
                      <p className="text-red-600">{companyError}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="space-y-5 pb-3">
                <div>
                  <label
                    htmlFor="address"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Description{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      // cols="30"
                      placeholder="About"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="address"
                      autoComplete="off"
                    />
                    {errors.description && touched.description ? (
                      <p className=" text-red-600">{errors.description}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              {companies !== undefined ? (
                <div className="space-y-5 pb-3">
                  <div>
                    <label
                      htmlFor="company"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Company{" "}
                    </label>
                    <div className="mt-1">
                      <select
                        id="company"
                        name="company_id"
                        value={values.company_id}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => {
                          setFieldValue("company_id", e.target.value);
                        }}
                      >
                        <option>Select</option>
                        {companies.map((ele: any) => {
                          return (
                            <option
                              value={ele.id}
                              key={ele.id}
                              className="mb-4"
                            >
                              {ele.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors.company_id && touched.company_id ? (
                        <p className=" text-red-600">{errors.company_id}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="mt-3 gap-1 text-center flex flex-wrap justify-center">
                <button
                  type="submit"
                  className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5 "
                >
                  {data === undefined ? "Add" : "Update"}
                </button>
                <button
                  type="submit"
                  className="relative inline-flex  items-center justify-center 
                                                 bg-red-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:text-black focus:bg-black-100 focus:text-black w-1/5"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComDepartment;
