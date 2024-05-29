import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';
import useProfileLoading from '../useProfileLoading';
import { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'; // Use @stomp/stompjs instead of stompjs

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  const { user, token } = useAuth();
  const { profileData } = useProfileLoading({ profile: user });
  const chats = [
    { id: 'chat1', users: ['user1@example.com', 'user2@example.com'] },
    { id: 'chat2', users: ['user1@example.com', 'user3@example.com'] }
  ];

  const [stompClient, setStompClient] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onError,
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const onConnected = () => {
    //stompClient.subscribe(`/user/${user.username}/queue/messages`, onMessageReceived);
    stompClient.subscribe(`/user/public`, onMessageReceived);

    findAndDisplayConnectedUsers();
  };

  const onError = (error) => {
    console.error('Connection error', error);
  };

  const onMessageReceived = (message) => {
    console.log('Message received:', message.body);
  };

  const findAndDisplayConnectedUsers = async () => {
    console.log('findAndDisplayConnectedUsers');
    const connectedUsersResponse = await fetch('http://localhost:8080/users');
    let connectedUsers = await connectedUsersResponse.json();
    console.log(connectedUsers);
    connectedUsers = connectedUsers.filter(user => user.username !== user.username);
    console.log(connectedUsers);
    setConnectedUsers(connectedUsers);
  };

  const appendUserElement = (user, connectedUsersList) => {
    const userElement = document.createElement('li');
    userElement.textContent = `${user.fullName} (${user.username})`;
    connectedUsersList.appendChild(userElement);
  };

  useEffect(() => {
    const connectedUsersList = document.getElementById('connectedUsers');
    if (connectedUsersList) {
      connectedUsersList.innerHTML = '';

      connectedUsers.forEach(user => {
        appendUserElement(user, connectedUsersList);
        if (connectedUsers.indexOf(user) < connectedUsers.length - 1) {
          const separator = document.createElement('li');
          separator.classList.add('separator');
          connectedUsersList.appendChild(separator);
        }
      });
    }
  }, [connectedUsers]);




  const ChatItem = ({ chat }) => {
    const isSelected = chat.id === selectedChatId;
    return (
      <Flex
        key={chat.id}
        p={3}
        align="center"
        bg={isSelected ? "gray.200" : "transparent"}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={() => onSelectChat(chat.id)}
      >
        <Avatar src="" marginEnd={3} />
        <Text>{chat.users.join(', ')}</Text>
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
        {chats.map(chat => <ChatItem key={chat.id} chat={chat} />)}
      </Flex>
      <ul id="connectedUsers"></ul>
    </Flex>
  );
};

export default Sidebar;
