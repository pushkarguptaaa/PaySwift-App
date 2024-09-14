import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
// import { signup } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {

      const [firstName, setFirstName] = useState("")
      const [lastName, setLastName] = useState("")
      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
    
    
      const navigate = useNavigate();


      return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
          <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
            <div className="flex flex-col">
              <Heading label={"Sign Up"} />
              <SubHeading label={"Enter your information to create an account"} />
              <InputBox
                label={"First Name"}
                placeholder={"John"}
                name={"firstname"}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <InputBox
                label={"Last Name"}
                placeholder={"Doe"}
                name={"lastname"}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <InputBox
                label={"Email"}
                placeholder={"johndoe@example.com"}
                name={"email"}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <InputBox
                label={"Password"}
                placeholder={"123456"}
                name={"password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button label={"Sign up"} onClick={async () => {
                const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                })
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
              }} />
              <BottomWarning
                label={"Already have an account? "}
                to={"/signin"}
                buttonText={"Sign in"}
              />
            </div>
          </div>
        </div>
      );
}