import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function PrimaryButton({ label,eventname, bgcolor, textcolor, type, showArrow = true }) {
  const buttonStyle = {
    background: bgcolor,
    color: textcolor,
  };

  return (
    <button
      type={type}
      className="w-full rounded-md mt-3 h-[56px] font-roboto flex items-center justify-center text-[16px]"
      onClick={eventname}
      style={buttonStyle}
    >
      {label}
      {showArrow && <ArrowForwardIcon className="ml-2" />}
    </button>
  );
}

export default PrimaryButton;