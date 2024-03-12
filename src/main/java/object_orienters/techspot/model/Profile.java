package object_orienters.techspot.model;

import jakarta.persistence.*;

import java.awt.image.BufferedImage;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Profile")
public class Profile {

    @Id
    @Column(name = "profile_id")
    private String username;
    private BufferedImage profilePic;
    private String name;
    private String proffesion; 
    private String email;
    private Gender gender;
    private LocalDate dob;
    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
    private List<Profile> followers;
    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
    private List<Profile> following;
    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
    private List<Post> publishedPosts;
    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
    private List<SharedPost> sharedPosts;
    @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER)
    private Set<Chat> Inbox;



}



