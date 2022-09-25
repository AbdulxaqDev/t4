import { Routes, Route, useNavigate } from "react-router-dom";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import AdminPanel from "./components/AdminPanel";
import DashoardLayout from "./components/DashboardLayout";
import ResetPassword from "./components/ResetPassword";
import { Provider } from "react-redux";
import { useEffect } from "react";

function App() {

 return (
  <Provider store={store}>
   <div className="App">
    {/* <DashoardLayout /> */}
    <Routes>
     <Route path="/" element={<SignUp />} />
     <Route path="/admin-panel" element={<AdminPanel />} />
     <Route path="/sign-in" element={<SignIn />} />
     <Route path="/dashboard-layout" element={<DashoardLayout />} />
     <Route path="/users" element={<Users />} />
     <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
    <ToastContainer />
   </div>
  </Provider>
 );
}

export default App;
