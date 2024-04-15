import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),

  companyName: Yup.string().when("activeForm", {
    is: "Employer",
    then: Yup.string().required("Required"),
  }),
  country: Yup.string().required("Required"),
  contactNumber: Yup.string().required("Required"),
});

export { LoginSchema, SignUpSchema };
