package object_orienters.techspot.security.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "refreshtoken")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "refresh_seq_gen")
    @SequenceGenerator(name = "refresh_seq_gen", sequenceName = "refreshtoken_seq", allocationSize = 1)
    private long id;

    @OneToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expiryDate;
}
