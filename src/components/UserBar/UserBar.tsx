import { UserContainer, NavTitle, UsersList } from "./UserBar.styles";

import { UsersProps } from "../../types/types";

const UserBar = ({ name, setReceiverId, setUserSocket, users }: UsersProps) => {
  const filterUser = () => {
    return users.filter((item) => item.name !== name);
  };
  return (
    <UserContainer>
      <NavTitle>Online ({filterUser().length}) :</NavTitle>
      <UsersList>
        {filterUser().map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setUserSocket(item.soketId);
              setReceiverId(item.id);
            }}
          >
            {item.name}
          </li>
        ))}
      </UsersList>
    </UserContainer>
  );
};

export default UserBar;
