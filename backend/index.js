import express from "express"
import cors from 'cors'
import dotenv from "dotenv";
import router from "./auth.routes.js";
import axios from 'axios'
import connectDB from "./db.js";
dotenv.config({
  path: '.env'
});  

const app = express()
app.use(cors());
app.use(express.json())
connectDB()
app.get('/',(req,res)=>{
    res.send("Hello from the server")
})
app.get('/api/random-gif', async (req, res)=>{
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random',{
      params: {
        api_key: process.env.GIPHY_API_KEY,
        rating:'g',
        tag: req.query.tag || '',
      },
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({error:"failed to fetch GIF"})
  }
})
app.use('/api/auth', router)
app.get('/api/jokes', (req, res)=>{
        const jokes = [
  {
    id: 1,
    title: "Why the Computer Sneezed!",
    joke: "Why did the computer catch a cold? Because it left its Windows open."
  },
  {
    id: 2,
    title: "Math Trouble",
    joke: "Why was the math book sad? Because it had too many problems."
  },
  {
    id: 3,
    title: "Coffee Break",
    joke: "I told my coffee it was getting cold… it replied, 'Better latte than never.'"
  },
  {
    id: 4,
    title: "Developer Humor",
    joke: "Why do programmers prefer dark mode? Because light attracts bugs."
  },
  {
    id: 5,
    title: "Time Flies",
    joke: "I would tell you a joke about time travel, but you didn’t like it."
  }
 ];

 res.send(jokes)

})


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on the http://localhost:${port}`)
})