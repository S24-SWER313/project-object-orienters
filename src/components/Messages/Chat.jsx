import { useState, useEffect } from 'react';
import { Flex, Input, Heading, Text, FormControl, Button, Avatar } from "@chakra-ui/react";
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Adjust the path as needed
import Sidebar from './Sidebar';

const Topbar = ({ chatTitle }) => (
  <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
    <Avatar src="" marginEnd={3} />
    <Heading size="lg">{chatTitle}</Heading>
  </Flex>
);

const Bottombar = () => (
    <FormControl p={3} as="form">
      <Input
        placeholder="Type a message"
        width="100%"
        border="1px solid"
        borderColor="gray.300"
      />
      <Button type="submit" hidden autoComplete="off">Send</Button>
    </FormControl>
  );

const Chat = ({ selectedChatId, onSelectChat, userName }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChatId) {
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, where('chatId', '==', selectedChatId), orderBy('timestamp'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [selectedChatId]);

  const getMessages = () => messages.map(msg => (
    <Flex key={msg.id} alignSelf={msg.sender === 'user1@example.com' ? "flex-start" : "flex-end"} bg={msg.sender === 'user1@example.com' ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
      <Text>{msg.text}</Text>
    </Flex>
  ));

  return (
    <Flex h="100vh">
      <Sidebar onSelectChat={onSelectChat} selectedChatId={selectedChatId} userName={userName} />

      <Flex flex={1} direction="column">
        <Topbar chatTitle="Chat Title" />

        <Flex flex={1} direction="column" pt={4} mx={5} overflow="scroll" sx={{ scrollbarWidth: "none" }}>
          {getMessages()}
        </Flex>

        <Bottombar />
      </Flex>
    </Flex>
  );
}

export default Chat;
