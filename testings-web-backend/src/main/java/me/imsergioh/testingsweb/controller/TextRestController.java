package me.imsergioh.testingsweb.controller;

import me.imsergioh.testingsweb.service.TextService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/text")
public class TextRestController {

    @GetMapping("/get")
    public Map<String, Object> getText() {
        return Map.of("text", TextService.getInstance().getText());
    }

}
