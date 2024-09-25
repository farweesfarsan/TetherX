import PropTypes from "prop-types";
import DashboardIcon from '@mui/icons-material/Dashboard';
import WalletIcon from '@mui/icons-material/Wallet';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import frame1 from '../assets/frame-4@2x.png';
import { Link } from "react-router-dom";

const Sidebar = ({ className = "" }) => {
  return (
    <div
      className={`fixed h-full top-0 left-0 w-60 box-border flex flex-col items-start justify-start py-[100px] px-0 gap-[16px] text-left text-sm text-white font-body border-r-[1px] border-solid border-gray-800 bg-dark-blue ${className}`}
    >
      <div className="absolute top-[40px] left-[60px]">
        <img
          src={frame1}
          className="h-10 w-300"
          alt="Logo"
        />
      </div>
      <div className="mt-[20px] w-full relative h-[50px]"> {/* Added margin-top */}
        <Link
          to="/dashboard"
          className="absolute h-full w-full  top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary text-white rounded-lg  "
          style={{ textDecoration: 'none' }}
        >
          <DashboardIcon />
          <div className="tracking-[0.3px] font-medium">Dashboard</div>
        </Link>
      </div>
      <div className="w-full relative h-[50px]">
        <Link
          to="/wallet"
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary text-white rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          <WalletIcon/>
          <div className="tracking-[0.3px] font-medium">Wallet</div>
        </Link>
      </div>
      <div className="w-full relative h-[50px]">
        <Link
          to="/request-page"
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary text-white rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          <RequestPageIcon/>
          <div className="tracking-[0.3px] font-medium">Request Page</div>
        </Link>
      </div>
      <div className="w-full relative h-[50px]">
        <Link
          to="/transaction"
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary text-white rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          <CurrencyExchangeIcon/>
          <div className="tracking-[0.3px] font-medium">Transaction</div>
        </Link>
      </div>
      <div className="w-full relative h-[50px]">
        <Link
          to="/settings"
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary  text-white rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          <SettingsIcon/>
          <div className="tracking-[0.3px] font-medium">Settings</div>
        </Link>
      </div>
      <div className="w-full relative h-[50px]">
        <Link
          to="/logout"
          className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-start pl-[50px] gap-[12px] transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:text-secondary text-white rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          <LogoutIcon/>
          <div className="tracking-[0.3px] font-medium">Logout</div>
        </Link>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;