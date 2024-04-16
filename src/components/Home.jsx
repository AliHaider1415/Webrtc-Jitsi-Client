import React from "react";
import SideBar from "./SideBar";
import userAuthStore from "../store/userAuthStore/userAuthStore";

export default function Home() {
  const auth = localStorage.getItem("access");
  return (
    <div>
      {console.log(auth)}
      <SideBar />
    </div>
  );
}
