import React, { useState, useEffect } from 'react';
import "../styles/signup.css";
import PasswordStrenghtMeter from "./PasswordStrenghtMeter";
import { useForm } from "react-hook-form"
 
const SignUpForm = ({ }) => {
 
  const [username, setUsername] = useState("");
  const usernameError = 'Nazwa użytkownika powinna zawierać od 3 do 18 znaków alfanumerycznych';
  const [password, setPassword] = useState("");
  const passwordError = 'Hasło powinno zawierać od 7 do 19 znaków, w tym co najmniej jedną literę, jedną cyfrę i jeden znak specjalny';
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordError = 'Hasła się nie zgadzają';
  const [email, setEmail] = useState("");
  const emailError = 'Adres e-mail jest niepoprawny';
  const [pubKey, setPubKey] = useState("");
  const pubKeyError = 'Nie dodano pliku klucza publicznego'
  const [validation, setValidation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    return /^[a-zA-Z0-9]{3,18}$/.test(username) 
    && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,19}$/.test(password) 
    && password === confirmPassword 
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && pubKey !==""
  } 
 
  useEffect(() => {
    if (isSubmitted) {
        setValidation(validate());
    }
  }, [username, password, confirmPassword, email, pubKey, isSubmitted]);
 
	const changePubKey = (e) => {
		setPubKey(e.target.files[0]);
	};
 
  var jsonData = {
    username,
    password,
    email,
    File: pubKey,
  }
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("pubKey", data.file[0]);
    formData.append("username", jsonData.username);
    formData.append("email", jsonData.email);
    formData.append("password", jsonData.password);

    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      console.log(response)
      //console.log("Dodano Usera")
      window.location.pathname = "/signin"
      // alert("stworzono usera - zaloguj się")
      return response.json();
    })
      .catch((error) => {
        console.log(error)
    })
  }

  return (
      <form className="signup-form mx-auto mt-5 default-text" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="rejestracjaUsername"><h2>Username:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="username"
          placeholder='Enter Username'
          id="rejestracjaUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => validate({'username':username})}
        >
        </input>
        { isSubmitted && !/^[a-zA-Z0-9]{3,18}$/.test(username) && <div className="error">{usernameError}</div>}
        <br />
 
        <label htmlFor="rejestracjaPasswd"><h2>Password:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="password"
          placeholder='Enter Password'
          id="rejestracjaPasswd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validate({'password':password})}
        ></input>
        {isSubmitted && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,19}$/.test(password) && <div className="error">{passwordError}</div>}
        <br /><br />
        <PasswordStrenghtMeter password={password} />
 
        <label htmlFor="rejestracjaPasswdConf"><h2>Confirm Password:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          id="rejestracjaPasswdConf"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => validate({'confirmPassowrd':confirmPassword})}
        ></input>
        {isSubmitted && password !== confirmPassword && <div className="error">{confirmPasswordError}</div>}
        <br />
 
        <label htmlFor="PublicKey"><h2>Send SSH Public Key:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="file" {...register("file")}
          onChange={changePubKey}
          accept="pub"
        ></input>
        {isSubmitted && pubKey == "" && <div className="error">{pubKeyError}</div>}
        <br />
 
        <label htmlFor="rejestracjaEmail"><h2>E-mail:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="emial"
          placeholder='Enter E-mail'
          id="rejestracjaEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validate({'email':email})}
        ></input>
        {isSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="error">{emailError}</div>}
        <br />
          <div className="d-flex">
            <input className="sign-submit w-25 mx-auto default-text" type="submit" value="Sign Up" />
          </div>
        <br />
      <p className="account text-muted text-center mt-3 mb-3">
        Already have an account?{" "}
        <a href="/signin" className="a-text-primary">
          Sign In
        </a>
      </p>
      </form>
  );
};
 
export default SignUpForm;