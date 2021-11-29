import * as yup from "yup";

// create a new schema file later
export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).required(),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(4).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required(),
});