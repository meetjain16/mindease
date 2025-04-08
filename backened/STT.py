from elevenlabs.client import ElevenLabs
import requests


client = ElevenLabs(
    api_key="sk_4521f2676f8eb9866a6159be0d9389d16a9fc88b2535597e",
)


file_path = "C:/Users/prane/OneDrive/Documents/Sound recordings/Recording (7).m4a"


def transcribe_audio(file_path):
    try:
        with open(file_path, "rb") as audio_file:
            response = client.speech_to_text.convert(
                model_id="scribe_v1",
                file=audio_file,
                language_code="en"
            )
        print("Transcription:", response.text)
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return None
