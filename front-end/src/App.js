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
import CreateYourAccountThree from "./pages/CreateYourAccountThree";
import { StepProvider } from './context/StepContext';
import { FormDataProvider } from './context/FormDataContext';  // Import FormDataProvider
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import MainLayout from "./Layout/MainLayout";
import RequestPage from "./pages/RequestPage";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
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
          <Route path="/step-three" element={<CreateYourAccountThree />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard/></MainLayout>}/>
          <Route path="/wallet" element={<MainLayout><Wallet/></MainLayout>}/>
          <Route path="/request-page" element={<MainLayout><RequestPage/></MainLayout>}/>
          <Route path="/transaction" element={<MainLayout><Transaction/></MainLayout>}/>
          <Route path="/settings" element={<MainLayout><Settings/></MainLayout>}/>
          <Route path="/logout" element={<MainLayout><Logout/></MainLayout>}/>
          <Route path="/buyerDash" element={<BuyerDash/>}/>
          <Route path="/lineChart" element={< LineChart/>}/>
           <Route path="/pagenotfound" element={<PageNotFound/>}/>
        </Routes>
      </StepProvider>
    </FormDataProvider>
  );
}

export default App;