package object_orienters.techspot.repository;

import object_orienters.techspot.model.Post;
import object_orienters.techspot.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Collection;

public interface PostRepository extends JpaRepository<Post, Long> {
    //Collection<Post> findByAuthor(Profile user);
}
