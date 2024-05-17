package object_orienters.techspot.profile;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends PagingAndSortingRepository<Profile, String> {

    @Query("SELECT f FROM Profile u JOIN u.followers f WHERE u.owner.username = :userName")
    List<Profile> findFollowersByUserId(String userName);

    @Query("SELECT f FROM Profile u JOIN u.followers f WHERE f.owner.username = :username AND u.owner.username = :accountUsername")
    Optional<Profile> findFollowerByUsername(String accountUsername, String username);

    @Query("SELECT f FROM Profile u JOIN u.following f WHERE u.owner.username = :userName")
    List<Profile> findFollowingByUserId(String userName);

    @Query("SELECT f FROM Profile u JOIN u.following f WHERE f.owner.username = :username AND u.owner.username = :accountUsername")
    Optional<Profile> findFollowingByUsername(String accountUsername, String username);

    @Query("SELECT u FROM Profile u WHERE u.owner.username = :username")
    Optional<Profile> findByUsername(String username);

    Optional<Profile> findByEmail(String email);

    List<Profile> findByName(String Name);

    @Query("SELECT u FROM Profile u WHERE u.username = :username")
    Optional<Profile> findById(String username);

    Profile save(Profile profile);

    void delete(Profile profile);

    @Query("SELECT p FROM Profile p WHERE lower(p.name) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(p.username) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(p.email) LIKE lower(concat('%', :searchTerm, '%'))")
    Page<Profile> findBySearchCriteria(@Param("searchTerm") String searchTerm, Pageable pageable);

}
