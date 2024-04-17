import React from "react";
import SideBar from "./SideBar";
import userAuthStore from "../store/userAuthStore/userAuthStore";

export default function Home() {
  const auth = localStorage.getItem("access");
  const user = userAuthStore((state) => state.user);
  return (
    <div>
      {console.log(userAuthStore.getState().user)}
      {console.log(localStorage.getItem("access"))}
      <SideBar />
    </div>
  );
}
