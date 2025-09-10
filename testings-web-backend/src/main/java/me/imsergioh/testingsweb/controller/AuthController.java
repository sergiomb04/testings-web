package me.imsergioh.testingsweb.controller;

import me.imsergioh.testingsweb.object.request.LoginRequest;
import me.imsergioh.testingsweb.object.user.User;
import me.imsergioh.testingsweb.service.JwtService;
import me.imsergioh.testingsweb.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static JwtService jwtService;

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o inválido");
        }

        String token = authHeader.substring(7);

        String username = null;
        boolean valid = false;

        try {
            username = getJwtService().extractUsername(token);
            if (username != null)
                valid = getJwtService().isTokenValid(token, username);
        } catch (Exception ignore) {}

        if (username != null && valid) {
            return ResponseEntity.ok("{\"valid\":true}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"valid\":false}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        UserService userService = UserService.getInstance();
        User user = userService.getByUsername(request.username());
        if (user != null && userService.getPasswordEncoder().matches(request.password(), user.password())) {
            String token = getJwtService().generateToken(user);
            return ResponseEntity.ok().header("Set-Cookie", "token=" + token + "; HttpOnly; Secure; Path=/")
                    .body(Map.of("token", token));
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        UserService userService = UserService.getInstance();
        User toCheckUser = userService.getByUsername(request.username());

        if (toCheckUser != null) {
            return ResponseEntity.status(500).body(Map.of("message", "Username already exist"));
        }

        try {
            User user = userService.registerUser(request.username(), request.password());
            String token = getJwtService().generateToken(user);
            return ResponseEntity.ok().header("Set-Cookie", "token=" + token + "; HttpOnly; Secure; Path=/")
                    .body(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Could not register user. Internal error."));
        }
    }

    public static JwtService getJwtService() {
        if (jwtService == null) jwtService = new JwtService();
        return jwtService;
    }
}
