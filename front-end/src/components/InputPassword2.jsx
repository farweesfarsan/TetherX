import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function InputPassword2({
  label,
  name,
  type,
  placeholder,
  handleChange,
  values,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  return (
    <div className="form-field-container flex flex-col sm:mt-5 w-full space-y-0.5 sm:md:lg:space-y-1">
      <div className="form-field-label sm:flex justify-between w-full">
        <span className="font-roboto text-[#ffffff] text-[14px] md:lg:text-[16px]">
          {label}
        </span>
       
          <ErrorMessage
            name={name}
            component="span"
            className="text-red-600 text-[12px] flex justify-end w-full"
          />
        
      </div>
      <div className="form-field-input-container w-full rounded-[4px] bg-[#101010] h-[44px] md:lg:h-[56px] border-[1px] border-[#49C8B7] flex flex-row justify-center items-center text-[#ffff]"
        style={{ borderWidth: '2px', borderColor: '#3ac9d3', borderStyle: 'solid' }}
      >
        <Field
          type={passwordVisible ? 'text' : 'password'}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="font-roboto w-full h-full p-2 bg-transparent outline-none text-[12px] text-[#fff] md:lg:text-[14px] form-field-input"
          required
        />
        <div className="h-[38px] w-[38px] rounded-tl-[6px] rounded-bl-[6px] justify-center items-center flex">
          {passwordVisible ? (
            <span
              className="text-[16px] text-[#49C8B7] cursor-pointer"
              onClick={togglePassword}
            >
              <VisibilityIcon />
            </span>
          ) : (
            <span
              className="text-[16px] text-[#49C8B7] cursor-pointer"
              onClick={togglePassword}
            >
              <VisibilityOffIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputPassword2;
