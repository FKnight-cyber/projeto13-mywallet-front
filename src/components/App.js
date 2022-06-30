import React, { useState } from "react";
import GlobalStyle from "../theme/globalstyles";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import InitalPage from "../pages/InitialPage";
import AddRegister from "../pages/AddRegister";

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
          <Route path="/initialpage" element={<InitalPage />} />
          <Route path="/add" element={<AddRegister />} />
        </Routes>
        </UserContext.Provider>
    </BrowserRouter>
  );
}


