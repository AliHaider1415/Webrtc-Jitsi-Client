import { useMemo } from "react";
import { create } from "zustand";
import { io } from "socket.io-client";

const socketStore = create((set) => ({
  socket: useMemo(() => io("http://localhost:5000", []), []),
}));

export default socketStore;
