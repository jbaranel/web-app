import {React, useContext} from 'react';
import {Route, Navigate} from "react-router-dom";
import {Redirect} from "react-router-dom"

export default function PrivateRoute(props) {
    const authLogin = localStorage.getItem("isAuthenticated")
    console.log(authLogin)
    return authLogin ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  };