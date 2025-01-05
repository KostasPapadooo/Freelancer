package dit.hua.gr.backend.repositories;

import dit.hua.gr.backend.models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // Προσθήκη της δήλωσης εισαγωγής για τη λίστα

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // Προσθέστε προσαρμοσμένες μεθόδους αν χρειάζεται
    List<Application> findByProjectId(Long projectId);
    List<Application> findByUserId(Long userId);
}
