package object_orienters.techspot.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@Entity
@Data
@NoArgsConstructor
@Table(name = "Profile")
public class Profile {

    @Id
    @Column(name = "profile_id")
    private String username;
    private String profilePic;
    private String name;
    private String profession;
    private String email;
    private Gender gender;
    private LocalDate dob;
    @ManyToOne
    private Profile master;
    @OneToMany(mappedBy = "master", fetch = FetchType.EAGER)
    private List<Profile> followers;
    @OneToMany(mappedBy = "master", fetch = FetchType.EAGER)
    private List<Profile> following;
    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    private List<Post> publishedPosts;
//    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
//    private List<SharedPost> sharedPosts;
//    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
//    private Set<Chat> Inbox;


    public Profile(String username, String name, String profession, String email, String profilePic){
        this.username = username;
        this.profilePic = profilePic;
        this.name = name;
        this.profession = profession;
        this.email = email;
        this.profilePic = profilePic;
        this.gender = Gender.FEMALE;
        this.followers  = new ArrayList<>();
        this.following = new ArrayList<>();
        this.publishedPosts = new ArrayList<>();
    }

    public String toString(){
        return "Username: " + username + " Name: " + name + " Profession: " + profession + " Email: " + email;
    }

}



