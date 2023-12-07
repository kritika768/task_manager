import { Routes, Route } from "react-router-dom";
import routes from "./routes.json";
import Home from "../components/Home/Home";
import AuthForm from "../components/AuthForm/AuthForm";
import Login from "../components/AuthForm/Login";
import Task from "../components/Task/Task";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.SIGNUP} element={<AuthForm />} />
        <Route path={routes.TASK} element={<Task />} />
      </Routes>
    </>
  );
};

export default PageRoutes;
