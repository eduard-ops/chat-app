import { Message } from "../interface/interface";

import { User } from "../interface/interface";

export type ListProps = {
  receiverId: string;
  userSocket: string;
  messages: Message[];
};

export type UsersProps = {
  users: User[];
  name: string;
  setReceiverId: Function;
  setUserSocket: Function;
};
