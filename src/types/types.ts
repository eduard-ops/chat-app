import { Message } from "../interface/interface";

import { User } from "../interface/interface";

export type ListProps = {
  name: string;
  messages: Message[];
};

export type UsersProps = {
  users: User[];
};
