import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from 'react-redux';
import {loginByFacebook} from '../actions/indexAction'

 class Facebook extends Component {
  // state = {
  //   isLoggedIn: false,
  //   userID: "",
  //   name: "",
  //   email: "",
  //   picture: ""
  // };

  responseFacebook = response => {
     console.log("fb",response);
    const { LoginByFacebook} = this.props;
    const State = {
      isLoggedIn: true,
      userID: response.userID,
      Username: response.name,
      gmail: response.email,
      avatar: response.picture.data.url
    };
    LoginByFacebook(State)


  };

  componentClicked = () => console.log("clicked");

  render() {
    // let fbContent;

    // if (this.state.isLoggedIn) {
    //   console.log('++++++++++')
    //   fbContent = (
    //     <div
    //       style={{
    //         width: "400px",
    //         margin: "auto",
    //         background: "#f4f4f4",
    //         padding: "20px"
    //       }}
    //     >
    //       <img src={this.state.picture} alt={this.state.name} />
    //       <h2>Welcome {this.state.name}</h2>
    //       Email: {this.state.email}
    //     </div>
    //   );
    // } else {
     const fbContent = (
        <FacebookLogin
          appId="189486938370592"
          autoLoad
          fields="Username,gmail,avatar"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    // }

    return <div>{fbContent}</div>;
  }
}

const mapRouterStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  LoginByFacebook: () => dispatch(loginByFacebook()),
  
});

export default connect(mapRouterStateToProps,mapDispatchToProps)(Facebook)