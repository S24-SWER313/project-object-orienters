import { createContext, useState } from 'react';

export const SelectedChatContext = createContext();

export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});

  return (
    <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
