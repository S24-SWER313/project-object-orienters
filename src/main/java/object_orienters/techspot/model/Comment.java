package object_orienters.techspot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@DiscriminatorValue("Comment")
public class Comment extends Content {
//    @Id
//    private String commentId;
    @OneToOne
    private Profile Commenter;

    @ManyToOne
    @JoinColumn(name = "content_id")
    @JsonIgnore
    private Content commentedOn;
    private String comment;
    private int numOfReactions;
    private int numOfReplies;
    private Timestamp timestamp;

}
