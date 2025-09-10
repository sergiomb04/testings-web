package me.imsergioh.testingsweb.controller;

import lombok.Getter;
import me.imsergioh.testingsweb.service.TextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/text")
public class TextRestController {

    @GetMapping("/get")
    public ResponseEntity<?> getText() {
        return ResponseEntity.ok().body(TextService.getInstance().getResponse());
    }

    @PostMapping("/set")
    public Map<String, Object> postText(@RequestBody TextRequest textRequest) {
        TextService.getInstance().setText(textRequest.getText());
        return Map.of("status", 200);
    }

    @Getter
    public static class TextRequest {
        private String text;
    }

}
