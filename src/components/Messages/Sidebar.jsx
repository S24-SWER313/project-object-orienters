import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAuth } from '../AuthProvider';
import useProfileLoading from '../useProfileLoading';
import { useContext } from "react";
import { SelectedChatContext } from './SelectedChatContext';

const Sidebar = () => {
  const { user } = useAuth();
  const { profileData } = useProfileLoading({ profile: user });

  const { selectedChat, setSelectedChat, connectedUsers } = useContext(SelectedChatContext);



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
