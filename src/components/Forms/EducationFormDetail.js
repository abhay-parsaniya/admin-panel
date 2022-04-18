import React, { useState, useEffect } from "react";
import Wrapper from "../Wrappers/Wrapper";
import Label from "../Label";
import Input from "../Input";
import "./Form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EducationFormDetail = ({ formData, setFormData }) => {
  const [education, setEducation] = useState({
    InstituteName: "",
    CGPA: 0,
    Course: "",
    Start_Date: "",
    End_Date: "",
  });

  useEffect(() => {
    setEducation(education);
  }, [education]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEducation((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const checkvalidation = () => {

    for(let key in education)
    {
      if(education[key].length === 0)
      {
        // alert(`Please Fill ${key} Field!!`);
        toast.error(`Please Fill ${key} Field!!`, {
          type: "error",
          theme: "colored",
        });
        return true;
      }
    }

    if (education.InstituteName.length < 3) {
      toast.error("Institute Name at least have 3 characters", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (education.CGPA <= 0 || education.CGPA > 10) {
      toast.error("Invalid CGPA", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (education.Course.length < 3) {
      toast.error("Course Name at least have 3 characters", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (education.Start_Date.length === 0) {
      toast.error("Please Enter Start Date", {
        type: "error",
        theme: "colored",
      });
      return true;
    } else if (education.End_Date.length === 0) {
      toast.error("Please Enter End Date", {
        type: "error",
        theme: "colored",
      });
      return true;
    }
  };

  let errvalue;
  const SaveinArray = (event) => {
    event.preventDefault();
    console.log(errvalue);
    errvalue = checkvalidation();
    console.log(errvalue);

    if (!errvalue) {
      formData.educationArray.push(education);
    }
    // console.log(formData);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Education
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Education Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Wrapper>
                <Label
                  htmlFor="inputInstituteName3"
                  className="col-sm-2 col-form-label"
                  labelName="Institute/School Name"
                />
                <div className="col-sm-10">
                  <Input
                    type="text"
                    className="form-control"
                    id="institutename"
                    name="InstituteName"
                    value={education.InstituteName}
                    onChange={handleChange}
                  />
                </div>
              </Wrapper>
              <Wrapper>
                <Label
                  htmlFor="inputCGPA3"
                  className="col-sm-2 col-form-label"
                  labelName="CGPA"
                />
                <div className="col-sm-10">
                  <Input
                    type="number"
                    className="form-control"
                    id="cgpa"
                    name="CGPA"
                    value={education.CGPA}
                    onChange={handleChange}
                  />
                </div>
              </Wrapper>

              <Wrapper>
                <Label
                  htmlFor="inputCourse3"
                  className="col-sm-2 col-form-label"
                  labelName="Course/Stream"
                />
                <div className="col-sm-10">
                  <Input
                    type="text"
                    className="form-control"
                    id="course"
                    name="Course"
                    value={education.Course}
                    onChange={handleChange}
                  />
                </div>
              </Wrapper>
              <Wrapper>
                <Label
                  htmlFor="inputStartDate3"
                  className="col-sm-2 col-form-label"
                  labelName="Start Date"
                />
                <div className="col-sm-10">
                  <Input
                    type="date"
                    className="form-control"
                    id="start_date"
                    name="Start_Date"
                    value={education.Start_Date}
                    onChange={handleChange}
                  />
                </div>
              </Wrapper>
              <Wrapper>
                <Label
                  htmlFor="inputEndDate3"
                  className="col-sm-2 col-form-label"
                  labelName="End Date"
                />
                <div className="col-sm-10">
                  <Input
                    type="date"
                    className="form-control"
                    id="end_date"
                    name="End_Date"
                    value={education.End_Date}
                    onChange={handleChange}
                  />
                </div>
              </Wrapper>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss={!errvalue && 'modal'}
                onClick={SaveinArray}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Institute Name</th>
              <th scope="col">CGPA</th>
              <th scope="col">Course</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.educationArray.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{item.InstituteName}</td>
                  <td>{item.CGPA}</td>
                  <td>{item.Course}</td>
                  <td>{item.Start_Date}</td>
                  <td>{item.End_Date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EducationFormDetail;
