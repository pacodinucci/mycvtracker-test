import React, { useRef, useState } from 'react';

const ScreenRecorder = () => { 
    // Create a reference for the video element.
    const videoRef = useRef(null); 
  
    const [recorder, setRecorder] = useState(null); 
    const [cameraStream, setCameraStream] = useState(null);
    const [recordingUrl, setRecordingUrl] = useState(null); // State to hold the recording URL

    const startRecording = async () => { 
        try {
            // Capture front camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: true
            });
            
            // Show camera preview
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            
            setCameraStream(stream);
            
            // Create media recorder
            const recorder = new MediaRecorder(stream); 
            setRecorder(recorder);
            
            const recordingChunks = []; 
            recorder.ondataavailable = (e) => { 
                if (e.data.size > 0) { 
                    recordingChunks.push(e.data); 
                }
            };
            
            recorder.onstop = () => { 
                // onstop event of media recorder  
                const blob = new Blob(recordingChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob); 
                setRecordingUrl(url); // Set recording URL
                if (cameraStream) {
                    cameraStream.getTracks().forEach(track => track.stop());
                }
                if (videoRef.current) {
                    videoRef.current.srcObject = null; // Remove stream
                }
            };
            
            // Start the recording
            recorder.start();
        } catch (err) {
            console.error('Error: ' + err);
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stop();
        }
    };

    const ButtonStyle = { 
        color: 'green', 
        fontSize: '1.2em', 
        borderRadius: '7px',
        margin: '10px',
        
    }; 
  
    const shutCamera = () => {
        if (recorder) {
            recorder.stop();
        }
        if (cameraStream) {
            // Stop all media tracks
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null); // Clear the camera stream
        }
    };


    return ( 
        <> 
            <div style={{ display: 'flex', justifyContent: 'center', 'flex-direction':'column' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <button style={ButtonStyle} onClick={startRecording}> 
                        Start Recording 
                    </button> 
                    <button style={ButtonStyle} onClick={stopRecording}> 
                        Stop Recording 
                    </button> 
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center' }}>
                   <button style={ButtonStyle} onClick={shutCamera}>
                        Off the Camera
                    </button>
                </div>
            </div>
            <br /><br />
            {recordingUrl && (
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <video 
                        src={recordingUrl} 
                        
                        height={400} 
                        width={550} 
                        controls 
                        autoPlay 
                        />     
               </div>
            )}
        </> 
    ); 
};

export default ScreenRecorder;