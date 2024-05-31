import { Box, Button, FormControl, Input, flexbox } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { SelectedChatContext } from './SelectedChatContext';

function Bottombar() {
    const [currentMessage, setCurrentMessage] = useState('');
    const { messages, setMessages } = useContext(SelectedChatContext);
    const { clientRef } = useContext(SelectedChatContext);

    const handleSendCurrentMessage = () => {
        console.log("sending ...." + currentMessage);
        const chatMessage = {
            content: currentMessage,
            senderId: "Angela",
            timestamp: new Date(),
            recipientId: "Yousef"
        };
        setMessages([...messages, chatMessage]);
        if (clientRef.current) {
            console.log("sending ref...." + JSON.stringify(chatMessage));
            clientRef.current.publish({ destination: "/app/chat", body: JSON.stringify(chatMessage) });
        }
    };



    return (
        <Box p={3} display='flex'>
            <Input
                placeholder="Type a message"
                width="100%"
                border="1px solid"
                borderColor="gray.300"
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <Button type="button" autoComplete="off" onClick={handleSendCurrentMessage}>Send</Button>
        </Box>
    )
}

export default Bottombar
