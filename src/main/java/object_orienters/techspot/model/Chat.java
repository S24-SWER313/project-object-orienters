package object_orienters.techspot.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Chat")
public class Chat {
    @Id
    @Column(name = "chat_id")
    private Long chatId;
    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    private Profile sender;
    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    private Profile receiver;
    @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER)
    private List<Message> messages;
}
