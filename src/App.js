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
  const[history,setHistory] = useState([]);
  const MAX_HISTORY_LENGTH = 12;
  const imageRef = useRef();
  const textInputRef = useRef()
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
     textInputRef.current.value = ""
    const results = await model.classify(imageRef.current)
  setResults(results)
  }
  const handleOnChange = (e) =>{
setImageURL(e.target.value)
setResults([])
  }
  /**call back function */
  useEffect(() => {
    loadModel();
  }, []); /**passing and empty array as a set of dependencies bcz i want this model to be loaded only the first time */
useEffect(() =>{
  if(imageURL){
    setHistory([imageURL, ...history])
  }
},[imageURL])


  if (isModelLoading) {
    return <h2 className="text-white text-2xl font-bold">Model Loading...</h2>;
  }
  console.log(results)
  return (
    <div className="App">
      <div class="navbar-center h-14 pt-2 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-200 ...">
        <a class="text-xl font-bold">Image Identification</a>
      </div>
      <div className="inputHolder hero min-h-screen">
        <div class="hero-content text-center pb-8 sm:pb-16">
          <div class="max-w-md mx-auto">
            <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              Hello!{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-400 ...">
                Test Your Image
              </span>
            </h1>
            <p class="py-4 sm:py-6 text-white ">
              This site identifies images with three different guesses. Every
              single guess has a certain level of confidence percentage using a
              Deep Learning Model.
            </p>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              className="uploadInput file-input file-input-bordered file-input-accent w-full max-w-xs mb-4 sm:mb-6"
              onChange={uploadImage}
            />
            <h1 className="text-white mb-2 sm:mb-4">Or</h1>
            <input
              type="text"
              className="pl-4 uploadInput file-input file-input-bordered file-input-accent w-full max-w-xs mb-4 sm:mb-6"
              placeholder="Paste image URL"
              ref={textInputRef}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      <div className="mainWrapper sm:px-12">
        <div className="mainContent p-4 sm:px-12 ">
          <div class="card w-72 sm:w-1/2 glass gdiv mb-8 sm:mb-0 ">
            <div className="imageHolder pb-8 ">
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Upload Preview"
                  crossOrigin="anonymous"
                  ref={imageRef}
                  class="w-full h-auto"
                />
              )}
            </div>
          </div>
          {results.length > 0 && (
            <div className="resultsHolder p-2 sm:px-9 ">
              {results.map((result, index) => {
                return (
                  <div
                    className="result mb-4 max-w-screen-md mx-auto"
                    key={result.className}
                  >
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && (
                        <span className="bestGuess font-bold">Best Guess</span>
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
            class=" ibtn font-bold btn  bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 ..."
            onClick={identify}
          >
            Identify Image
          </button>
        )}
      </div>
      {history.length > 0 && (
        <div className="recentPredictions">
          <h2 className="font-bold th text-center mb-4 sm:mb-6">
            Recent Predicted Images
          </h2>
          <div className="recentImages flex flex-wrap justify-center ">
            {history.slice(0, MAX_HISTORY_LENGTH).map((image, index) => {
              return (
                <div
                  className="recentPrediction mx-2 my-2"
                  key={`${image}${index}`}
                >
                  <img
                    src={image}
                    alt="Recent Prediction"
                    onClick={() => setImageURL(image)}
                    class="cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
