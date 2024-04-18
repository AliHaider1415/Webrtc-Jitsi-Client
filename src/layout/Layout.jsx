import React from "react";
import SideBar from "../components/common/SideBar";
import userAuthStore from "../store/userAuthStore/userAuthStore";

// Pass the child props
export default function Layout({ children }) {
  const user = userAuthStore.getState().user;
  return (
    <div>
      {user && <SideBar />}
      {children}
    </div>
  );
}
