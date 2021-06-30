import React, { useState, useEffect, FC } from "react";
// import logo from './logo.svg';
import "./App.css";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/build/Build.loader.js",
  dataUrl: "/build/Build.data",
  frameworkUrl: "/build/Build.framework.js",
  codeUrl: "/build/Build.wasm",
});

const App: FC = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    unityContext.on("progress", (progress) => {
      console.log(progress);
      setLoading(progress);
    });
  }, []);

  const toggleFullscreen = () => {
    unityContext.setFullscreen(true);
  }

  const sendText = () => {
    unityContext.send("GameInstructor", "DataReceive", "Hello world from react");
  }

  // if (loading !== 1) return <h1>Loading</h1>;

  return (
    <>
      {loading !== 1 ? (<h1>Loading: {loading}</h1>): (<></>)}
      <Unity
        unityContext={unityContext}
        style={{ width: "100vw", height: "100vh", display: "flex", visibility: loading !== 1 ?"hidden":"visible" }}
      />
      <button style={{position: "fixed", top: "0", left: "50%", transform: "translateX(-50%)"}} onClick={toggleFullscreen}>Fullscreen</button>

      <button style={{position: "fixed", top: "25px", left: "50%", transform: "translateX(-50%)"}} onClick={sendText}>Send data</button>
    </>
  );
};

export default App;
