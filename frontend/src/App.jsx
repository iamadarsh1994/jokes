import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
// import Header from './components/Header'


function App() {
  // const [count, setCount] = useState(0)
  const [jokes, setJokes] = useState(null)
  const [joked, setDadJoke] = useState(null)

  // or use proxy for full url check vite config
  const Jokes = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${API_URL}/api/jokes`);

  // console.log(res.data) 
  
  const randomIndex = Math.floor(Math.random() * res.data.length)
  
  const randomJoke = (res.data[randomIndex])
  setJokes(randomJoke)
}
const dadJoke = async () => {
  const { data } = await axios.get('https://sv443.net/jokeapi/v2/joke/Any')
  console.log(data)
  // const randomDadJoke = (res.data)

  setDadJoke(data)
}
  return (
    <>
    {/* <Header /> */}
    <div><h2>Welcome on joke box.</h2></div>
    <div>
      <button onClick={Jokes}>Click to get a joke</button>

    </div>
        {/* “ONLY render this JSX if joke exists.” */}
{
      jokes && (
        <div>
          <h2>{jokes.title}</h2>
          <p>{jokes.joke}</p>
        </div>
      )
    }
    <br/>

<div>
      <button onClick={dadJoke}>Click to get a random joke</button>
</div>

    
    {
      joked && (
        <div>
      {joked.type === "single" && <p>{joked.joke}</p>}
      {joked.type === "twopart" && (
        <>
          <p>{joked.setup}</p>
          <p><strong>{joked.delivery}</strong></p>
        </>
      )}
    </div>
      )
    }
    </>
  )
}

export default App
