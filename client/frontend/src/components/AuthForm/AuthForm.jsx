import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./AuthForm.module.css";
import { useNavigate } from "react-router";

const AuthForm = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the user's email and password
    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8001/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // User was successfully signed up, handle success here
        console.log("User signed up successfully!");
        navigate("/login")
      } else {
        // Handle error response here
        console.error("User signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  return (
    <>
      <Form className={style.cont} onSubmit={handleSubmit}>
        <h3 className={style.heading}>Sign up</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}

        />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={style.btn}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AuthForm;
