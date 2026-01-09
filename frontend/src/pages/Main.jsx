import { useState } from "react";
import axios from "axios";
import Joey from "../assets/Joey.gif";
import RandomGif from "../components/RandomGif";

import Fix from "./fix";

function Main() {
  const [jokes, setJokes] = useState(null);
  const [joked, setDadJoke] = useState(null);

  // or use proxy for full url check vite config
  const Jokes = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${API_URL}/api/jokes`);

    const randomIndex = Math.floor(Math.random() * res.data.length);
    const randomJoke = res.data[randomIndex];
    setJokes(randomJoke);
  };
  const dadJoke = async () => {
    const { data } = await axios.get("https://sv443.net/jokeapi/v2/joke/Any");
    
    setDadJoke(data);
  };
  return (
    <div className=" bg-slate-700 min-h-screen text-white">
      <Fix />
      
      <div className="flex justify-center items-center p-20 m-10">
        <img
          className="rounded-full flex justify-center items-center w-46 h-40 "
          src={Joey}
          alt="joey gif"
        />
      </div>

      <div className="underline flex justify-center items-center">
        <button onClick={Jokes}>Click to get a joke</button>
      </div>
      {/* “ONLY render this JSX if joke exists.” */}
      {jokes && (
        <div className="flex justify-center items-center">
          <h2>{jokes.title}</h2>
          <p>{jokes.joke}</p>
        </div>
      )}
      <br />

      <div className="underline flex justify-center items-center">
        <button onClick={dadJoke}>Click to get a random joke</button>
      </div>

      {joked && (
        <div className="flex justify-center items-center">
          {joked.type === "single" && <p>{joked.joke}</p>}
          {joked.type === "twopart" && (
            <>
              <p>{joked.setup}</p>
              <p>
                <strong>{joked.delivery}</strong>
              </p>
            </>
          )}
        </div>
      )}
      <div>
        <RandomGif />
      </div>
    </div>
  );
}

export default Main;
