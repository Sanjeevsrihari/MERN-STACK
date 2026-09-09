import express from 'express';
import cors from 'cors';
import mongoose from "mongoose"
import Note from "./models/Note.js"

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

mongoose.connect("mongodb://localhost:27017/NotesDB").then(()=>{
  console.log("Connected to MongoDB successfully!!!");
})

app.get("/api/getnotes",async  (req, res) => {
    const result = await Note.find();
    res.json(result);
});


app.post("/api/post", async (req, res) => {
  try {
    const {title, description} = req.body;
    const newNote = {
      id : Date.now(),
      title : title,
      description : description,
    }
    console.log("note that we are pushing", newNote);
    const note = await Note.create(newNote);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({message: `Error creating note: ${err.message}`});
  }
});

app.delete("/note/:id", async(req, res) => {
  try{
  const {id}=req.params;
  await Note.findOneAndDelete({id:id});
  res.json({message:`Note deleted succesfully ${id}`});
  }
  catch(err){
    res.json({message:`Error deleting note ${id}:${err}`});
  
  }

  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});