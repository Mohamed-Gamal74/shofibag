import React, { useState } from "react";
import login from "../../images/login.png";
import Login from "./Login";
import Signup from "./Signup";
import { Segmented } from "antd";
import styles from "./login.module.css";

const Register = () => {
  const [value, setValue] = useState("login");

  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <section className="sectionContainer py-5">
      <div className="row mb-5">
        <div className={`${styles.imgContainer} col-md-6 mt-4 ` }>
          <img src={login} alt="login" />
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-center ">
            <Segmented
              onChange={handleChange}
              style={{ width: "50%" }}
              className="mt-5"
              options={[
                {
                  value: "login",
                  label: "Login",
                },
                {
                  value: "signup",
                  label: "Sign up",
                },
              ]}
            />
          </div>

          {value === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </section>
  );
};

export default Register;
