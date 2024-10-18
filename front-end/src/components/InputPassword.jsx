import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function InputPassword({ label, name, placeholder, handleChange, values,className }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-field-container flex flex-col sm:mt-5 w-full space-y-2">
      <div className="form-field-label sm:flex justify-between w-full">
        <span className="text-[#ffffff] text-[14px] md:lg:text-[16px] font-roboto">
          {label}
        </span>
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 text-[12px] font-roboto"
        />
      </div>
      
      <div className="form-field-input-container w-full bg-[#131212] h-[44px] md:lg:h-[56px] flex items-center  rounded-[4px] " 
         style={{ borderWidth: '2px', borderColor: '#3ac9d3', borderStyle: 'solid' }}
      >
        
        <Field
          type={showPassword ? "text" : "password"}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={className}
          required
        />
        <div onClick={togglePasswordVisibility} className="cursor-pointer px-2 ">
          {showPassword ? (
            <VisibilityOffIcon className="text-[20px] text-[#4cbfe2]" />
          ) : (
            <VisibilityIcon className="text-[20px] text-[#4cbfe2]" />
          )}
        </div>
      </div>
    </div>
  );
}

export default InputPassword;
