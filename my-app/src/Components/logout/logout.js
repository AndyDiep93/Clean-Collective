import React from "react";
import axios from "axios";
const Logout = () => {
    const logout = () => {
        axios({
          method: "post",
          withCredentials: true,
          url: "http://localhost:5000/user/logout",
        }).then((res) => {
          
        }).catch((err) => alert("Something went wrong: " + err));
        window.location.reload();
        sessionStorage.removeItem("__react_session__");
      };
  return (
    <div className="form-wrapper">
        <span onClick={logout}>Logout</span>
    </div>
  );
};

export default Logout;
