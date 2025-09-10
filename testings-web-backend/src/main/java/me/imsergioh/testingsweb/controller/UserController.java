package me.imsergioh.testingsweb.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import me.imsergioh.testingsweb.object.user.User;
import me.imsergioh.testingsweb.service.JwtService;
import me.imsergioh.testingsweb.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static JwtService jwtService;

    @GetMapping
    public ResponseEntity<?> getData(HttpServletRequest request) {
        String token = getToken(request);

        String username = null;
        boolean valid = false;

        try {
            username = getJwtService().extractUsername(token);
            if (username != null)
                valid = getJwtService().isTokenValid(token, username);
        } catch (Exception ignore) {
        }

        if (username != null && valid) {
            User user = UserService.getInstance().getByUsername(username);

            if (user == null) {
                return ResponseEntity.ok(null);
            }

            System.out.println("FETCHED USER " + user.username());
            return ResponseEntity.ok().body(user.getUserData());
        } else {
            return ResponseEntity.ok(null);
        }
    }

    public static JwtService getJwtService() {
        if (jwtService == null) jwtService = new JwtService();
        return jwtService;
    }

    private String getToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (!("token".equals(cookie.getName()))) continue;
                return cookie.getValue();
            }
        }
        return null;
    }
}
