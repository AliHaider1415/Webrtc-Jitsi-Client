import React from "react";
import userAuthStore from "../store/userAuthStore/userAuthStore";
import SideBar from "./common/SideBar";
export default function Home() {
  return (
    <div>
      {console.log(userAuthStore.getState().user)}
      {console.log(localStorage.getItem("access"))}
      <SideBar />
    </div>
  );
}
