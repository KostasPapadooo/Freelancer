package dit.hua.gr.backend.models;
import dit.hua.gr.backend.enums.ProjectStatus;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; // Τίτλος του έργου

    @Column(nullable = false)
    private String description; // Περιγραφή του έργου

    @Enumerated(EnumType.STRING)
    private ProjectStatus status; // Enum για τις καταστάσεις έργων (Pending, Approved, etc.)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private User client; // Ο πελάτης που δημοσιεύει το έργο

    // Σχέση με τις αιτήσεις
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Application> applications;

    // Constructors
    public Project() {}

    public Project(String title, String description, ProjectStatus status, User client) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.client = client;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }
}
