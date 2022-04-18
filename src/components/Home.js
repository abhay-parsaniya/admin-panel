import React, { Component, useEffect, useState } from "react";
import NavBar from "./Navbar";
import BackgroundWrapper from "./Wrappers/BackgroundWrapper";
import ContainerWrapper from "./Wrappers/ContainerWrapper";
import "./Home.css";

class Home extends Component {

  constructor(){
    super();
    this.state = {
      name: {}
    };
  }

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    this.setState(() => {
      return {name: userInfo}
    })
  }

  // componentDidUpdate() {
  //   document.title = `You clicked ${this.state.count} times`;
  // }

  render() {
    return (
      <>
        <BackgroundWrapper>
          <NavBar />
          <ContainerWrapper>
            {/* <h1>You are Logged In as {name.first_name} {name.last_name}</h1> */}
            <h1>
              You are Logged In as{" "}
              <span className="badge bg-secondary">
                {this.state.name.first_name} {this.state.name.last_name}
              </span>
            </h1>
          </ContainerWrapper>
        </BackgroundWrapper>
      </>
    );
  }
}

// const Home = () => {

//   const [name, setName] = useState({});

//   useEffect(() => {
//     let userInfo = JSON.parse(localStorage.getItem("user"));
//     // console.log(abc);
//     setName(userInfo);
//   }, []);

//   // console.log(name);

//   return (
//     <>
//       <BackgroundWrapper>
//         <NavBar />
//         <ContainerWrapper>
//           {/* <h1>You are Logged In as {name.first_name} {name.last_name}</h1> */}
//           <h1>You are Logged In as <span className="badge bg-secondary">{name.first_name} {name.last_name}</span></h1>
//         </ContainerWrapper>
//       </BackgroundWrapper>
//     </>
//   )
// }

export default Home;
