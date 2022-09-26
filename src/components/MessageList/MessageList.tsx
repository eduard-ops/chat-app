import { MyMessage, OtherMessage } from "./MessageList.styles";

import { Message } from "../../interface/interface";

import { ListProps } from "../../types/types";

const MessageList = ({ name, messages }: ListProps) => {
  return (
    <ul>
      {messages.map((msg: Message) => {
        if (msg.name === name) {
          return (
            <MyMessage key={msg.id}>
              <span>{msg.name}:</span>

              <p>{msg.text}</p>
            </MyMessage>
          );
        }
        return (
          <OtherMessage key={msg.id}>
            <span>{msg.name}:</span>

            <p>{msg.text}</p>
          </OtherMessage>
        );
      })}
    </ul>
  );
};

export default MessageList;
