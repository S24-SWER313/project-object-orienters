package object_orienters.techspot;

import object_orienters.techspot.model.Profile;
import object_orienters.techspot.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


public class LocalDatabase {
    @Configuration
    class LoadDatabase {

        private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

        @Bean
        CommandLineRunner initDatabase(ProfileRepository repository, ReactionRepository reactionRepository, PostRepository postRepository,
                                       CommentRepository commentRepository, MessageRepository messageRepository, ChatRepository chatRepository) {

            return args -> {
                Profile prof = new Profile();

                repository.save(prof);

                Profile prof2 = new Profile();

                prof2.getFollowing().add(prof);
                repository.save(prof2);

                prof.getFollowers().add(prof2);
                repository.save(prof);



                log.info("Preloading " + prof);


                log.info("Preloading " + prof2);

            };
        }
    }
}
