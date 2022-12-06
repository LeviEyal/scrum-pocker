import { Socket } from 'socket.io-client';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ClientToServerEvents, ServerToClientEvents } from '../interfaces/interfaces';

interface IUserStore {
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

interface ISocketStore {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => void;
}

const useUserStore = create(persist<IUserStore>((set, get) => ({
  username: '',
  login: (username: string) => set({ username }),
  logout: () => set({ username: '' }),
})));

const useSocketStore = create<ISocketStore>((set, get) => ({
  socket: null,
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => set({ socket }),
}));

export const useStore = () => {
  const userStore = useUserStore();
  const socketStore = useSocketStore();

  return {
    ...userStore,
    ...socketStore,
  };
};