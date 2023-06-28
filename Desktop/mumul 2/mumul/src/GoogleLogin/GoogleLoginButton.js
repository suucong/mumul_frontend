import React from "react";
import { GoogleLogin } from 'react-google-login';
import { postLoginToken } from "../api/postLoginToken";
import jwtDecode from "jwt-decode";

const GoogleLoginButton = () => {
  const handleGoogleResponse = (response) => {
    const idToken = response.tokenObj.id_token;
    console.log(idToken);
    const idTokenJSON = JSON.stringify(idToken);
    postLoginToken({idToken: idTokenJSON})
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=> {
        console.error(error);
      });
  };
  
  return (
    <GoogleLogin
      clientId="666974459730-6bv37t0c044nns1tnhd8rrosnspbq613.apps.googleusercontent.com"
      buttonText="Google 계정으로 계속"
      onSuccess={handleGoogleResponse}
      onFailure={(err) => {
        console.log(err);
      }}
      cookiePolicy={'none'}
    />
  );
};

export default GoogleLoginButton;