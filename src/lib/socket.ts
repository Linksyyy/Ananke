"use client"

import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io({ autoConnect: true });

export const useSocket = (
  event: string,
  callback: (...args: any[]) => void,
) => {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  });
};
