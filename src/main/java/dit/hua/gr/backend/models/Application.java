package dit.hua.gr.backend.models;

import jakarta.persistence.*;
import dit.hua.gr.backend.enums.ApplicationStatus; // Εισαγωγή της κλάσης ApplicationStatus

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Ο freelancer που υποβάλλει την αίτηση

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project; // Το έργο στο οποίο υποβάλλεται η αίτηση

    private String message; // Μήνυμα από τον freelancer

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status; // Κατάσταση της αίτησης

    // Constructors
    public Application() {}

    public Application(User user, Project project, String message, ApplicationStatus status) {
        this.user = user;
        this.project = project;
        this.message = message;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}
