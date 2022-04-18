import React, { createContext, useContext, useEffect, useReducer } from "react";
import RegisterForm from "./components/Forms/RegisterForm";
import Login from "./components/Forms/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar";
import UserDetails from "./components/UserDetails";
import EducationDetails from "./components/EducationDetails";
import { initialState, Reducer } from "./components/Reducer/Reducer";

const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/educationdetails" element={<EducationDetails />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext };
