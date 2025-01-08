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
import java.util.Optional;

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
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        // Ενημερώστε άλλα πεδία αν χρειάζεται
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    // Διαχείριση έργων
    public List<Project> getPendingProjects() {
        return projectRepository.findByStatus(ProjectStatus.PENDING);
    }

    public Project approveProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
        project.setStatus(ProjectStatus.APPROVED);
        return projectRepository.save(project);
    }

    public void rejectProject(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new IllegalArgumentException("Project not found with ID: " + projectId);
        }
        projectRepository.deleteById(projectId);
    }

    // Διαχείριση αιτήσεων
    public List<Application> getApplicationsForProject(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new IllegalArgumentException("Project not found with ID: " + projectId);
        }
        return applicationRepository.findByProjectId(projectId);
    }

    // Προσθέστε άλλες μεθόδους αν χρειάζεται
}
