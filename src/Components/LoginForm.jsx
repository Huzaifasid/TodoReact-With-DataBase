import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [spinner, setSpinner] = useState("Login");
  const navigate = useNavigate()
  const auth = getAuth();
  const getData = (e) => {
    e.preventDefault()
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
  
    .then((result) => {
      const user = result.user;
      navigate('/todo')
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
    setSpinner(<Loader />);
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


   

   
  };

  return (
    <>
      <div className="  myBorder text-center">
        <form onSubmit={getData} className=" myInput  col-lg-5 col-md-6  ">
          <h1 className="mb-5 ">Login Your Account </h1>

          <input
            type="email"
            className="form-control form-control-sm mb-2"
            placeholder="Enter Your Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control form-control-sm mb-2"
            placeholder="Enter Your Password"
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <button
            className="btn btn-primary w-25 mx-auto mt-2"
            onClick={getData}
          >
            {spinner}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
