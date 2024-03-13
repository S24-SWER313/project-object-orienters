package object_orienters.techspot.service;

import object_orienters.techspot.exception.ChatAlreadyExistsException;
import object_orienters.techspot.exception.ChatNotFoundException;
import object_orienters.techspot.model.Chat;
import object_orienters.techspot.model.Profile;
import object_orienters.techspot.repository.ChatRepository;
import object_orienters.techspot.repository.profileRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;
@Service
public class ImpleChatService implements ChatService {
    ChatRepository chatRepository;
    profileRepository userRepository;
    public ImpleChatService(ChatRepository chatRepository, profileRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Chat createChat(Chat chat) {
        Objects.requireNonNull(chat, "Chat cannot be null");
        Profile sender = chat.getSender();
        Profile receiver = chat.getReceiver();
        Objects.requireNonNull(sender, "Sender cannot be null");
        Objects.requireNonNull(receiver, "Receiver cannot be null");

        // Check if the chat already exists in the repository
        if (chatRepository.findById(chat.getChatId()).isPresent()) {
            throw new ChatAlreadyExistsException(chat.getChatId());
        }

        // Check if there is already a chat between the sender and receiver
        if (sender.getInbox().stream()
                .anyMatch(c -> c.getReceiver().getName().equals(receiver.getName()) || c.getSender().getName().equals(receiver.getName()))) {
            throw new ChatAlreadyExistsException(chat.getChatId());
        }
        return chatRepository.save(chat);
    }


    @Override
    public Chat getChat(Long chatId){
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatNotFoundException(chatId));
    }

    @Override
    public String deleteChat(Long chatId) {
        if (chatRepository.existsById(chatId)) {
            chatRepository.deleteById(chatId);
            return "Chat with ID: " + chatId + " ,deleted successfully";
        } else {
            throw new ChatNotFoundException(chatId);
        }
    }

    @Override
    public Set<Chat> getAllChats(String userName) {
        return null;
    }

}
