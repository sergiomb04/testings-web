package me.imsergioh.testingsweb.controller;

import me.imsergioh.testingsweb.service.TextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/text")
public class TextRestController {

    @GetMapping("/get")
    public Map<String, Object> getText() {
        return Map.of("text", TextService.getInstance().getText());
    }

    @PostMapping("/set")
    public ResponseEntity<String> postText(@RequestParam String text) {
        TextService.getInstance().setText(text);
        return ResponseEntity.ok("Set!");
    }

}
