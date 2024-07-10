/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useCompanyStore } from "../store/CompanyStore";
import { companyDepartmentType, companyType } from "../interface/interface";

export const SignupSchema = Yup.object({
  username: Yup.string()
    .min(2)
    .matches(/^\S*$/, "Username cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Username must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9]+$/, "Invalid username format")
    .required("Please enter username"),
  first_name: Yup.string()
    .matches(/^\S*$/, "Firstname cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Fistname must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9_]+$/, "Invalid firstname format")
    .required("Please enter first name"),
  last_name: Yup.string()
    .matches(/^\S*$/, "Lastname cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Lastname must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9_]+$/, "Invalid lastname format")
    .required("Please enter last name"),
  email: Yup.string()
    .email("Invalid email address")
    .test(
      "is-not-special-char-only",
      "Email cannot be composed only of special characters",
      (value) => value !== undefined && !/^[^a-zA-Z0-9.@]*$/.test(value)
    )
    .matches(/^\S*$/, "Email cannot contain spaces")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Please enter email"),
  gender: Yup.string().required("Please select an option"),
  password: Yup.string()
    .min(6)
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("Please enter password"),
  password2: Yup.string()
    .matches(/^\S*$/, "Confirm password cannot contain spaces")
    .required()
    .oneOf([Yup.ref("password"), ""], "Password must match")
    .required("Please enter confirm_password"),
});

export const LogInSchema = Yup.object({
  email_or_username: Yup.string()
    .min(2)
    .max(50)
    .matches(/^\S*$/, "Username cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Username Or Email must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9@.]+$/, "Invalid username or email format")
    .required("Please enter username Or email"),
  password: Yup.string()
    .min(6)
    .matches(/^\S*$/, "Email cannot contain spaces")
    .required("Please enter password"),
});

export const UserSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^\S*$/, "Firstname cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Fistname must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9_]+$/, "Invalid firstname format")
    .required("Please enter first name"),
  last_name: Yup.string()
    .matches(/^\S*$/, "Lastname cannot contain spaces")
    .matches(
      /([a-zA-Z])[a-zA-Z0-9]/,
      "Lastname must contain at least one letter"
    )
    .matches(/^[a-zA-Z0-9_]+$/, "Invalid lastname format")
    .required("Please enter last name"),
  gender: Yup.string().required("Please select an option"),
});
const allCompanies: any = useCompanyStore.getState().allCompanies;
const updateCompany: any = localStorage.getItem("company");
const companyData: companyType = JSON.parse(updateCompany);

export const CompanySchema = Yup.object({
  name: Yup.string()
    .matches(/([a-zA-Z])[a-zA-Z0-9]/, "Company name must contain letters")
    .matches(/^[a-zA-Z0-9\s,'-.]*$/, "Invalid characters")
    .test(
      "unique-name",
      "Name already exists",
      (value) =>
        !allCompanies.some(
          (company: any) =>
            company.name === value && company.id !== companyData.id
        )
    )
    .required("Please enter company name"),
  location: Yup.string()
    .min(2)
    .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters")
    .matches(/([a-zA-Z])[a-zA-Z0-9]/, "Company location must contain letters")
    .required("Please enter company location"),
  about: Yup.string()
    .matches(/([a-zA-Z])[a-zA-Z0-9]/, "about must contain letters")
    .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters")
    .required("Please enter company about"),
  type: Yup.string().required("Please select company type"),
});
const companyDepartment: any = useCompanyStore.getState().companyDepartment;
const updateDepart: any = localStorage.getItem("deparment");
const departmentData: companyDepartmentType = JSON.parse(updateDepart);

export const DepartmentSchema = Yup.object({
  name: Yup.string()
    .required("Please select department")
    .test(
      "Department name already exist",
      (value) =>
        !companyDepartment.some((department: any) =>
          department.name === value && departmentData == undefined
            ? true
            : department.id !== departmentData.id
        )
    ),
  description: Yup.string()
    .matches(/([a-zA-Z])[a-zA-Z0-9]/, "Description must contain letters")
    .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters")
    .required("Please enter description"),
});
export const AllDepartmentSchema = Yup.object({
  name: Yup.string().required("Please select department"),
  description: Yup.string()
    .matches(/([a-zA-Z])[a-zA-Z0-9]/, "Description must contain letters")
    .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters")
    .required("Please enter description"),
  company_id: Yup.string().required("Please select company name"),
});
