import React, { useState } from "react";
import GlobalStyle from "../theme/globalstyles";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import InitialPage from "../pages/InitialPage";
import AddRegister from "../pages/AddRegister";
import EditRegister from "../pages/EditRegister";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [recordControl, setRecordControl] = useState();
  const [balance, setBalance] = useState(0);

  const userContext = {
    user,
    token,
    balance,
    recordControl,
    setRecordControl,
    setBalance,
    setToken,
    setUser
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/initialpage" element={<InitialPage />} />
          <Route path="/add" element={<AddRegister />} />
          <Route path="/initialpage/edit/:idRegister" element={<EditRegister />} />
        </Routes>
        </UserContext.Provider>
    </BrowserRouter>
  );
}


