package dit.hua.gr.backend.services;

import dit.hua.gr.backend.models.User;
import dit.hua.gr.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;

    @Value("${jwt.secret}")
    private String secretKey;

    public AuthenticationService(UserRepository userRepository, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.jwtEncoder = jwtEncoder;
    }

    public String authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return generateJwtToken(user.get());
        }
        throw new UsernameNotFoundException("Invalid username or password");
    }

    private String generateJwtToken(User user) {
        Instant now = Instant.now();
        Instant expiryDate = now.plusSeconds(86400); // 1 day expiry

        Jwt jwt = jwtEncoder.encode(JwtEncoderParameters.from(
                user.getUsername(), now, expiryDate, secretKey));

        return jwt.getTokenValue();
    }
}
