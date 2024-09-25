import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import Button from './Button';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputPassword from './InputPassword';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lower letter")
    .required("Required")
});

  const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError,setLoginError] = useState(null);

  const handleLogin = async (values) => {
    try {
      console.log(values);
      const response = await axios.post('http://localhost:3001/usersLogin', values);
      // const token = response.data.token;
      const {token,role} = response.data;
  
      console.log('Auth token is', token);
      console.log('Role is',role);

      // Set token in a cookie with an expiration time of 10 minutes
    //  Cookies.set('auth token',token,{expires: 10 / (24 * 60)});
      localStorage.setItem('token', token);
      console.log('Auth token',token);
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 10 * 60 * 1000);
        
      if(role === "Seller"){
         // Navigate to the home page
          navigate('/Dashboard');
      }else{
          navigate('/buyerDash');
      } 
     } catch (error) {
      if(error.response.status === 401){
           if(error.response.data.error === 'User not found'){
            console.log('Seller not found');
            setLoginError("Seller not found");
            toast.error("Seller not found!");
           } else if(error.response.data.error === 'Invalid Password'){
              console.log("Invalid Password!");
              setLoginError("Invalid Password!");
              toast.error("Invalid Password");
           }
           
      } else {
           console.log('Internal Server Error');
           setLoginError("Something Went Wrong!");
          toast.error("Something Went Wrong");
          
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, values }) => (
        <Form className="flex flex-col  w-full space-y-1 md:lg:sm:space-y-4">
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            handleChange={handleChange}
            values={values}
          />
          <InputPassword
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            values={values}
            className="flex-grow font-roboto h-full p-2 bg-transparent outline-none text-[12px] md:lg:text-[14px]   text-[#ffffff]"
          />

              
          <div className="flex flex-row items-center justify-between gap-[20px]">
            <div className="flex flex-row items-center justify-start py-[0px] pr-[46px] pl-[0px] gap-[4px]">
              <div className="flex flex-row items-start justify-start">
                <div className="rounded-13xl flex flex-row items-center justify-center p-[4px]">
                  <div>
                    <Checkbox className='m-0 relative text-[24px] leading-[100%] font-normal font-icon-medium
                     text-secondary text-center inline-block min-w-[24px] mq450:text-[19px] mq450:leading-[19px]' />
                  </div>
                </div>
              </div>
              <div className="relative text-[12px] font-body text-white text-center inline-block min-w-[79px]">
                Remember Me
              </div>
            </div>
            <div className="h-[10px] relative text-[14px] tracking-[0.15px] leading-[16px] capitalize font-medium font-body
             text-text-headings text-left inline-block min-w-[116px]">
               Forgot Password?
            </div>
          </div>
          <Button type="submit" />

          {loginError && (
              <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
              />
              )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;