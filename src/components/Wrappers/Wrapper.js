import React, {Component} from "react";

class Wrapper extends Component {
  render() {
    return <div className="row mb-3">{this.props.children}</div>;
  }
}

// const Wrapper = (props) => {
//   return (
//     <>
//       <div className="row mb-3">
//         {props.children}
//       </div>
//     </>
//   );
// };

export default Wrapper;
