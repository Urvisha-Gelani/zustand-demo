import React, { useEffect } from "react";
import useAppStore from "../../store/AppStore";
import { useFormik } from "formik";
import { SignupSchema } from "../../vallidation/errorsSchema";

interface AddUserProps {
  title: string;
  close: () => void;
}
export interface SignupValues {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  password: string;
  password2: string;
}
const initialValues: SignupValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  password: "",
  password2: "",
};

const AddUser: React.FC<AddUserProps> = ({ title, close }) => {
  const { postUser, addUserData, hidePopUp, clear_inputErrors, getAllUsers } =
    useAppStore();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values: SignupValues) => {
      await postUser(values);
    },
  });

  useEffect(() => {
    if (addUserData.success) {
      close();
      getAllUsers();
      setTimeout(() => {
        hidePopUp();
      }, 2000);
    }
  }, [addUserData]);
  return (
    <>
      <div className="">
        <div className="px-[10px] py-[10px]">
          <div className="text-center">
            <h1 className="text-2xl">{title}</h1>
          </div>
          <div>
            <div className="">
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5 flex flex-wrap">
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      UserName{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        onInput={() => clear_inputErrors()}
                      />
                    </div>
                    {errors.username && touched.username ? (
                      <p className=" text-red-600">{errors.username}</p>
                    ) : null}
                    {addUserData.errors !== undefined ? (
                      <p className="text-red-600">
                        {addUserData.errors.username}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-2/4 margin-0">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      First Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.first_name && touched.first_name ? (
                      <p className=" text-red-600">{errors.first_name}</p>
                    ) : null}
                  </div>
                  <div className="w-2/4">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Last Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.last_name && touched.last_name ? (
                      <p className=" text-red-600">{errors.last_name}</p>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                    </div>
                    {errors.email && touched.email ? (
                      <p className=" text-red-600">{errors.email}</p>
                    ) : null}
                    {addUserData.errors !== undefined ? (
                      <p className="text-red-600">{addUserData.errors.email}</p>
                    ) : null}
                  </div>
                  <div className="w-3/4">
                    <div className="flex">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900 w-1/5"
                      >
                        {" "}
                        Gender{" "}
                      </label>

                      <div
                        role="group"
                        aria-labelledby="my-radio-group"
                        className="w-4/5 flex ml-3"
                      >
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="M"
                            onBlur={handleBlur}
                            checked={values.gender === "M" ? true : false}
                            onChange={getFieldProps("type").onChange}
                          />{" "}
                          Male{" "}
                        </label>
                        <label className="ml-3">
                          <input
                            type="radio"
                            name="gender"
                            value="F"
                            onBlur={handleBlur}
                            checked={values.gender === "F" ? true : false}
                            onChange={getFieldProps("type").onChange}
                          />{" "}
                          Female{" "}
                        </label>
                      </div>
                    </div>
                    {errors.gender && touched.gender ? (
                      <p className=" text-red-600">{errors.gender}</p>
                    ) : null}
                  </div>
                  <div className="w-2/4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <p className=" text-red-600">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="w-2/4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        name="password2"
                        value={values.password2}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                    </div>
                    {errors.password2 && touched.password2 ? (
                      <p className=" text-red-600">{errors.password2}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#E48700] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-yellow-800/80"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
