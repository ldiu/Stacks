import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    async function onSubmit(e) {

      }

  return (
    <div id='login'>
        <div className="header">Login</div>
      <form onSubmit={onSubmit}>
        <div className="formItems">
          <label className="formLabel" htmlFor="email">Email:</label>
          <input
            className="formInput"
            id="email"
            required
          />
        </div>

        <div className="formItems">
          <label className="formLabel" htmlFor="password">Password:</label>
          <input
            className="formInput"
            id="password"
            required
          />
        </div>

        <div className="formItems">
          <input
            className="formButton"
            type="submit"
            value="Login"
          />
        </div>
      </form>
      <Link to="/register" id="registerButton" style={{ textDecoration: 'none' }}>Register Here</Link>
    </div>
  )
}
