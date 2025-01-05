package dit.hua.gr.backend.dto;

import dit.hua.gr.backend.models.User; // Εδώ μπορεί να χρειαστείτε μόνο το ID του χρήστη
import dit.hua.gr.backend.models.Project; // Εδώ μπορεί να χρειαστείτε μόνο το ID του έργου

public class ApplicationDTO {
    private Long id;
    private User user; // Ο χρήστης που υποβάλλει την αίτηση
    private Project project; // Το έργο για το οποίο υποβάλλεται η αίτηση
    private String message; // Μήνυμα από τον freelancer

    // Constructors
    public ApplicationDTO() {}

    public ApplicationDTO(Long id, User user, Project project, String message) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.message = message;
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
}
