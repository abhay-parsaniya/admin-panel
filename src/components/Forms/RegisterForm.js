import React, { useState } from "react";
import UserDetailForm from "./UserDetailForm";
import EducationFormDetail from "./EducationFormDetail";
import Navbar from "../Navbar";
import BackgroundWrapper from "../Wrappers/BackgroundWrapper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure();

const RegisterForm = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    educationArray: [],
  });

  const navigate = useNavigate();

  function IncrementPage(event) {

    event.preventDefault();

    const errvalue = checkvalidation();

    if (errvalue) {
      return;
    } else {
      return setPage(page + 1);
    }
  }

  function DecrementPage(event) {
    event.preventDefault();
    return setPage(page - 1);
  }

  function PageDisplay() {
    if (page === 0) {
      return <UserDetailForm formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <EducationFormDetail formData={formData} setFormData={setFormData} />;
    }
  }

  function ButtonRendering() {
    if (page === 0) {
      return (
        <>
          <button type="submit" className="btn btn-danger" onClick={ClearForm}>
            Clear
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={IncrementPage}
          >
            Next
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={DecrementPage}
          >
            Prev
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={SubmitData}
          >
            Submit
          </button>
        </>
      );
    }
  }

  const checkvalidation = () => {

    for (let key in formData){

      if(key === 'educationArray')
      {
        continue;
      }
      if(formData[key].length === 0)
      {
        // alert(`Please Fill ${key} Field!!`);
        toast.error(`Please Fill ${key} Field!!`, {
          type: "error",
          theme: "colored",
        });
        return true;
      }
    }

    if (formData.firstName.length < 3) {
      toast.error("FirstName at least have 3 characters", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (formData.lastName.length < 3) {
      toast.error("LastName at least have 3 characters", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (formData.gender.length === 0) {
      toast.error("Please Select Gender", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please Enter Valid Email", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (formData.phone_number.length !== 10) {
      toast.error("Please Enter 10 Digit Mobile Number", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        formData.password
      )
    ) {
      toast.error(
        "Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        {
          type: "error",
          theme: "colored",
        }
      );
      return true;
    } else if (formData.password !== formData.confirm_password) {
      toast.error("Password and Confirm Password doesn't Match", {
        type: "error",
        theme: "colored",
      });
      return true;
    }
  };

  const ClearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });
  };

  const SubmitData = (event) => {
    event.preventDefault();

    if(formData.educationArray.length === 0)
    {
      toast.error('Please Fill Education Details', {
        type: 'error',
        theme: 'colored'
      });
      return;
    } 
    console.log(formData);

    fetch("http://localhost:5000/datasubmit", {
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
          // alert(data.error);
          toast.error(data.error, {
            type: "error",
            theme: "colored",
          });
        } else {
          toast.success(data.msg, {
            type: 'success',
            theme: 'colored'
          });
          navigate('/login');
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
          <form>
            {PageDisplay()}
            <div className="d-flex justify-content-evenly">{ButtonRendering()}</div>
          </form>
        </div>
      </BackgroundWrapper>
    </>
  );
};

export default RegisterForm;
