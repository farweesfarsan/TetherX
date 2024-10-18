import React from "react";
// import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';

function Model(props) {
    const { text, handleClose, avatar } = props;

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 right-0 flex justify-center items-center">
            <div className="bg-white p-11 rounded-md shadow-md flex flex-col items-center border-[3px] border-[#a57eff] relative"> {/* Add relative positioning */}
                <div className="absolute top-1 right-1 z-10 "> {/* Adjust positioning of the Cancel icon */}
                    <div className="w-[28px] h-[28px]  text-[#8b7eac]  justify-center items-center cursor-pointer" onClick={handleClose}>   
                        <CancelIcon />   
                    </div>
                </div>
                <div>
                    {avatar}
                </div>
                <h3 className="text-center my-3 text-[#dd2e2e] font-semibold ">{text}</h3>
                <div className="mt-2">
                    
                </div>
            </div>
        </div>
    );
}

 export default Model;