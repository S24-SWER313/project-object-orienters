import { Box, Button, FormControl, Input, flexbox } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { SelectedChatContext } from './SelectedChatContext';
import { useAuth } from '../AuthProvider';

function Bottombar() {
    const [currentMessage, setCurrentMessage] = useState('');
    const { messages, setMessages } = useContext(SelectedChatContext);
    const { clientRef, selectedChat } = useContext(SelectedChatContext);
    const { user } = useAuth();

    const handleSendCurrentMessage = (e) => {
        e.preventDefault();
        setCurrentMessage("");
        console.log("sending ...." + currentMessage);
        const chatMessage = {
            content: currentMessage,
            senderId: user,
            timestamp: new Date(),
            recipientId: selectedChat.username
        };
        setMessages([...messages, chatMessage]);
        if (clientRef.current) {
            console.log("sending ref...." + JSON.stringify(chatMessage));
            clientRef.current.publish({ destination: "/app/chat", body: JSON.stringify(chatMessage) });
        }
    };



    return (
        <Box m={3} >
        <form onSubmit={(e)=>{handleSendCurrentMessage(e)}}>
            <FormControl>
                <Input
                    placeholder="Type a message"
                    width="100%"
                    border="1px solid"
                    borderColor="gray.300"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    marginBottom={5}
                />
                <Button type="submit" autoComplete="off" hidden>Send</Button>
            </FormControl>
        </form>

          </Box>
    )
}

export default Bottombar
