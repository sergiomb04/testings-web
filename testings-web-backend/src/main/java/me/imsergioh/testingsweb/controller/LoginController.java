package me.imsergioh.testingsweb.controller;

import me.imsergioh.testingsweb.object.request.LoginRequest;
import me.imsergioh.testingsweb.object.user.User;
import me.imsergioh.testingsweb.service.JwtService;
import me.imsergioh.testingsweb.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private static JwtService jwtService;

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

    public static JwtService getJwtService() {
        if (jwtService == null) jwtService = new JwtService();
        return jwtService;
    }
}
