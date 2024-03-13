package object_orienters.techspot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "comment")
public class Comment extends Content {
        //    @Id
        //    private String commentId;
//    @OneToOne
//    private Profile Commenter;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @JsonIgnore
    private Content commentedOn;
    private String comment;
    private int numOfReactions;
    private int numOfReplies;
    private Timestamp timestamp;

}
