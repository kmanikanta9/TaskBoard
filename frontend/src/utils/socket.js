import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket;

export const initSocket = () => {
  socket = io(SOCKET_URL);
  return socket;
};

export const getSocket = () => socket;
