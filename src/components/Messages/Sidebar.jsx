import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';
import useProfileLoading from '../useProfileLoading';
import { useContext, useEffect, useRef, useState } from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { SelectedChatContext } from './SelectedChatContext';

const Sidebar = () => {
  const { user } = useAuth();
  const { profileData } = useProfileLoading({ profile: user });
  const [connectedUsers, setConnectedUsers] = useState([]);
  const clientRef = useRef(null);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onError,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const onConnected = () => {
    if (clientRef.current) {
      clientRef.current.subscribe(`/user/public`, onMessageReceived);
      findAndDisplayConnectedUsers();
    }
  };

  const onError = (error) => {
    console.error('Connection error', error);
  };

  const onMessageReceived = (message) => {
    console.log('Message received:', message.body);
  };

  const findAndDisplayConnectedUsers = async () => {
    const connectedUsersResponse = await fetch('http://localhost:8080/users');
    let connectedUsers = await connectedUsersResponse.json();
    connectedUsers = connectedUsers.filter(users => users.username !== user);
    setConnectedUsers(connectedUsers);
  };

  const ChatItem = ({ chat }) => {
    const isSelected = chat.username === selectedChat?.username;
    return (
      <Flex
        key={chat.username}
        p={3}
        align="center"
        bg={isSelected ? "gray.200" : "transparent"}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={() => setSelectedChat(chat)}
      >
        <Avatar src="" marginEnd={3} />
        <Text>{chat.fullName}</Text>
      </Flex>
    );
  };

  return (
    <Flex h="100%" w="300px" borderEnd="1px solid" borderColor="gray.200" direction="column">
      <Flex h="81px" w="100%" align="center" justifyContent="space-between" borderBottom="1px solid" borderColor="gray.200" p={3}>
        <Flex align="center">
          <Avatar
            name={profileData ? profileData.name : 'No Name'}
            src={profileData?.profilePic?.fileUrl}
            alt={'Profile picture'}
            marginEnd={3}
            css={{
              border: '2px solid black',
            }}
          />
          <Text id="connected-user-fullname">{profileData ? profileData.name : 'User'}</Text>
        </Flex>
      </Flex>

      <Flex overflowY="scroll" direction="column" sx={{ scrollbarWidth: "none" }} flex={1}>
        {connectedUsers.map(chat => <ChatItem key={chat.username} chat={chat} />)}
      </Flex>
      <ul id="connectedUsers"></ul>
    </Flex>
  );
};

export default Sidebar;
