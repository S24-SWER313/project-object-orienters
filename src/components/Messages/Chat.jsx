import { useState, useEffect, useContext } from 'react';
import { Flex, Input, Heading, Text, FormControl, Button, Avatar } from "@chakra-ui/react";
import Bottombar from './Bottombar';
import { SelectedChatContext } from './SelectedChatContext';
import { useAuth } from '../AuthProvider';

const Topbar = ({ chatTitle }) => (
  <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
    <Avatar src="" marginEnd={3} />
    <Heading size="lg">{chatTitle}</Heading>
  </Flex>
);


const Chat = () => {
  const { selectedChat, messages, setMessages} = useContext(SelectedChatContext);
  const { user } = useAuth();

  useEffect(() => {
    console.log("entered selectedChat", selectedChat.username);
    const fetchUserChat = async () => {
      const response = await fetch(`http://localhost:8080/messages/${user}/${selectedChat.username}`);
      const data = await response.json();
      console.log("data", data);
      setMessages(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      
    };

    fetchUserChat();
  }, [user, selectedChat]);

  const getMessages = () => messages.map(msg => (
    <Flex key={'msg' + msg.id} alignSelf={msg.senderId === selectedChat.username ? "flex-start" : "flex-end"} bg={msg.senderId === selectedChat.username ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
      <Text>{msg.content}</Text>
    </Flex>
  ));

  console.log("selectedChat", selectedChat);

  return (



    <>
      <Flex flex={1} direction="column" pt={4} mx={5} overflow="scroll" sx={{ scrollbarWidth: "none" }}>
        {getMessages()}
      </Flex>

      <Bottombar />
    </>



  );
}

export default Chat;
