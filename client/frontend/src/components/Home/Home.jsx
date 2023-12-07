import style from "./Home.module.css";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const btnHandler = () =>{
    navigate("/signup");
  }
  return (
    <>
      <div className={style.container}>
        <img
          src="https://i0.wp.com/getflowdotcom.wpcomstaging.com/wp-content/uploads/2020/06/task-management-workflow.jpg?fit=2000%2C1500&ssl=1"
        />
        <button className={style.btn} onClick={btnHandler}>Get Started</button>
      </div>
    </>
  );
};

export default Home;
