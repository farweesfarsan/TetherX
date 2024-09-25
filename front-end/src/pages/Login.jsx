import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import backgroundimage from '../assets/tx501-1@2x.png';
import mask from '../assets/mask-group@2x.png';
import frame1 from '../assets/frame-4@2x.png';
import FrameIcon from '../components/FrameIcon';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';



const Login = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 451px) and (max-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCreateAccount = () => {
    
  };

  const LoginWeb = () => (
    <div className="w-full h-screen relative bg-background flex flex-row justify-center items-start box-border">
      <img
        className="h-[850px] w-[1250px] absolute top-[-50px] left-[300px] object-cover"
        alt=""
        src={backgroundimage}
      />
      <div className="w-[517px] rounded-lg flex flex-col items-center justify-center py-[10px] px-[24px] box-border gap-[32px] max-w-full z-[1] mb-15 absolute top-[50px] left-[120px]">
        <FrameIcon frame4={frame1} />
        <div className="m-0 self-stretch flex flex-col items-center justify-start gap-[32px] mq675:gap-[16px]">
          <div className="flex flex-col items-center justify-start py-[0px] px-[78px] gap-[12px] mq675:pl-[39px] mq675:pr-[39px] mq675:box-border">
            <h2 className="m-0 relative text-[24px] font-semibold font-body text-text-headings text-left mq450:text-[19px]">
              Sign In to Your Account
            </h2>
            <div className="relative text-[14px] font-body text-white text-center">
              Sign In to unlock seamless LKR to USDT exchange
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start gap-[12px]">
            <div className="w-full relative flex flex-col gap-[12px]">
              <div className="relative flex flex-col ">
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-center">
            <div className="h-[10px] relative text-[14px] tracking-[0.15px] leading-[16px] capitalize text-left inline-block">
              <span className="font-body text-white">
                Don’t have an account? 
              </span>
              <span className="font-medium font-body text-text-headings">
                <Link to='/CreateYourAccountOne'>
                Register Here
                </Link>
                
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginTab = () => (
    <div className="w-full h-[1194px] relative bg-background overflow-hidden text-left text-[14px] text-text-headings font-body">
      <img
        className="absolute h-[800px] top-[0px] right-[0px] bottom-[0px] max-h-[1000px] w-[800px]"
        alt=""
        src={mask}
      />
      <div className="absolute top-[150px] w-[350px] h-[auto] flex flex-col items-center justify-center py-[20px] px-[20px] box-border left-[30px] gap-[16px] max-w-full z-[1]">
        <FrameIcon frame4={frame1} />
        <div className="self-stretch flex flex-col items-center justify-start gap-[30px]">
          <div className="self-stretch flex flex-col items-center justify-start py-[10px] px-[20px] gap-[8px] text-[20px]">
            <h2 className="m-0 w-[253px] relative text-inherit font-semibold inline-block mq450:text-[16px] left-[30px]">
              Sign In to Your Account
            </h2>
            <div className="self-stretch h-[16px] relative text-[14px] text-center text-white inline-block">
              Sign In to unlock seamless LKR to USDT exchange
            </div>
          </div>
          <div className="w-full relative flex flex-col gap-[20px]">
            <div className="relative flex flex-col">
              <LoginForm handleCreateAccount={handleCreateAccount} />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-[8px]">
            <div className="w-full text-center text-[14px] capitalize font-medium">
              Forgot Password?
            </div>
            <div className="w-full text-center text-[14px] capitalize text-white">
              <span>Don't have an account? </span>
              <span className="font-medium text-text-headings">
                Register Here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginMobile = () => (
    <div className="w-full  relative bg-background overflow-hidden flex flex-row items-start justify-start pt-[180px] px-[16px] pb-[179px] box-border">
      <section className="flex-1 flex flex-col items-center justify-center gap-[32px] max-w-full">
        <FrameIcon frame4={frame1} />
        <div className="m-0 self-stretch flex flex-col items-center justify-center gap-[32px]">
          <div className="flex flex-col items-center justify-center py-[0px] px-[20px] gap-[12px]">
            <div className="relative text-[16px] font-semibold font-body text-text-headings text-left">
              Sign In to Your Account
            </div>
            <div className="relative text-[12px] font-body text-white text-left">
              Sign In to unlock seamless LKR to USDT exchange
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-center gap-[12px]">
            <div className="w-full relative flex flex-col gap-[12px]">
              <div className="relative flex flex-col">
                <LoginForm/>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-center py-[0px] px-[20px]">
            <div className="h-[10px] relative text-[14px] tracking-[0.15px] leading-[16px] capitalize text-left inline-block">
              <span className="font-body text-white">
                Don’t have an account? 
              </span>
              <span className="font-medium font-body text-text-headings">
                <Link to="/CreateYourAccountOne">
                Register Here
                </Link>
                
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <>
      {isDesktop && <LoginWeb />}
      {isTablet && <LoginTab />}
      {isMobile && <LoginMobile />}
    </>
  );
};

export default Login;