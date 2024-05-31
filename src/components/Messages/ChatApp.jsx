import { Flex } from '@chakra-ui/layout';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Topbar from './Topbar';
import { ChakraProvider } from '@chakra-ui/react';
import { SelectedChatProvider } from './SelectedChatContext';

const ChatApp = () => {
  return (
    <ChakraProvider>
      <SelectedChatProvider>
        <Flex h="100vh">
          <Sidebar />
          <Flex flex={1} direction="column">
            <Topbar />
            <Chat />
          </Flex>
        </Flex>
      </SelectedChatProvider>
    </ChakraProvider>
  );
};

export default ChatApp;
