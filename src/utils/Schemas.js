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

const OptionSchema = Yup.object().shape({
  option_text: Yup.string().required("Option text is required"),
});

const QuestionSchema = Yup.object().shape({
  question_desc: Yup.string().required("Question description is required"),
  question_type: Yup.string()
    .oneOf(["MCQ", "Short", "True Or False"], "Invalid question type")
    .required("Question type is required"),
  question_point: Yup.number()
    .positive("Marks must be a positive number")
    .required("Marks of question is required"),
  number_of_options: Yup.number().when("question_type", {
    is: (val) => val === "MCQ" || "True Or False",
    then: Yup.number()
      .positive("Number of options must be a positive number")
      .required("Number of options is required"),
    otherwise: Yup.number().notRequired(),
  }),
  correct_ans: Yup.string().when("question_type", {
    is: (val) => val === "MCQ" || "True Or False",
    then: Yup.string().required("Correct Answer is required"),
    otherwise: Yup.number().notRequired(),
  }),
  options: Yup.array()
    .of(OptionSchema)
    .min(2, "There must be atleast 2 options")
    .required(),
});

export { LoginSchema, SignUpSchema, QuestionSchema };
