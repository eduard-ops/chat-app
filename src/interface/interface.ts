export interface Message {
  id: string;
  name: string;
  text: string;
}

export interface Payload {
  id: string;
  receiverId: string;
  name: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  soketId?: string;
}

export interface userPayload {
  id: string;
  name: string;
  text: string;
}
