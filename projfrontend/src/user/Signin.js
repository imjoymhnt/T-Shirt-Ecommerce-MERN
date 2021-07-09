import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Password
              </label>
              <input className="form-control" type="password" />
            </div>
            <br />
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="signin page" description="A page for user to signin">
      {signInForm()}
    </Base>
  );
};

export default Signin;
