package dit.hua.gr.backend.repositories;

import dit.hua.gr.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Ενημέρωση για επιστροφή Optional<User>
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
