import React,{useState,useEffect} from "react";
import Link from 'next/link'
import Cookie from 'js-cookie'
import {login as loggingUser} from './util/loginActions'
const login = () => {
const [loginData, setLoginData] = useState({email:'',password:''})

useEffect(() => {
  setLoginData({...loginData,email:Cookie.get('email') ?Cookie.get('email'):'' })
},[])

  return (
    <>
      <h1>login </h1>
      <form action="#" onSubmit = {(e) => {
        e.preventDefault()
        loggingUser(loginData)
      }}>
          <input type="text" value = {loginData.email}  onChange = {(e) => {
            setLoginData({...loginData,email:e.target.value})
          }} />
       <input type="password"  onChange = {(e) => {
            setLoginData({...loginData,password:e.target.value})
          }}/>
          <button value = "submit"
            // onClick={() =>
            //   Cookie.set("token", "oihdsfkdskfnoksdfnojnefdo38732984793824")
            // }
          >
            submit
      </button>
            <Link href = '/signup'>
              <a>
                signup
              </a>
            </Link>
      </form>
    
    </>
  );
};

export default login;
