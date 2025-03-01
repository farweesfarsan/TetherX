import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";

import CreateYourAccountOne from "./pages/CreateYourAcoountOne";
import CreateYourAccountTwo from "./pages/CreateYourAcountTwo";
import BuyerAccountTwo from "./pages/BuyerAccountTwo";
import CreateYourAccountThree from "./pages/CreateYourAccountThree";
import BuyerAccountThree from "./pages/BuyerAccountThree";
import { StepProvider } from './context/StepContext';
import { FormDataProvider } from './context/FormDataContext';  // Import FormDataProvider
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import BuyerWallet from "./pages/BuyerWallet";
import MainLayout from "./Layout/MainLayout";
import BuyerLayout from "./Layout/BuyerLayout";
import BuyerTransaction from "./pages/BuyerTransaction";
import BuyerTransDetails from "./pages/BuyerTransdetails";
import RequestPage from "./pages/RequestPage";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import LogoutSeller from './pages/LogoutSeller';
import BuyerDash from "./pages/BuyerDash";
import LineChart from "./components/LineChart";
import PageNotFound from "./components/PageNotFound";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home";
        metaDescription = "Welcome to the Home Page";
        break;
      case "/login-web":
        title = "Login Web";
        metaDescription = "Login to your account via web";
        break;
      case "/login-mobile":
        title = "Login Mobile";
        metaDescription = "Login to your account via mobile";
        break;
      default:
        title = "App";
        metaDescription = "Default App Description";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <FormDataProvider> {/* Wrap your App component with FormDataProvider */}
      <StepProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateYourAccountOne" element={<CreateYourAccountOne />} />
          <Route path="/step-two" element={<CreateYourAccountTwo />} />
          <Route path="/step-buyer-two" element={<BuyerAccountTwo/>}/>
          <Route path="/step-three" element={<CreateYourAccountThree />} />
          <Route path="/step-three-buyer" element={<BuyerAccountThree/>}/>
          <Route path="/dashboard" element={<MainLayout><Dashboard/></MainLayout>}/>
          <Route path="/wallet" element={<MainLayout><Wallet/></MainLayout>}/>
          <Route path="/request-page" element={<MainLayout><RequestPage/></MainLayout>}/>
          <Route path="/transaction" element={<MainLayout><Transaction/></MainLayout>}/>
          <Route path="/buyer-transaction" element={<BuyerLayout><BuyerTransaction/></BuyerLayout>}/>
          <Route path="/buyer-trans-details" element={<BuyerLayout><BuyerTransDetails/></BuyerLayout>}/>
          <Route path="/settings" element={<MainLayout><Settings/></MainLayout>}/>
          <Route path="/logout" element={<BuyerLayout><Logout/></BuyerLayout>}/>
          <Route path="/sellerLogout" element={<MainLayout><LogoutSeller/></MainLayout>}/>
          <Route path="/buyerDash" element={<BuyerLayout><BuyerDash/></BuyerLayout>}/>
          <Route path="/buyer-wallet" element={<BuyerLayout><BuyerWallet/></BuyerLayout>}/>
          <Route path="/lineChart" element={< LineChart/>}/>
          <Route path="/pagenotfound" element={<PageNotFound/>}/>
        </Routes>
      </StepProvider>
    </FormDataProvider>
  );
}

export default App;