/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";

import { v4 } from "uuid";

import io from "socket.io-client";

import { Container, Content, Card, Title } from "./Home.styles";

import MessageList from "../../components/MessageList/MessageList";

import UserBar from "../../components/UserBar";

import { Message, Payload } from "../../interface/interface";

const Home: React.FC = () => {
  const [name, setName] = useState(
    JSON.parse(window.localStorage.getItem("name") ?? "[]") ?? ""
  );
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    JSON.parse(window.localStorage.getItem("messages") || "[]") ?? []
  );

  // const [users, setUsers] = useState([]);

  const soket = io("http://localhost:3001");

  console.log(soket);

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

    soket.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  function sendMessage() {
    if (name.length > 0 && text.length > 0) {
      const message: Payload = {
        name,
        text,
      };

      soket.emit("msgToServer", message);
      window.localStorage.setItem("name", JSON.stringify(message.name));
      setText("");
    }
  }

  return (
    <Container>
      <UserBar />
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
