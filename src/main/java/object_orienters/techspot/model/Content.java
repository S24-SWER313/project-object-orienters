package object_orienters.techspot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.Filter;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "content")
@Data
public abstract class Content {
    @Id
   @GeneratedValue (strategy = GenerationType.AUTO)
    @Column(name = "content_id", updatable = false, nullable = false)
    @Getter
    private Long contentId;

    @OneToMany(mappedBy = "content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reaction> reactions;
//    @ManyToOne
//    private Content masterContent;
    @OneToMany(mappedBy = "commentedOn", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    //@Filter(name = "commentFilter", condition = "type = 'COMMENT'")
    private List<Comment> comments;
    
}
