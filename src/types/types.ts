import { Message } from "../interface/interface";

export type ListProps = {
  name: string;
  messages: Message[];
};

export type UsersProps = {
  messages: Message[];
};
