package object_orienters.techspot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.Filter;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "content")
@Data
public abstract class Content {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column(name = "content_id", updatable = false, nullable = false)
    @Getter
    private Long contentId;

    @OneToMany(mappedBy = "Content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reaction> reactions;
    @OneToMany(mappedBy = "content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    //@Filter(name = "commentFilter", condition = "type = 'COMMENT'")
    private List<Content> comments;
    
}
