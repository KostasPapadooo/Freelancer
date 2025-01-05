package dit.hua.gr.backend.dto;

import dit.hua.gr.backend.enums.ProjectStatus;

public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private ProjectStatus status; // Κατάσταση του έργου (π.χ. PENDING, APPROVED)

    // Constructors
    public ProjectDTO() {}

    public ProjectDTO(Long id, String title, String description, ProjectStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
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
}
