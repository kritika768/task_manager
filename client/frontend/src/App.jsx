import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import PageRoutes from "./routes/PageRoutes";
import AuthForm from "./components/AuthForm/AuthForm";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/AuthForm/Login";

function App() {
  return (
    <>
      <Header />
      <PageRoutes/>
    </>
  );
}

export default App;
