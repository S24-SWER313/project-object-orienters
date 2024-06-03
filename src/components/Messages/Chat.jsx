import { useState, useEffect, useContext } from 'react';
import { Flex, Input, Heading, Text, FormControl, Button, Avatar, VStack, CircularProgress } from "@chakra-ui/react";
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
  const { selectedChat, messages, setMessages } = useContext(SelectedChatContext);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("entered selectedChat", selectedChat.username);
    const fetchUserChat = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/messages/${user}/${selectedChat.username}`);
      const data = await response.json();
      console.log("data", data);
      setMessages(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      setIsLoading(false);
    };

    if (user && selectedChat.username) {
      fetchUserChat();
    }

  }, [user, selectedChat]);

  const getMessages = () => messages.map(msg => (
    <>
      <Flex key={'msg' + msg.id} alignSelf={msg.senderId == selectedChat.username ? "flex-start" : "flex-end"} bg={msg.senderId === selectedChat.username ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
        <VStack>
          <Text key={msg.id}>{msg.content}</Text>
        </VStack>
      </Flex>
      <Text m={2} marginTop={0} fontSize="x-small" alignSelf={msg.senderId == selectedChat.username ? "flex-start" : "flex-end"} marginBottom={5}>{new Date(msg.timestamp).toLocaleTimeString()}</Text>
    </>

  ));

  console.log("selectedChat", selectedChat);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);


  return (



    <>
      <Flex id='chat-container' flex={1} direction="column" pt={4} mx={5} overflow="scroll" sx={{ scrollbarWidth: "none" }}>
        
        {isLoading && selectedChat?.username ? <CircularProgress alignSelf='center' isIndeterminate color='green.300' /> : getMessages()}

      </Flex>

      <Bottombar />
    </>



  );
}

export default Chat;
