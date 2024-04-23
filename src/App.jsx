import { useRef } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const resultRef = useRef();
  const API_KEY = import.meta.env.VITE_IMG_API;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    const prompt = e.target.prompt.value;
    if (!prompt || prompt.length < 10) {
      return alert("make bigger prompt");
    }
    setLoading(true);

    const form = new FormData();
    form.append("prompt", prompt);

    fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
      },
      body: form,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        // buffer here is a binary representation of the returned image

        const file = new Blob([buffer], { type: "image/png" });
        const url = URL.createObjectURL(file);
        setImages([url, ...images]);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className=" animate-bounce flex text-8xl">
          Generat <p className="animate-ping">i</p> ng
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="min-h-[calc(100vh-120px)]">
          <h1 className="text-4xl font-bold text-center py-10 border-b-2">
            My-GPT
          </h1>
          <div className="grid grid-cols-2 gap-5 p-10">
            {images?.map((img) => (
              <img key={img} src={img} className="w-full p-5 border-8" />
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <p>Generate A Image</p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea name="prompt" className="border-2 flex-1 p-5"></textarea>
            <button className="btn-primary btn"> send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
