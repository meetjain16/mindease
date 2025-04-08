from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import datetime
from flask_cors import CORS
import STT
import TTS
import gemini
import mongo

app = Flask(__name__)
CORS(app)

# Define the recordings directory path
# Using absolute path to avoid any directory confusion
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
RECORDINGS_DIR = os.path.join(BASE_DIR, 'static', 'recordings')
OutputDIR= os.path.join(BASE_DIR, 'static', 'output')
os.makedirs(RECORDINGS_DIR, exist_ok=True)

@app.route('/')
def index():
    """Render the main page"""
    return render_template('test.html')

@app.route('/save_recording', methods=['POST'])
def save_recording():
    """Save an audio recording to the filesystem"""
    if 'audio' not in request.files:
        return jsonify({'success': False, 'error': 'No audio file received'})
    
    audio_file = request.files['audio']
    
    # Create a unique filename with timestamp
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'recording_{timestamp}.wav'
    file_path = os.path.join(RECORDINGS_DIR, filename)
    
    try:
        # Save the file
        audio_file.save(file_path)
        # Use URL for Flask route instead of direct path
        input=(STT.transcribe_audio(file_path))
        output=gemini.generate(input)
        audio=TTS.generate_audio(output)
        #mongo.insertcollection(input,output)



        return jsonify({
            'success': True,
            'filename': filename,
            'file_path': file_path,
            'url': f'/output/{audio}'  # Changed URL format
        })
    
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/get_recordings')
def get_recordings():
    """Get a list of all recordings"""
    recordings = []
    
    if os.path.exists(RECORDINGS_DIR):
        for filename in os.listdir(RECORDINGS_DIR):
            if filename.endswith('.wav'):
                recordings.append({
                    'filename': filename,
                    'url': f'/recordings/{filename}'  # Changed URL format
                })
    
    # Sort by filename (which contains timestamp) to show newest first
    recordings.sort(key=lambda x: x['filename'], reverse=True)
    
    return jsonify({'recordings': recordings})

# Add a specific route to serve the audio files
@app.route('/recordings/<filename>')
def serve_recording(filename):
    """Serve a specific recording file"""
    return send_from_directory(RECORDINGS_DIR, filename)

# For debugging, add a route to list all files in the recordings directory
@app.route('/debug/list_files')
def list_files():
    """List all files in the recordings directory (for debugging)"""
    if os.path.exists(RECORDINGS_DIR):
        files = os.listdir(RECORDINGS_DIR)
        full_paths = [os.path.join(RECORDINGS_DIR, f) for f in files]
        exists = [os.path.exists(p) for p in full_paths]
        return jsonify({
            'directory': RECORDINGS_DIR,
            'exists': os.path.exists(RECORDINGS_DIR),
            'files': files,
            'full_paths': full_paths,
            'file_exists': exists
        })
    else:
        return jsonify({
            'error': 'Recordings directory does not exist',
            'path': RECORDINGS_DIR
        })

@app.route('/get_output')
def pushoutput():
    print("Fetching latest output audio...")
    print(mongo.getdata())

    recordings = []

    if os.path.exists(OutputDIR):
        print("Output directory exists:", OutputDIR)

        all_files = [f for f in os.listdir(OutputDIR) if f.endswith('.mp3')]
        print("All MP3 files found:", all_files)

        all_files.sort(reverse=True)
        print("Sorted files (latest first):", all_files)

        if all_files:
            latest_file = all_files[0]
            print("Latest file selected:", latest_file)

            recordings = {
                'filename': latest_file,
                'url': f'/static/output/{latest_file}'
            }

        else:
            print("No MP3 files found in output directory.")
    else:
        print("Output directory does not exist:", OutputDIR)

    print("Final response being sent:", recordings)
    return jsonify({'output': recordings})



if __name__ == '__main__':
    print(f"Recordings will be saved to: {RECORDINGS_DIR}")
    app.run(debug=True)