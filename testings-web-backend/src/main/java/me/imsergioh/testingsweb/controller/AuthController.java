package me.imsergioh.testingsweb.controller;

import jakarta.servlet.http.HttpServletRequest;
import me.imsergioh.testingsweb.object.request.ChangePasswordRequest;
import me.imsergioh.testingsweb.object.request.LoginRequest;
import me.imsergioh.testingsweb.object.user.User;
import me.imsergioh.testingsweb.service.JwtService;
import me.imsergioh.testingsweb.service.UserService;
import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static JwtService jwtService;

    @PostMapping("/verify")
    public ResponseEntity<?> verify(HttpServletRequest request) {
        User user = UserController.getUserFromRequest(request);

        if (user != null) {
            return ResponseEntity.ok("{\"valid\":true}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"valid\":false}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.isNotValid()) return ResponseEntity.status(500).body(new Document("message", "Login no válido.").toJson());
        UserService userService = UserService.getInstance();
        User user = userService.getByUsername(request.username());
        if (user != null && userService.getPasswordEncoder().matches(request.password(), user.password())) {
            String token = getJwtService().generateToken(user);
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (request.isNotValid()) return ResponseEntity.status(500).body(new Document("message", "Registro no válido.").toJson());
        UserService userService = UserService.getInstance();
        User toCheckUser = userService.getByUsername(request.username());

        if (toCheckUser != null) {
            return ResponseEntity.status(500).body(Map.of("message", "Username already exist"));
        }

        try {
            User user = userService.registerUser(request.username(), request.password());
            String token = getJwtService().generateToken(user);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Could not register user. Internal error."));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> register(@RequestBody ChangePasswordRequest request) {
        if (request.isNotValid()) return ResponseEntity.status(500).body(new Document("message", "Solicitud no válida.").toJson());
        ResponseEntity<?> response = ResponseEntity.status(500).body(null);

        UserService userService = UserService.getInstance();
        User user = userService.getByUsername(request.username());
        if (user == null) return response;

        // No coincide old password
        if (!userService.getPasswordEncoder().matches(request.oldPassword(), user.password())) return response;

        String newToken = getJwtService().generateToken(user);

        userService.changePassword(user, request.newPassword());

        return ResponseEntity.ok(Map.of("token", newToken));

    }

    public static JwtService getJwtService() {
        if (jwtService == null) jwtService = new JwtService();
        return jwtService;
    }
}
