import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";


function InputField({ label, name, type, placeholder, handleChange, values }) {
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
      <div className="form-field-input-container w-full  bg-[#131212] h-[44px] md:lg:h-[56px]  flex flex-row justify-center border-custom items-center rounded-[4px] text-[#ffffff] font-roboto"
         style={{ borderWidth: '2px', borderColor: '#3ac9d3', borderStyle: 'solid' }}
      >
        <Field
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="font-roboto w-full h-full p-2 bg-transparent outline-none text-[12px] md:lg:text-[14px] form-field-input  rounded-[4px] text-[#ffffff]"
          required
        />
      </div>
    </div>
  );
}

export default InputField;