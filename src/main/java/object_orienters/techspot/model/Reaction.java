package object_orienters.techspot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Entity
@Data
@Table(name = "reaction")
public class Reaction {
    @Id
    private String reactionId;
    @OneToOne
    private Profile reactor;
    ReactionType type;
    @ManyToOne
    @JoinColumn(name = "content_id")
    @JsonBackReference
    private Content content;


    enum ReactionType {
        LIKE, DISLIKE, LOVE, SUPPORT, HAHA;
    }
}
