import express from "express"
import cors from 'cors'
import 'dotenv/config';   

const app = express()
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Hello from the server")
})

app.get('/api/jokes', (req, res)=>{
        const jokes = [
  {
    id: 1,
    title: "Why the Computer Sneezed",
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