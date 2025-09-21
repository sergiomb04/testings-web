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
    public ResponseEntity<?> getPublicData(HttpServletRequest request) {
        User user = getUserFromRequest(request);

        if (user != null) {
            System.out.println("FETCHED FRONTEND USER " + user.username());
            return ResponseEntity.ok().body(user.getUserData());
        }

        return ResponseEntity.status(500).body(null);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getBackendData(HttpServletRequest request) {
        User user = getUserFromRequest(request);

        if (user != null) {
            System.out.println("FETCHED BACKEND USER " + user.username());
            return ResponseEntity.ok().body(UserService.getDocument(user));
        }
        return ResponseEntity.status(500).body(null);
    }

    public static JwtService getJwtService() {
        if (jwtService == null) jwtService = new JwtService();
        return jwtService;
    }

    private static String getBearerToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring("Bearer ".length());
        }
        return null;
    }

    private static String getCookieToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (!("token".equals(cookie.getName()))) continue;
                return cookie.getValue();
            }
        }
        return null;
    }

    public static User getUserFromRequest(HttpServletRequest request) {
        String username = getUserNameFromRequest(request);

        if (username == null) return null;
        return UserService.getInstance().getByUsername(username);
    }

    private static String getUserNameFromRequest(HttpServletRequest request) {
        String token = getBearerToken(request);
        if (token == null) token = getCookieToken(request);
        if (token == null) return null;

        String username = null;
        boolean valid = false;

        try {
            username = getJwtService().extractUsername(token);
            if (username != null)
                valid = getJwtService().isTokenValid(token, username);
            if (valid) return username;
        } catch (Exception ignore) {
        }
        return null;
    }

}
