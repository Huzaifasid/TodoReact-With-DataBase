import React, { useState } from "react";
import { auth } from "../firebaseconfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";



const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [spinner, setSpinner] = useState("Signup");

  const navigate = useNavigate()
  const getData = (e) => {
    e.preventDefault();
    console.log(userName, email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        navigate('/login')
        
      })
      .catch((error) => {
        console.log(error);
      });
    setSpinner(<Loader />);
    toast.success("SignUp Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    
  };

  return (
    <>
      <div className="  myBorder text-center">
        <form onSubmit={getData} className=" myInput  col-lg-5 col-md-6  ">
          <h1 className="mb-5 ">SignUp Your Account </h1>

          <input
            type="text"
            className="form-control form-control-sm mb-2"
            placeholder="Enter Your Name"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
            required
            className="form-control form-control-sm mb-2"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <button className="btn btn-primary w-25 mx-auto mt-2">
            {spinner}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpForm;
