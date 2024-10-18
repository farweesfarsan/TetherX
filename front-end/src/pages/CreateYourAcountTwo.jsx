import React from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Steper from "../components/Steper";
import InputPassword2 from "../components/InputPassword2";
import backgroundImage from "../assets/tx501-1@2x.png";
import { useStep } from "../context/StepContext";
import { useFormData } from "../context/FormDataContext";
import { useEffect } from "react";

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  contact: Yup.string()
    .matches(/[0-9]/, "only digits")
    .max(10, "only 10 digits")
    .min(10, "minimum 10 digits")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lower letter")
    .matches(/[A-Z]/, "Password requires an upper letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
  retypepassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const CreateYourAccountTwo = () => {
  const { setCurrentStep } = useStep();
  const navigate = useNavigate();
  const { handleCreateAccount } = useFormData();

  useEffect(() => {
    
    // Disable scrolling when the component is mounted
    document.body.classList.add('no-scroll');

    // Enable scrolling when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);


  return (
    <div className="w-full min-h-screen bg-[#101010] flex flex-col justify-center items-center">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
        src={backgroundImage}
      />

      <div className="w-full h-full max-w-lg p-5 flex flex-col justify-center items-center relative md:p-10">
        <div className="flex flex-col justify-start items-center mb-5">
          <h1 className="font-roboto mt-[-10px] text-[24px] md:text-[25px] font-semibold leading-9 text-[#829BEF] text-center">
            Create Your Account
          </h1>
          <p className="font-roboto text-[13px] md:text-[13px] font-normal leading-5 text-white text-center mt-[-10px]">
            Your Secure Bridge to the World of USDT
          </p>
          <Steper />
        </div>

        <div className="w-full mt-[-20px] flex justify-center items-center">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              contact: "",
              password: "",
              retypepassword: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={(values) => {
              handleCreateAccount(values);
            }}
          >
            {({ handleChange, values }) => (
              <Form className="flex flex-col w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[600px] ml-[-70px]">
                  <InputField
                    label="First name"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    handleChange={handleChange}
                    values={values}
                  />
                  <InputField
                    label="Last name"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    handleChange={handleChange}
                    values={values}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[600px] ml-[-70px]">
                  <InputField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    handleChange={handleChange}
                    values={values}
                  />
                  <InputField
                    label="Contact"
                    name="contact"
                    type="text"
                    placeholder="Contact"
                    handleChange={handleChange}
                    values={values}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[600px] ml-[-70px]">
                  <InputPassword2
                    label="Password"
                    name="password"
                    placeholder="Password"
                    handleChange={handleChange}
                    values={values}
                  />
                  <InputPassword2
                    label="Re-enter Password"
                    name="retypepassword"
                    placeholder="Re-enter your password"
                    handleChange={handleChange}
                    values={values}
                  />
                </div>
                <PrimaryButton
                  label="Create Account"
                  bgcolor="linear-gradient(90deg, #2d469a, #1e9e8c)"
                  textcolor="#ffffff"
                  type="submit"
                  showArrow={true}
                />
                <div className="w-full flex justify-center">
                  <h5 className="text-[14px] text-[#ffff] mt-[-10px]">
                    Already have an account?{" "}
                    <span className="text-[#829BEF]">
                      <Link to="/">Login Now</Link>
                    </span>
                  </h5>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateYourAccountTwo;