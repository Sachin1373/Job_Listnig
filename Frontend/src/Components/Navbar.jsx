import styles from "../Styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


const Navbar = ({onLogut}) => {
  const redirect = useNavigate();
  const [loggedin, setloggedin] = useState(false);

  const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
  useEffect(() => {
    const currentTime = new Date().getTime();
    const logg =
      tokenTime !== null
        ? tokenTime.expiry > currentTime
          ? true
          : false
        : false;
    setloggedin(logg);
  }, [tokenTime]);

  return (
    <>
      <div className={styles.nav}>
        <h3 className={styles.title} onClick={() => redirect("/")}>
          Jobfinder
        </h3>
        {loggedin ? (
          <div className={styles.loginView}>
            <span
              onClick={() => {
                toast.success("Logout successfull");
                setloggedin(false);
                onLogut();
                localStorage.removeItem("recuirterDetail");
              }}
            >
              Logout
            </span>
            <span>Hello! {tokenTime.recuirterName}</span>
            <div className={styles.recruiterLogo}>S</div>
          </div>
        ) : (
          <div className={styles.logoutView}>
            <button onClick={() => redirect("/Login")}>Login</button>
            <button onClick={() => redirect("/Register")}>Register</button>
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};
export default Navbar;