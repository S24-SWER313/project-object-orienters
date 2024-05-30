import { useState } from 'react';
import Chat from './Chat';

const ChatApp = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <Chat selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
  )
}

export default ChatApp;
