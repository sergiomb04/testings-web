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
import java.util.UUID;
import java.util.function.Function;

@Service
public class JwtService {

    private static final long EXPIRATION_MS = 1000 * 60 * 30; // 30 min

    private final Key key = Keys.hmacShaKeyFor(getJWTSecret().getBytes(StandardCharsets.UTF_8));

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.username())
                .claim("id", user.id().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public UUID extractId(String token) {
        return UUID.fromString(extractAllClaims(token).get("id", String.class));
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
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(getJWTSecret().getBytes());
    }

    private static String getJWTSecret() {
        return MyWebSocketServer.getSecretsConfig().getString("JWT_SECRET");
    }
}
