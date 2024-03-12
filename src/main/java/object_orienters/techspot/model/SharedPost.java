package object_orienters.techspot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@Entity
@NoArgsConstructor
public class SharedPost implements PostBase {

    @Id
    private long postId;

    @Getter
    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonBackReference
    private Profile sharer;

    @Getter
    private Post post;

    private Privacy privacy;

    public SharedPost(Post post, Profile sharer) {
        this.sharer = sharer;
        this.post = post;
    }

    @Override
    public void like(Reaction reaction) {
        this.post.like(reaction);

    }

    @Override
    public void comment(Comment comment) {
        this.post.comment(comment);
    }

    @Override
    public void share(Profile sharer) {
          this.post.share(sharer);
    }

    @Override
    public long getPostId() {
        return this.post.getPostId();
    }

    @Override
    public void editPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    @Override
    public void delete() {
        this.post.delete();
    }
}
