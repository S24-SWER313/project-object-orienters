package object_orienters.techspot.security.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "useroauthtemp")
public class UserOAuthTemp {

    @Id
    String id;

    @Email
    String email;

    String name;

    String profilePicUrl;

    @Enumerated(EnumType.STRING)
    Provider provider;

    String accessToken;

    @Override
    public String toString() {
        return "UserOAuthTemp(id=" + this.getId() + ", email=" + this.getEmail() + ", name=" + this.getName() + ", profilePicUrl=" + this.getProfilePicUrl() + ", provider=" + this.getProvider() + ", accessToken=" + this.getAccessToken() + ")";
    }
}
