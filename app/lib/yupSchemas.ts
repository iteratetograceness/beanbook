import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).required(),
});

export const registerSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(4).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required(),
});

export const beanSchema = yup.object().shape({
  origin_name: yup.string().required(),
  price: yup.number(),
  roaster: yup.string(),
  producer: yup.string(),
  roast_date: yup.date(),
  variety: yup.string(),
  process: yup.string(),
  rating: yup.number().min(1).max(5).required(),
  notes: yup.string(),
  brew_method: yup.array().of(yup.string()),
  taste_tags: yup.array().of(yup.string()),
});