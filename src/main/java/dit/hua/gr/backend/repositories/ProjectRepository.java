package dit.hua.gr.backend.repositories;

import dit.hua.gr.backend.enums.ProjectStatus;
import dit.hua.gr.backend.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Προσθέστε προσαρμοσμένες μεθόδους αν χρειάζεται
    List<Project> findByStatus(ProjectStatus status);

    // Νέα μέθοδος για την αναζήτηση έργου με βάση τον τίτλο
    Optional<Project> findByTitle(String title); // Προσθήκη αυτής της γραμμής
}
