from transformers import AutoFeatureExtractor, AutoModelForAudioClassification, pipeline

# Model details
# model_name = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"

# # Load and save locally
# feature_extractor = AutoFeatureExtractor.from_pretrained(model_name)
# model = AutoModelForAudioClassification.from_pretrained(model_name)

# # Save locally
# feature_extractor.save_pretrained("local_model/emotion-classifier")
# model.save_pretrained("local_model/emotion-classifier")

# Load locally saved model for inference
classifier = pipeline(
    "audio-classification",
    model="local_model/emotion-classifier",
    feature_extractor="local_model/emotion-classifier",  # important!
    framework="pt"
)

out = classifier("D:\\impactai\\test2\\static\\recordings\\recording_20250407_190744.wav")
print(out)
