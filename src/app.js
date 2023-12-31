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

// createDocument(); //here we 1st define the function and then call the value in the last

//read data in this process
const getDocument = async () => {
   try{
      const result = await Playlist
      // .find({ctype: "Front End"})
      .find({ctype: {$in: ["Back End"]}})
      //.find({videos:{$gt: 20}}) //inbuild fn '$' ----> $gt(greater than), $gte(greater than equal), $lt(less than), $lte(less than equal) THIS ALL ARE THE INBUILD FUNCTION.
      .select({name: 1})
      //.limit(1);//specifie here using  the type of the element you want also set here the limit you want to show the data
   console.log(result);
   }catch(err){
      console.log(err);
   }
}

getDocument(); //also 1st define the fn and then call the fn at the last.

