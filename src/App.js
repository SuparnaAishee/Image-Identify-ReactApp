import { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import '@tensorflow/tfjs-converter';
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-core"
import "./App.css";
import "./design.css";
function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const imageRef = useRef();
  
  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };
  /**arrow function for image url */
  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
    /**destructuring the fiels from event dot target*/
  };
  const identify=async()=>{
    const results = await model.classify(imageRef.current)
  setResults(results)
  }
  /**call back function */
  useEffect(() => {
    loadModel();
  }, []); /**passing and empty array as a set of dependencies bcz i want this model to be loaded only the first time */
  if (isModelLoading) {
    return <h2 className="text-white">Model Loading...</h2>;
  }
  console.log(results)
  return (
    <div className="App">
      <div class=" navbar-center h-14 pt-2 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-200 ...">
        <a class=" text-xl  font-bold ">Image Identification</a>
      </div>
      <div className="inputHolder hero min-h-screen">
        <div class="hero-content text-center pb-44">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold text-white ">
              Hello !{" "}
              <span className="text-transparent  bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-400 ... ">
                Test Your Image
              </span>
            </h1>
            <p class="py-6 text-white ">
              This site identify images with three different guesses .Every
              single guess is going to have certain level of confidence
              percentage using Deep Learning Model.{" "}
            </p>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              className="uploadInput file-input file-input-bordered file-input-accent w-full max-w-xs"
              onChange={uploadImage}
            />
            
          </div>
        </div>
      </div>
      <div className="mainWrapper">
        <div className="mainContent pl-52">
          <div class="card w-96 glass gdiv">
           
              <div className="imageHolder pb-8">
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Upload Preview"
                    crossOrigin="anonymous"
                    ref={imageRef}
                  />
                )}
              </div>
           
          </div>
          {results.length > 0 && (
            <div className="resultsHolder">
              {results.map((result, index) => {
                return (
                  <div className="result " key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && (
                        <span className="bestGuess font-bold    ">
                          Best Guess
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imageURL && (
          <button
            class="pt-2 ibtn font-bold btn  bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 ..."
            onClick={identify}
          >
            Identify Image
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
