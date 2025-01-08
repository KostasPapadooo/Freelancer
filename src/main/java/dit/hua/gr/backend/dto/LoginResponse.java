package dit.hua.gr.backend.dto;

public class LoginResponse {
    private String token;

    // Constructors
    public LoginResponse() {}

    public LoginResponse(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}