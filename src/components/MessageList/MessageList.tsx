import { MyMessage, OtherMessage } from "./MessageList.styles";

import { ListProps } from "../../types/types";

const MessageList = ({ userSocket, receiverId, messages }: ListProps) => {
  const filterVisibleMessage = () => {
    return messages.filter(
      (item: any) => item.receiverId === receiverId || item.id === userSocket
    );
  };
  return (
    <ul>
      {filterVisibleMessage().map((msg: any, index) => {
        if (msg.receiverId !== receiverId) {
          return (
            <MyMessage key={index}>
              <span>{msg.name}:</span>

              <p>{msg.text}</p>
            </MyMessage>
          );
        }
        return (
          <OtherMessage key={index}>
            <span>{msg.name}:</span>

            <p>{msg.text}</p>
          </OtherMessage>
        );
      })}
    </ul>
  );
};

export default MessageList;
