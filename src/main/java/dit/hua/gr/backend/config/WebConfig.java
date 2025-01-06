package dit.hua.gr.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // Διεύθυνση του frontend στο localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Συμπεριλαμβάνει τις μεθόδους
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Ρυθμίστε το για το χρονικό διάστημα που είναι έγκυρο το CORS preflight
    }
}
