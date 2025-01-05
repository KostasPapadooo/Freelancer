package dit.hua.gr.backend.admin;

import dit.hua.gr.backend.enums.ProjectStatus;
import dit.hua.gr.backend.models.Application;
import dit.hua.gr.backend.models.Project;
import dit.hua.gr.backend.models.User;
import dit.hua.gr.backend.repositories.ApplicationRepository;
import dit.hua.gr.backend.repositories.ProjectRepository;
import dit.hua.gr.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public AdminService(UserRepository userRepository, ProjectRepository projectRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.applicationRepository = applicationRepository;
    }

    // Διαχείριση χρηστών
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);
        if (existingUser != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            // Ενημερώστε άλλα πεδία αν χρειάζεται
            return userRepository.save(existingUser);
        }
        return null; // ή ρίξτε εξαίρεση
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Διαχείριση έργων
    public List<Project> getPendingProjects() {
        return projectRepository.findByStatus(ProjectStatus.PENDING);
    }

    public Project approveProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            project.setStatus(ProjectStatus.APPROVED);
            return projectRepository.save(project);
        }
        return null; // ή ρίξτε εξαίρεση
    }

    public void rejectProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    // Διαχείριση αιτήσεων
    public List<Application> getApplicationsForProject(Long projectId) {
        return applicationRepository.findByProjectId(projectId);
    }

    // Προσθέστε άλλες μεθόδους αν χρειάζεται
}
