package dit.hua.gr.backend.utils;

import dit.hua.gr.backend.enums.ProjectStatus;
import dit.hua.gr.backend.models.Application;
import dit.hua.gr.backend.models.Project;
import dit.hua.gr.backend.enums.Role;
import dit.hua.gr.backend.models.User;
import dit.hua.gr.backend.repositories.ApplicationRepository;
import dit.hua.gr.backend.repositories.ProjectRepository;
import dit.hua.gr.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataLoader {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public DataLoader(UserRepository userRepository, ProjectRepository projectRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.applicationRepository = applicationRepository;
    }

    @PostConstruct
    public void loadData() {
        // Φόρτωση αρχικών χρηστών
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@freelancerplatform.gr");
            admin.setPassword("adminpass");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);

            User client1 = new User();
            client1.setUsername("Γιώργος Παπαδόπουλος");
            client1.setEmail("giorgos.papadopoulos@example.com");
            client1.setPassword("clientpass");
            client1.setRole(Role.CLIENT);
            userRepository.save(client1);

            User freelancer1 = new User();
            freelancer1.setUsername("Μαρία Ιωαννίδου");
            freelancer1.setEmail("maria.ioannidou@example.com");
            freelancer1.setPassword("freelancerpass");
            freelancer1.setRole(Role.FREELANCER);
            userRepository.save(freelancer1);

            User freelancer2 = new User();
            freelancer2.setUsername("Δημήτρης Καραγιάννης");
            freelancer2.setEmail("dimitris.karagiannis@example.com");
            freelancer2.setPassword("freelancerpass");
            freelancer2.setRole(Role.FREELANCER);
            userRepository.save(freelancer2);
        }

        // Φόρτωση αρχικών έργων
        if (projectRepository.count() == 0) {
            Project project1 = new Project();
            project1.setTitle("Δημιουργία Ιστοσελίδας για Κατάστημα Ρούχων");
            project1.setDescription("Αναζητώ ελεύθερο επαγγελματία για τη δημιουργία μιας ιστοσελίδας e-commerce για το κατάστημα ρούχων μου.");
            project1.setStatus(ProjectStatus.PENDING); // Αν δεν έχεις δημιουργήσει το ProjectStatus, πρέπει να το δημιουργήσεις.
            project1.setClient(userRepository.findByUsername("Γιώργος Παπαδόπουλος").orElseThrow());
            projectRepository.save(project1);

            Project project2 = new Project();
            project2.setTitle("Σχεδίαση Λογοτύπου για Εταιρεία");
            project2.setDescription("Χρειάζομαι ένα λογότυπο για την επιχείρησή μου, που να αντικατοπτρίζει την ταυτότητά της.");
            project2.setStatus(ProjectStatus.PENDING);
            project2.setClient(userRepository.findByUsername("Γιώργος Παπαδόπουλος").orElseThrow());
            projectRepository.save(project2);
        }

        // Φόρτωση αρχικών αιτήσεων
        if (applicationRepository.count() == 0) {
            Application application1 = new Application();
            application1.setUser(userRepository.findByUsername("Μαρία Ιωαννίδου").orElseThrow());
            application1.setProject(projectRepository.findByTitle("Δημιουργία Ιστοσελίδας για Κατάστημα Ρούχων").orElseThrow());
            application1.setMessage("Ενδιαφέρομαι πολύ για αυτό το έργο και έχω εμπειρία στη δημιουργία ιστοσελίδων.");
            applicationRepository.save(application1);

            Application application2 = new Application();
            application2.setUser(userRepository.findByUsername("Δημήτρης Καραγιάννης").orElseThrow());
            application2.setProject(projectRepository.findByTitle("Σχεδίαση Λογοτύπου για Εταιρεία").orElseThrow());
            application2.setMessage("Έχω εμπειρία στη σχεδίαση λογοτύπων και θα ήθελα να συνεργαστώ.");
            applicationRepository.save(application2);
        }
    }
}
