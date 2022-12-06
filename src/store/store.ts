import { Socket } from 'socket.io-client';
import create from 'zustand';
import { ClientToServerEvents, ServerToClientEvents } from '../interfaces/interfaces';

interface IStore {
  username: string;
  login: (username: string) => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => void;
}

export const useStore = create<IStore>((set) => ({
  username: '',
  login: (username: string) => set({ username }),
  socket: null,
  setSocket: (socket: any) => set({ socket }),
}));

