/* eslint-disable array-callback-return */
import { useEffect, useState, useRef } from "react";

import { v4 } from "uuid";

import io from "socket.io-client";

import { Container, Content, Card, Title } from "./Home.styles";

import MessageList from "../../components/MessageList/MessageList";

import UserBar from "../../components/UserBar";

import { Message, Payload, User } from "../../interface/interface";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [receiverId, setReceiverId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [userSocket, setUserSocket] = useState("");

  const socket: any = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.on("getMessage", (message: Payload) => {
      setArrivalMessage({
        id: message.id,
        receiverId: message.receiverId,
        name: message.name,
        text: message.text,
      });
    });
  }, []);

  useEffect(() => {
    let namePr: any = prompt("Enter your name", "");
    const user: User = {
      id: v4(),
      name: namePr,
    };
    setName(namePr);
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users: []) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setMessages((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage]);

  const sendMessage = () => {
    if (name.length > 0 && text.length > 0) {
      const message: Payload = {
        id: socket.current.id,
        name: name,
        receiverId,
        text,
      };
      socket.current.emit("sendMessage", message);
      setMessages((prevState) => [...prevState, message]);
      setText("");
    }
  };

  return (
    <Container>
      <UserBar
        setUserSocket={setUserSocket}
        name={name}
        setReceiverId={setReceiverId}
        users={users}
      />
      <Content>
        <Title>Chat Web</Title>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
        />
        <Card>
          <MessageList
            userSocket={userSocket}
            receiverId={receiverId}
            messages={messages}
          />
        </Card>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message..."
        />
        <button type="button" onClick={sendMessage}>
          Sent
        </button>
      </Content>
    </Container>
  );
};

export default Home;
