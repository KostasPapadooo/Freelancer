package dit.hua.gr.backend.utils;

import dit.hua.gr.backend.dto.ApplicationDTO;
import dit.hua.gr.backend.dto.ProjectDTO;
import dit.hua.gr.backend.dto.UserDTO;
import dit.hua.gr.backend.models.Application;
import dit.hua.gr.backend.models.Project;
import dit.hua.gr.backend.models.User;

public class MapperUtil {

    // Μετατροπή από UserDTO σε User
    public static User toUser(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        return user;
    }

    // Μετατροπή από User σε UserDTO
    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    // Μετατροπή από ProjectDTO σε Project
    public static Project toProject(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.getId());
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setStatus(projectDTO.getStatus());
        return project;
    }

    // Μετατροπή από Project σε ProjectDTO
    public static ProjectDTO toProjectDTO(Project project) {
        return new ProjectDTO(project.getId(), project.getTitle(), project.getDescription(), project.getStatus());
    }

    // Μετατροπή από ApplicationDTO σε Application
    public static Application toApplication(ApplicationDTO applicationDTO) {
        Application application = new Application();
        application.setId(applicationDTO.getId());
        application.setUser(applicationDTO.getUser());
        application.setProject(applicationDTO.getProject());
        application.setMessage(applicationDTO.getMessage());
        return application;
    }

    // Μετατροπή από Application σε ApplicationDTO
    public static ApplicationDTO toApplicationDTO(Application application) {
        return new ApplicationDTO(application.getId(), application.getUser(), application.getProject(), application.getMessage());
    }
}
