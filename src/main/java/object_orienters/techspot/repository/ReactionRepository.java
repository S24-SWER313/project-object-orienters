package object_orienters.techspot.repository;

import object_orienters.techspot.model.Content;
import object_orienters.techspot.model.Reaction;
import object_orienters.techspot.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, String> {
    List<Reaction> findByContent(Content content);
    Optional<Reaction> findByReactorAndContent(Profile reactor, Content content);


}
