package dit.hua.gr.backend.models;

import dit.hua.gr.backend.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Enum για τους ρόλους (Admin, Client, Freelancer)

    // Σχέση με τις αιτήσεις
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Application> applications;

    // Υλοποίηση του UserDetails interface
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(() -> role.name()); // Προσθέτουμε τον ρόλο ως authority
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Μπορείτε να προσαρμόσετε τη λογική σας
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Μπορείτε να προσαρμόσετε τη λογική σας
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Μπορείτε να προσαρμόσετε τη λογική σας
    }

    @Override
    public boolean isEnabled() {
        return true; // Μπορείτε να προσαρμόσετε τη λογική σας
    }
}
