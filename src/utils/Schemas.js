import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  name: Yup.string().required("Required"),

  country: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Contact number must contain only numbers")
    .required("Required"),
});

export { LoginSchema, SignUpSchema };
