package com.example.backend.domain.listening.tts;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.TextToSpeechSettings;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Base64;

@Service
public class TextToSpeechService {

    private final TextToSpeechClient ttsClient;

    public TextToSpeechService() throws Exception {
        InputStream keyStream = new ClassPathResource("google-service-account.json").getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(keyStream)
                .createScoped("https://www.googleapis.com/auth/cloud-platform");

        TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider(() -> credentials)
                .build();

        this.ttsClient = TextToSpeechClient.create(settings);
    }

    public String synthesize(String text) throws Exception {
        SynthesisInput input = SynthesisInput.newBuilder()
                .setText(text)
                .build();

        VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                .setLanguageCode("ko-KR")
                .setName("ko-KR-Wavenet-A")
                .setSsmlGender(SsmlVoiceGender.FEMALE)
                .build();

        AudioConfig audioConfig = AudioConfig.newBuilder()
                .setAudioEncoding(AudioEncoding.MP3)
                .build();

        SynthesizeSpeechResponse response = ttsClient.synthesizeSpeech(input, voice, audioConfig);

        return Base64.getEncoder().encodeToString(response.getAudioContent().toByteArray());
    }
}
