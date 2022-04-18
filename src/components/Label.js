import React, {Component} from "react";

class Label extends Component{
  render(){
    return(
      <label htmlFor={this.props.htmlFor} className={this.props.className} >
          {this.props.labelName}
      </label>
    )
  }
}

// const Label = (props) => {
//   return (
//     <>
//       <label htmlFor={props.htmlFor} className={props.className} >
//         {props.labelName}
//       </label>
//     </>
//   );
// };

export default Label;
