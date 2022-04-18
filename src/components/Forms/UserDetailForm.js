import React from "react";
import Wrapper from "../Wrappers/Wrapper";
import Label from "../Label";
import Input from "../Input";
import "./Form.css";

const UserDetailForm = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  return (
    <>
      <Wrapper>
        <Label
          htmlFor="inputFirstName3"
          className="col-sm-2 col-form-label"
          labelName="First Name"
        />
        <div className="col-sm-10">
          <Input
            // type="text"
            // className="form-control"
            id="firstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
      </Wrapper>
      <Wrapper>
        <Label
          htmlFor="inputLastName3"
          className="col-sm-2 col-form-label"
          labelName="Last Name"
        />
        <div className="col-sm-10">
          <Input
            // type="text"
            // className="form-control"
            id="lastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </Wrapper>
      <Wrapper>
        <Label
          htmlFor="inputSelect3"
          className="col-sm-2 col-form-label"
          labelName="Gender"
        />
        <div className="col-sm-10">
          <select
            className="form-select"
            id="form_options"
            aria-label="Default select example"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Select Your Gender">Select Your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </Wrapper>
      <Wrapper>
        <Label
          htmlFor="inputEmail3"
          className="col-sm-2 col-form-label"
          labelName="Email"
        />
        <div className="col-sm-10">
          <Input
            type="email"
            // className="form-control"
            id="user_email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </Wrapper>
      <Wrapper>
        <Label
          htmlFor="inputEmail3"
          className="col-sm-2 col-form-label"
          labelName="Phone Number"
        />
        <div className="col-sm-10">
          <Input
            type="number"
            // className="form-control"
            id="user_phone_number"
            name="phone_number"
            value={formData.phone_number}
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
            // className="form-control"
            id="user_password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </Wrapper>
      <Wrapper>
        <Label
          htmlFor="inputPassword3"
          className="col-sm-2 col-form-label"
          labelName="Confirm Password"
        />
        <div className="col-sm-10 my-auto">
          <Input
            type="password"
            // className="form-control"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>
      </Wrapper>
    </>
  );
};

export default UserDetailForm;
