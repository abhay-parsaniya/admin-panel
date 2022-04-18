import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ContainerWrapper from './Wrappers/ContainerWrapper';
import BackgroundWrapper from './Wrappers/BackgroundWrapper';

const UserDetails = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {

    let userInfo = JSON.parse(localStorage.getItem("user"));

    // console.log(abc.email)
    if(userInfo)
    {
      fetch('http://localhost:5000/getuserdetails', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "email": userInfo.email,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            // console.log(data.result)
            setUserData(data.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // console.log(userData);

  return (
    <>
      <BackgroundWrapper>
        <Navbar />
        <ContainerWrapper>  
          <div className="table-responsive">
            <table className="table table-primary text-center mx-auto my-5">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
              {
                userData.map((item, index) => {
                  return(
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.gender}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </ContainerWrapper>
      </BackgroundWrapper>
    </>
  )
}

export default UserDetails