package com.example.backend.domain.listening.tts;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tts")
@RequiredArgsConstructor
public class TextToSpeechController {

    private final TextToSpeechService textToSpeechService;

    @PostMapping
    public String synthesizeText(@RequestBody TtsRequest request) throws Exception {
        return textToSpeechService.synthesize(request.getText());
    }
}
