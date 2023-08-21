import { useEffect, useRef, useState } from "react";
import React from "react";
import '../Styles/Login.css'
import Weather from "./Weather";


  function Login() {

    const email =useRef()
    const password = useRef()
    const [showhome, setshowhome] =useState(false)
    const [login, setlogin] = useState(false)
    const localSignin = localStorage.getItem("signin")
    const localemail = localStorage.getItem("email")
    const localpassword = localStorage.getItem("password")
     useEffect(()=>{
        if(localSignin){
            setshowhome(true)
        }
        if(localemail){
            setlogin(true)
        }
     })

    const handleClick = ()=>{
        if(email.current.value && password.current.value){
            localStorage.setItem("email",email.current.value)
            localStorage.setItem("password",password.current.value)
            localStorage.setItem("signin",email.current.value)
            alert("Signin Succesful")
            window.location.reload()
        }
    }
    const handleLogin = ()=>{
        if(email.current.value==localemail && password.current.value == localpassword){
            localStorage.setItem("signin",email.current.value)
            window.location.reload()
        }
        else{
            alert("Please Enter vaild details")
        }
    }
  return (
    <div>
        {showhome? <Weather/>:
            (login?
            <div className="container">
                <div className="text">Login</div>
                <form>
                    <div className="data">
                        <label for="email">Email</label>
                        <input type="email" ref={email}/>
                    </div>
                    <div className="data">
                        <label for="password">Password</label>
                        <input type="password" ref={password} />
                    </div>
                    <div className="btn">
                    <button type="submit" onClick={handleLogin} >Login</button>
                    </div>
                </form>
            </div>
            :
            <div className="container">
                <div className="text">Sigup</div>
                <form >
                    <div className="data">
                        <label for="email">Email</label>
                        <input type="email"  ref={email}/>
                    </div>
                    <div className="data">
                        <label for="password">Password</label>
                        <input type="password"  ref={password} />
                    </div>
                    <div className="btn">
                    <button type="submit" onClick={handleClick} >Sigup</button>
                    </div>
                </form>
            </div>
            )
                }
        </div>
  );
}

export default Login;
