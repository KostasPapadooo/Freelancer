package dit.hua.gr.backend.controllers;

import dit.hua.gr.backend.models.User;
import dit.hua.gr.backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Επιτρέπει το frontend από localhost:3000
public class LoginController {

    private final AuthenticationService authenticationService;

    @Autowired
    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Χρησιμοποιούμε το email αντί για το username για την αυθεντικοποίηση
        String token = authenticationService.authenticate(user.getEmail(), user.getPassword());
        if (token != null) {
            return ResponseEntity.ok().body(token); // Επιστροφή του JWT token
        } else {
            return ResponseEntity.status(401).body("Invalid credentials"); // Αν τα στοιχεία είναι λάθος
        }
    }
}
