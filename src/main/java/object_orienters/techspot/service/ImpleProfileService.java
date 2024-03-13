package object_orienters.techspot.service;

import java.util.List;
import java.util.Optional;

import object_orienters.techspot.exception.UserNotFoundException;
import object_orienters.techspot.model.Profile;
import object_orienters.techspot.repository.profileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImpleProfileService implements ProfileService {
    private profileRepository repo;

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
            user.setProffesion(newUser.getProffesion());
            user.setGender(newUser.getGender());
            user.setPublishedPosts(newUser.getPublishedPosts());
            user.setSharedPosts(newUser.getSharedPosts());
            return repo.save(user);
        }).orElseThrow(() -> new UserNotFoundException(username));
        return updatedUser;
    }

    @Override
    public List<Profile> getUserFollowersByUsername(String username) throws UserNotFoundException {
        return repo.findFollowersByUserId(username);
    }

    @Override
    public Profile getFollowerByUsername(String username, String followerUserName) throws UserNotFoundException {
        return repo.findFollowerByUsername(username, followerUserName);
    }

    @Override
    public List<Profile> getUserFollowingByUsername(String username) throws UserNotFoundException {
        return repo.findFollowingByUserId(username);
    }

    @Override
    public Profile getFollowingByUsername(String username, String followingUsername) throws UserNotFoundException {
        return repo.findFollowingByUsername(username, followingUsername);
    }

    //TODO: REVISION NEEDED
    @Override
    public Profile addNewFollower(String username, Profile newFollower) throws UserNotFoundException {
        Optional<Profile> user = repo.findById(username);
        user.get().getFollowers().add(newFollower);
        newFollower.getFollowing().add(user.get());
        return repo.save(user.get());
    }

    //TODO: REVISION NEEDED
    @Override
    public void deleteFollower(String username) throws UserNotFoundException {
        repo.deleteById(username);

    }

    //TODO: REVISION NEEDED
    @Override
    public Profile addNewFollowing(String username, Profile newFollowing) throws UserNotFoundException {
        Optional<Profile> user = repo.findById(username);
        user.get().getFollowing().add(newFollowing);
        newFollowing.getFollowers().add(user.get());
        return repo.save(user.get());
    }

    //TODO: REVISION NEEDED
    @Override
    public void deleteFollowing(String username) throws UserNotFoundException {
        repo.deleteById(username);
    }

}
