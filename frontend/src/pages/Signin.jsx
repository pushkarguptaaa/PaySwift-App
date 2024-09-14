import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Signin = () => {
    
      const navigate = useNavigate();

      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")


      return (
        <div className="h-screen bg-slate-300 flex justify-center items-center">
          <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
            <div className="flex flex-col">
              <Heading label={"Sign in"} />
              <SubHeading label={"Enter your credentials to access your account"} />
              <InputBox
                label={"Email"}
                placeholder={"johndoe@example.com"}
                onChange={e => setUsername(e.target.value)}
                name="email"
                value={username}
              />
              <InputBox
                label={"Password"}
                placeholder={"123456"}
                onChange={e => setPassword(e.target.value)}
                name="password"
                value={password}
              />
              <Button label={"Sign in"} onClick={async() => {
                const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
              }} />
              <BottomWarning
                label={"Don't have an account? "}
                to={"/signup"}
                buttonText={"Sign up"}
              />
            
            </div>
          </div>
        </div>
      );
}