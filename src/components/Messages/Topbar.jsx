import { Avatar, Flex, Heading } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SelectedChatContext } from './SelectedChatContext';


function Topbar() {
    const { selectedChat } = useContext(SelectedChatContext);
    return (
        <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
            <Avatar src="" marginEnd={3} />
            <Heading size="lg">{selectedChat.fullName}</Heading>
        </Flex>
    )
}

export default Topbar;
