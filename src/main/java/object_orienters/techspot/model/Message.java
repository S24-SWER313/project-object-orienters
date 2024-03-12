package object_orienters.techspot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Message")
public class Message {
    @Id
    private Long messageId;
    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile sender;
    private String content;
    private boolean isSeen;
    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonBackReference
    private Chat chat;
}
