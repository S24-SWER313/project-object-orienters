package object_orienters.techspot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
@DiscriminatorValue("Post")
public class Post  extends Content implements PostBase {
//    @Id
//    @Column(name = "post_id")
    private long postId;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    private Profile author;
    private Timestamp timestamp;
    private String content;
    private Privacy privacy;
    private int numOfComments;
    private int numOfLikes;
    // private int numOfShares;
//    @OneToMany(mappedBy = "Content", fetch = FetchType.EAGER)
//    private List<Comment> comments;
//
//    @OneToMany(mappedBy = "Content", fetch = FetchType.EAGER)
//    private List<Reaction> reactions;

    @Override
    public void like(Reaction reaction) {
        this.numOfLikes++;
    }

    @Override
    public void comment(Comment comment) {
        this.numOfComments++;
        getComments().add(comment);
    }

    @Override
    public void share(Profile sharer) {
        SharedPost sharedPost = new SharedPost(this, sharer);
        sharer.getSharedPosts().add(sharedPost);
    }

    @Override
    public void editPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    @Override
    public void delete() {

    }
}
