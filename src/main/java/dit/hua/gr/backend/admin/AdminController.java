package dit.hua.gr.backend.admin;

import dit.hua.gr.backend.models.Application;
import dit.hua.gr.backend.models.Project;
import dit.hua.gr.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Διαχείριση χρηστών
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = adminService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = adminService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = adminService.updateUser(id, updatedUser);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Διαχείριση έργων
    @GetMapping("/projects/pending")
    public ResponseEntity<List<Project>> getPendingProjects() {
        List<Project> projects = adminService.getPendingProjects();
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/projects/{projectId}/approve")
    public ResponseEntity<Project> approveProject(@PathVariable Long projectId) {
        Project project = adminService.approveProject(projectId);
        return project != null ? ResponseEntity.ok(project) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/projects/{projectId}/reject")
    public ResponseEntity<Void> rejectProject(@PathVariable Long projectId) {
        adminService.rejectProject(projectId);
        return ResponseEntity.noContent().build();
    }

    // Διαχείριση αιτήσεων
    @GetMapping("/applications/project/{projectId}")
    public ResponseEntity<List<Application>> getApplicationsForProject(@PathVariable Long projectId) {
        List<Application> applications = adminService.getApplicationsForProject(projectId);
        return ResponseEntity.ok(applications);
    }
}
