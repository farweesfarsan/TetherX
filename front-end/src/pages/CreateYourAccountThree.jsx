import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/tx501-1@2x.png";
import Steper from "../components/Steper";
import PrimaryButton from "../components/PrimaryButton";
import { useFormData } from '../context/FormDataContext';
import { useNavigate } from "react-router-dom";




const CreateYourAccountThree = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { formData, submitFormData,verifyCode } = useFormData();
  const [currentStep, setCurrentStep] = useState(3);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(6 * 60);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Disable scrolling when the component is mounted
    document.body.classList.add('no-scroll');

    // Enable scrolling when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code === verifyCode) {
      try {
        console.log("Submitting form data: ",formData);
        await submitFormData();
        alert("Account created successfully!");
        navigate('/');
      } catch (error) {
        console.error("Error creating account:", error);
        alert("Failed to create account.");
      }
    } else {
      alert("Invalid verification code.");
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#101010] flex flex-col justify-start items-center">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
        src={backgroundImage}
      />
      <div className="w-full min-h-screen p-5 flex flex-col justify-between items-center relative md:p-10">
        <div className="flex flex-col justify-start items-center text-center">
          <h1 className="font-roboto text-[24px] md:text-[26px] font-semibold leading-9 text-[#829BEF] mt-[-5px]">
            Create Your Account
          </h1>
          <p className="font-roboto text-[13px] md:text-[16px] font-normal leading-5 text-white mt-[-10px]">
            Your Secure Bridge to the World of USDT
          </p>
          <Steper />
          <p className="font-roboto text-[16px] md:text-[24px] font-semibold leading-5 text-white mt-8 mb-5">
            Verify Your Number
          </p>
          <p className="font-roboto text-[14px] md:text-[16px] leading-5 text-white mt-2">
            We have sent you an SMS with a code to your number ending ...801
          </p>
          <div className="flex mt-5 space-x-2 sm:space-x-8">
            {verificationCode.map((code, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-[#535763] border border-[#49C8B7] text-white text-xl sm:text-2xl rounded-md focus:outline-none focus:border-[#49C8B7]"
              />
            ))}
          </div>
          <p className="font-roboto text-[14px] md:text-[16px] leading-5 text-white mt-10">
            Didn’t receive any code?
          </p>
          <p className="font-roboto text-[14px] md:text-[16px] leading-5 text-[#829BEF] mt-2 underline font-medium cursor-pointer">
            Resend the Code
          </p>
          <p className="font-roboto text-[14px] md:text-[16px] leading-5 text-[#ffff] mt-4 font-medium">
            Code expires in {formatTime(timeLeft)}
          </p>
        </div>
        <div className="flex w-full sm:w-3/4 lg:w-1/2 justify-center mb-10">
          <PrimaryButton
            label="Verify"
            bgcolor="linear-gradient(90deg, #2d469a, #1e9e8c)"
            textcolor="#ffffff"
            type="button"
            showArrow={false}
            eventname={handleSubmit} // Call handleSubmit on button click
          />
        </div>
      </div>
    </div>
  );
};

export default CreateYourAccountThree;