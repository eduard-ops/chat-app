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
  const [users, setUsers] = useState<User[]>([]);

  const soket = useRef(io("http://localhost:3001"));

  useEffect(() => {
    let namePr: any = prompt("Enter your name");
    const user: User = {
      id: v4(),
      name: namePr,
    };
    setName(namePr);
    soket.current.emit("addUser", user);
    soket.current.on("getUsers", (users) => {
      setUsers(users);
      console.log(users);
    });
  }, []);

  // const [users, setUsers] = useState([]);

  useEffect(() => {
    window.localStorage.setItem("messages", JSON.stringify(messages));
    function receivedMessage(message: Payload) {
      const newMessage: Message = {
        id: v4(),
        name: message.name,
        text: message.text,
      };
      setMessages([...messages, newMessage]);
    }

    soket.current.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  function sendMessage() {
    if (name.length > 0 && text.length > 0) {
      const message: Payload = {
        id: soket.current.id,
        name,
        text,
      };

      soket.current.emit("msgToServer", message);
      window.localStorage.setItem("name", JSON.stringify(name));
      setText("");
    }
  }

  return (
    <Container>
      <UserBar users={users} />
      <Content>
        <Title>Chat Web</Title>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
        />
        <Card>
          <MessageList name={name} messages={messages} />
        </Card>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message..."
        />
        <button type="button" onClick={() => sendMessage()}>
          Sent
        </button>
      </Content>
    </Container>
  );
};

export default Home;
