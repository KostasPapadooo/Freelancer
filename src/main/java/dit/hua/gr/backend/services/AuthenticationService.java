package dit.hua.gr.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class AuthenticationService {

    private final UserService userService;

    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    // Μέθοδος για αυθεντικοποίηση με JWT
    public Authentication authenticateWithJwt(String token) {
        try {
            String secretKey = "your_secret_key"; // Το μυστικό σας κλειδί

            // Επαλήθευση του JWT και ανάκτηση των claims
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey(secretKey))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject(); // Χρησιμοποιούμε το email ως subject
            UserDetails userDetails = userService.loadUserByUsername(email);

            // Δημιουργία του Authentication object
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } catch (Exception e) {
            // Χειρισμός εξαίρεσης αν το token δεν είναι έγκυρο
            return null;
        }
    }

    // Νέα μέθοδος για αυθεντικοποίηση με email και password
    public String authenticate(String email, String password) {
        try {
            UserDetails userDetails = userService.loadUserByUsername(email);

            if (userDetails != null && password.equals(userDetails.getPassword())) { // Συγκρίνουμε με κρυπτογραφημένο password
                return generateToken(userDetails);
            }
        } catch (RuntimeException e) {
            // Χειρισμός λάθους αν ο χρήστης δεν βρεθεί
            return null;
        }
        return null; // Αν οι πιστοποιήσεις είναι λανθασμένες
    }

    private String generateToken(UserDetails userDetails) {
        String secretKey = "your_secret_key"; // Το μυστικό σας κλειδί

        return Jwts.builder()
                .setSubject(userDetails.getUsername()) // Εδώ το username είναι το email
                .signWith(getSecretKey(secretKey), SignatureAlgorithm.HS256)
                .compact();
    }

    private SecretKey getSecretKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
