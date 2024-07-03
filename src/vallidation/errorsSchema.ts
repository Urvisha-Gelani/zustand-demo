import * as Yup from "yup";

export const SignupSchema = Yup.object({
    username: Yup.string().min(2).matches(/^\S*$/, 'Username cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Username must contain at least one letter').matches(/^[a-zA-Z0-9]+$/, "Invalid username format").required("Please enter username"),
    first_name: Yup.string().matches(/^\S*$/, 'Firstname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Fistname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid firstname format").required("Please enter first name"),
    last_name: Yup.string().matches(/^\S*$/, 'Lastname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Lastname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid lastname format").required("Please enter last name"),
    email: Yup.string().email('Invalid email address').test(
        'is-not-special-char-only',
        'Email cannot be composed only of special characters',
        value => !/^[^a-zA-Z0-9.@]*$/.test(value) // Ensure the email isn't made up solely of special characters
    ).matches(/^\S*$/, 'Email cannot contain spaces').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address').required("Please enter email"),
    gender: Yup.string().required('Please select an option'),
    password: Yup.string().min(6).matches(/^\S*$/, 'Password cannot contain spaces').required("Please enter password"),
    password2: Yup.string().matches(/^\S*$/, 'Confirm password cannot contain spaces').required().oneOf([Yup.ref('password'), ""], "Password must match").required("Please enter confirm_password")
})

export const LogInSchema = Yup.object({
    email_or_username: Yup.string().min(2).max(50).matches(/^\S*$/, 'Username cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Username Or Email must contain at least one letter').matches(/^[a-zA-Z0-9@.]+$/, "Invalid username or email format").required("Please enter username Or email"),
    password: Yup.string().min(6).matches(/^\S*$/, 'Email cannot contain spaces').required("Please enter password"),
})

export const UserSchema = Yup.object({
    first_name: Yup.string().matches(/^\S*$/, 'Firstname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Fistname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid firstname format").required("Please enter first name"),
    last_name: Yup.string().matches(/^\S*$/, 'Lastname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Lastname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid lastname format").required("Please enter last name"),
    gender: Yup.string().required('Please select an option'),

})

