import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "../Wrappers/Wrapper";
import Label from "../Label";
import Input from "../Input";
import "./Form.css";
import Navbar from "../Navbar";
import BackgroundWrapper from "../Wrappers/BackgroundWrapper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const checkvalidation = () => {
    if (formData.email.length === 0 || formData.password.length === 0) {
      toast.error("Please Fill Email and Password both Fields", {
        type: "error",
        theme: "colored",
      });
      return true;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please Enter Valid Email", {
        type: "error",
        theme: "colored",
      });
      return true;
    }
  };

  const SubmitLoginData = (event) => {
    event.preventDefault();

    const errvalue = checkvalidation();
    if(errvalue)
    {
        return;
    }

    fetch("http://localhost:5000/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            type: "error",
            theme: "colored",
          });
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success('Login Success !!', {
            type: "success",
            theme: "colored",
          });
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <BackgroundWrapper>
      <Navbar />
      <div className="my-5">
        <form onSubmit={SubmitLoginData}>
          <Wrapper>
            <Label
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label"
              labelName="Email"
            />
            <div className="col-sm-10">
              <Input
                type="email"
                className="form-control"
                id="user_email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          <Wrapper>
            <Label
              htmlFor="inputPassword3"
              className="col-sm-2 col-form-label"
              labelName="Password"
            />
            <div className="col-sm-10">
              <Input
                type="password"
                className="form-control"
                id="user_password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          <div className="text-center my-3">
            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
          <div className="d-flex justify-content-evenly mt-4">
            <NavLink to="/forgotpassword">Forgot Password</NavLink>
            <NavLink to="/register">Register Here</NavLink>
          </div>
        </form>
      </div>
    </BackgroundWrapper>
    </>
  );
};

export default Login;
