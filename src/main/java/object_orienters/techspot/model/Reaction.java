package object_orienters.techspot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Reaction {
    @Id
    private String reactionId;
    @OneToOne
    private Profile reactor;
    ReactionType type;
    @ManyToOne
    @JoinColumn(name = "content_id") //NOTE: what shoulf be the column name here?
    @JsonBackReference
    private Content contentReactedTo;


    enum ReactionType {
        LIKE, DISLIKE, LOVE, SUPPORT, HAHA;
    }
}
