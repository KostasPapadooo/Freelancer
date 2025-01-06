package dit.hua.gr.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm; // Προσθήκη της εισαγωγής
import io.jsonwebtoken.security.Keys; // Προσθήκη της εισαγωγής
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey; // Προσθήκη της εισαγωγής
import java.nio.charset.StandardCharsets;

@Service
public class AuthenticationService {

    private final UserService userDetailsService; // Υπηρεσία για την ανάκτηση χρηστών

    public AuthenticationService(UserService UserService) {
        this.userDetailsService = UserService;
    }

    // Μέθοδος για αυθεντικοποίηση με JWT
    public Authentication authenticateWithJwt(String token) {
        try {
            String secretKey = "your_secret_key"; // Το μυστικό σας κλειδί

            // Επαλήθευση του JWT και ανάκτηση των claims
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey(secretKey)) // Χρησιμοποιούμε τη μέθοδο getSecretKey
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();  // Χρησιμοποιούμε το email ως subject
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Δημιουργία του Authentication object
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } catch (Exception e) {
            // Χειρισμός εξαίρεσης αν το token δεν είναι έγκυρο
            return null;
        }
    }

    // Νέα μέθοδος για αυθεντικοποίηση με email και password
    public String authenticate(String email, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if (userDetails != null && password.equals(userDetails.getPassword())) { // Εδώ θα πρέπει να συγκρίνετε με κρυπτογραφημένο password
            return generateToken(userDetails); // Δημιουργία και επιστροφή του JWT token
        }
        return null; // Αν οι πιστοποιήσεις είναι λανθασμένες
    }

    private String generateToken(UserDetails userDetails) {
        String secretKey = "your_secret_key"; // Το μυστικό σας κλειδί

        return Jwts.builder()
                .setSubject(userDetails.getUsername())  // Εδώ το username είναι το email
                .signWith(getSecretKey(secretKey), SignatureAlgorithm.HS256) // Χρησιμοποιούμε τη μέθοδο getSecretKey
                .compact();
    }

    private SecretKey getSecretKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // Δημιουργία του Secret Key από το byte array
    }
}
