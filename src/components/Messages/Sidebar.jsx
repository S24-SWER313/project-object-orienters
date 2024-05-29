import { Avatar, Button, useToast,Flex, Text } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';
import useProfileLoading from '../useProfileLoading';

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  const { user, token } = useAuth();
  const { profileData } = useProfileLoading({profile: user});
  const chats = [
    { id: 'chat1', users: ['user1@example.com', 'user2@example.com'] },
    { id: 'chat2', users: ['user1@example.com', 'user3@example.com'] }
  ];

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
          <Text>{user}</Text>
        </Flex>
      </Flex>
      
      <Flex overflowX="scroll" direction="column" sx={{ scrollbarWidth: "none" }} flex={1}>
        {chats.map(chat => <ChatItem key={chat.id} chat={chat} />)}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
