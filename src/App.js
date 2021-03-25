import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function App() {
  const videoHeight = 480;
  const videoWidth = 640;
  const [initializing, setInitializing] = useState();
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => (videoRef.current.srcObject = stream),
      function () {
        console.warn("Error getting audio stream from getUserMedia");
      }
    );
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      console.log(detections);

      const resizedDetections = faceapi.resizeResults(detections, {
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      });

      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    }, 1000);
  };

  return (
    <div className="App">
      <span>{initializing ? "Icializando" : "Pronto"}</span>
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={handleVideoPlay}
        />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
