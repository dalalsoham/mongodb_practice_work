const mongoose = require("mongoose");

// connection creation and create a new database
mongoose.connect("mongodb://localhost:27017/sdwork", {
   useNewUrlParser: true, 
   useUnifiedTopology: true
})
.then(() => console.log("Connection successfull...."))
.catch((err) => console.log("Connection error", err));

//schema
// a mongoose schema defines the structure of the document, default values, validattors etc.

const playlistSchema= new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
     ctype: String,
     videos: Number,
     author: String,
     active: Boolean,
     date: {
        type: Date,
        default: Date.now
     }
     
})

// a mongoose model is a wrapper on the mongoose schema.
// a mongoose schema defines the structure of the document.
// default values, validattors etc. , wheres a mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

//collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert
const createDocument = async () =>{
   try{
      const reactPlaylist = new Playlist({
         name: "Node Js",
         ctype: "Back End",
         videos: 50,
         author: "Soham Dalal",
         active: true
      })

      const jsPlaylist = new Playlist({
         name: "JavaScript",
         ctype: "Front End",
         videos: 180,
         author: "Soham Dalal",
         active: true
      })

      const mongodbPlaylist = new Playlist({
         name: "MongoDB",
         ctype: "Database",
         videos: 10,
         author: "Soham Dalal",
         active: true
      })

      const mongoosePlaylist = new Playlist({
         name: "Mongoose js",
         ctype: "Database",
         videos: 4,
         author: "Soham Dalal",
         active: true
      })

      const expressPlaylist = new Playlist({
         name: "Express js",
         ctype: "Back End",
         videos: 20,
         author: "Soham Dalal",
         active: true
      })

      // const result = await reactPlaylist.save();
      // console.log(result);  //this two line for one doc insert
      const result = await Playlist.insertMany([jsPlaylist, mongodbPlaylist, mongoosePlaylist, expressPlaylist]);
      console.log(result); 
   }catch(err) {
      console.log(err);
   }
}

// createDocument();

//read data in this process
const getDocument = async () => {
   const result = await Playlist.find({ctype: "Front End"}).select({name: 1});//specifi
   console.log(result);
}

getDocument();

