package me.imsergioh.testingsweb.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import me.imsergioh.testingsweb.MyWebSocketServer;
import me.imsergioh.testingsweb.object.user.User;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final long EXPIRATION_MS = 1000 * 60 * 30; // 30 min

    private final Key key = Keys.hmacShaKeyFor(getJWTSecret().getBytes());

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.id().toString())
                .claim("username", user.username())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token, String username) {
        return (extractUsername(token).equals(username)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        JwtParser parser = Jwts.parser()
                .verifyWith(getSigningKey())   // aquí va el SecretKey
                .build();

        return parser.parseSignedClaims(token).getPayload();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(getJWTSecret().getBytes(StandardCharsets.UTF_8));
    }

    private static String getJWTSecret() {
        return MyWebSocketServer.getSecretsConfig().getString("JWT_SECRET");
    }
}
