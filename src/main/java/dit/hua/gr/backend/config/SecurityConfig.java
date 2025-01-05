package dit.hua.gr.backend.config;

import dit.hua.gr.backend.services.AuthenticationService;
import dit.hua.gr.backend.filters.JwtAuthenticationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.authentication.AuthenticationManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationService authenticationService;

    public SecurityConfig(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringAntMatchers("/api/auth/login")) // Αποφεύγουμε το CSRF για το login endpoint
                .authorizeRequests(authz -> authz
                        .antMatchers("/api/auth/login").permitAll() // Δηλαδή επιτρέπει το login χωρίς αυθεντικοποίηση
                        .anyRequest().authenticated() // Όλες οι άλλες αιτήσεις απαιτούν αυθεντικοποίηση
                )
                .addFilter(new JwtAuthenticationFilter(authenticationService)); // Το φίλτρο JWT για αυθεντικοποίηση
    }

    @Override
    protected void configure(AuthenticationManager auth) throws Exception {
        auth.userDetailsService(authenticationService); // Διαχείριση των χρηστών
    }
}
