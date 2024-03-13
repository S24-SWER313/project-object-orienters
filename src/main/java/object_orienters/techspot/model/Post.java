package object_orienters.techspot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "post")
@NoArgsConstructor
public class Post  extends Content implements PostBase {
//    @Id
//    @Column(name = "post_id")
//    private long postId;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    private Profile author;
    private Timestamp timestamp;
    private String content;
    private Privacy privacy;
    private int numOfComments;
    private int numOfLikes;
    //private int numOfShares;

    public Post(String content, Profile author) {
        this.content = content;
        this.author = author;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.privacy = Privacy.PUBLIC;
    }

    @Override
    public void like(Reaction reaction) {
        this.numOfLikes++;
    }

    @Override
    public void comment(Comment comment) {

    }

    @Override
    public void share(Profile sharer) {

    }

//    @Override
//    public void comment(Comment comment) {
//        this.numOfComments++;
//        getComments().add(comment);
//    }

//    @Override
//    public void share(Profile sharer) {
//        //SharedPost sharedPost = new SharedPost(this, sharer);
//        sharer.getSharedPosts().add(sharedPost);
//    }

    @Override
    public long getPostId() {
        return 0;
    }

    @Override
    public void editPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    @Override
    public void delete() {

    }
}
