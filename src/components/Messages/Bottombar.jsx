import { Button, FormControl, Input } from '@chakra-ui/react';
import React, { useState } from 'react'

function Bottombar() {
    const [currentMessage, setCurrentMessage] = useState('');


    const handleSendCurrentMessage = () => {
        console.log("sending ...." + currentMessage);
    };



    return (
        <FormControl p={3} as="form">
            <Input
                placeholder="Type a message"
                width="100%"
                border="1px solid"
                borderColor="gray.300"
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <Button type="submit" hidden autoComplete="off" onClick={handleSendCurrentMessage}>Send</Button>
        </FormControl>
    )
}

export default Bottombar
