import React, { useState, useRef } from "react";
import axios from "axios";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const micRef = useRef(null);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        let audioChunks = [];

        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          console.log("Audio recorded:", audioBlob);

          const sendAudioToBackend = async () => {
            const formData = new FormData();
            formData.append("audio", audioBlob, "recording.wav");
            setIsProcessing(true);

            try {
              const response = await axios.post("http://localhost:5000/save_recording", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              if (response.data.success) {
                console.log("Uploaded audio:", response.data);

                const outputResponse = await axios.get("http://localhost:5000/get_output");
                const audioUrl = outputResponse?.data?.output?.url;

                if (audioUrl) {
                  const fullUrl = `http://localhost:5000${audioUrl}`;
                  console.log("Playing AI response from:", fullUrl);
                  const aiAudio = new Audio(fullUrl);
                  aiAudio.play();
                } else {
                  console.warn("No audio found in output.");
                }
              }
            } catch (err) {
              console.error("Error sending/receiving voice data:", err);
            } finally {
              setIsProcessing(false);
            }
          };

          sendAudioToBackend();
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <button
        onClick={toggleRecording}
        ref={micRef}
        disabled={isProcessing}
        className={`w-40 h-12 rounded-full font-semibold text-white text-lg shadow-md transition duration-200 ${
          isRecording ? "bg-red-500 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {isProcessing && <p className="text-gray-600 animate-pulse">Processing response...</p>}
    </div>
  );
};

export default VoiceRecorder;
