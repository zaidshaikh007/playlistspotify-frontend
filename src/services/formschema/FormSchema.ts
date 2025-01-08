import * as yup from "yup";

const emailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordExpression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").matches(
    emailExpression,
    "Enter valid email address"
  ),
  password: yup.string().required("Password is required"),
});

export const registrationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required().matches(
    emailExpression,
    "Enter valid email address"
  ),
  mobile: yup.string().required().matches(
    /^[0-9]{10}$/,
    "Phone number must be a 10-digit number"
  ),
  createPassword: yup.string().required().matches(passwordExpression, "Your password must be 8+ characters, with upper, lower, number, special, no spaces."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("createPassword")], "Passwords must be match"),
});

export const addPlaylistSchema = yup.object({
  title: yup.string().required("Title required"),
  description: yup.string().required("Description is required"),
});