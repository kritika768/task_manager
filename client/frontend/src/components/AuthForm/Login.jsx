import style from "./AuthForm.module.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the user's email and password
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        const tokenData = await response.json();
        const authToken = tokenData.token;
        const userId = tokenData.id;
        const userName = tokenData.name;
        console.log("User logged in successfully!");
        console.log("Received token: ", authToken);
        console.log("User ID: ", userId);
        console.log("User Name: ", userName);
        localStorage.setItem("userId",tokenData.id);
        localStorage.setItem("name",tokenData.name);
        localStorage.setItem("token",tokenData.token);
        navigate("/task");
      } else {
        console.error("User login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Form className={style.cont} onSubmit={handleSubmit}>
        <h3 className={style.heading}>Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

export default Login;
