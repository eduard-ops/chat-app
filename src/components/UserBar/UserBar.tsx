import { UserContainer, NavTitle, UsersList } from "./UserBar.styles";

import { UsersProps } from "../../types/types";

import { useState } from "react";

const UserBar = ({ name, setReceiverId, setUserSocket, users }: UsersProps) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const filterUser = () => {
    return users.filter((item) => item.name !== name);
  };

  const changeCurrentSelected = (index: any) => {
    setCurrentSelected(index);
  };
  return (
    <UserContainer>
      <NavTitle>Online ({filterUser().length}) :</NavTitle>
      <UsersList>
        {filterUser().map((item, index) => (
          <li
            key={item.id}
            style={
              index === currentSelected
                ? {
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    color: "white",
                  }
                : { textDecoration: "none" }
            }
            onClick={() => {
              changeCurrentSelected(index);
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
