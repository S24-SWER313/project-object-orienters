package object_orienters.techspot.profile;

import java.util.List;
import java.util.Optional;

import object_orienters.techspot.exception.UserNotFoundException;
import object_orienters.techspot.model.Profile;
import object_orienters.techspot.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import org.springframework.stereotype.Service;

@Service
public class ImpleProfileService implements ProfileService {
    @Autowired
    private ProfileRepository repo;

    public ImpleProfileService(ProfileRepo repo) {
        this.repo = repo;
    }

    @Override
    public Profile getUserByUsername(String username) throws UserNotFoundException {
        return repo.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public Profile createNewUser(Profile newUser) throws UserNotFoundException {
        return repo.save(newUser);
    }

    @Override
    public Profile updateUserProfile(Profile newUser, String username) throws UserNotFoundException {
        Profile updatedUser = repo.findById(username).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setProfilePic(newUser.getProfilePic());
            user.setDob(newUser.getDob());
            user.setEmail(newUser.getEmail());
            user.setFollowers(newUser.getFollowers());
            user.setFollowing(newUser.getFollowing());
            user.setName(newUser.getName());
            user.setProfession(newUser.getProfession());
            user.setGender(newUser.getGender());
            user.setPublishedPosts(newUser.getPublishedPosts());
            //user.setSharedPosts(newUser.getSharedPosts());
            return repo.save(user);
        }).orElseThrow(() -> new UserNotFoundException(username));
        return updatedUser;
    }

    @Override
    public List<Profile> getUserFollowersByUsername(String username) throws UserNotFoundException {
        return null;
    }

    @Override
    public Profile getFollowerByUsername(String username, String followerUsername) throws UserNotFoundException {
        return null;
    }

    @Override
    public List<Profile> getUserFollowingByUsername(String username) throws UserNotFoundException {
        return null;
    }

    @Override
    public Profile getFollowingByUsername(String username, String followingUsername) throws UserNotFoundException {
        return null;
    }

    @Override
    public Profile addNewFollower(String username, Profile newFollower) throws UserNotFoundException {
        Optional<Profile> user = repo.findById(username);
        user.get().getFollowing().add(newFollower);
        newFollower.getFollowers().add(user.get());
        return repo.save(user.get());
    }

    @Override
    public void deleteFollower(String username, Profile deletedUser) throws UserNotFoundException {
        Optional<Profile> profile = repo.findById(username);
        profile.get().getFollowers().remove(deletedUser);
        deletedUser.getFollowing().remove(profile.get());
    }

}
